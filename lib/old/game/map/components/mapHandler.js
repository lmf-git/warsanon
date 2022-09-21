import * as PIXI from 'pixi.js';
import _ from 'underscore';
import MapData from '../mapData';
import Viewport from './viewport';
import TileHandler from './tileHandler';
import NoiseHandler from './noiseHandler';
import MathGeometry from '../geometry/mathGeometry';
import RegionHandler from './regionHandler';
import CoordinateHelper from '../helper/coordinateHelper';
import ChunkGeometry from '../geometry/chunkGeometry';
import { Promise } from 'es6-promise';
import MapLocationHandler from '../tileMarkings/MapLocationHandler';
import CharacterHandler from '../characterHandler';

export default class MapHandler {

    static setupView() {
        const mapContainer = document.getElementById('map-container');

        MapData.mapApp = new PIXI.Application({
            width: mapContainer.clientWidth,
            height: mapContainer.clientHeight,
            backgroundColor: 0x1b1b1b,
            antialias: true
        });

        mapContainer.appendChild(MapData.mapApp.view);
    }

    static startView() {
        return new Promise((resolve, reject) => {
            try {
                // Add elements necessary for canvas functionality.
                this.setupView();
                
                // Initialise canvas libraries viewport.
                Viewport.initialise();
                
                // Initialise noise generator with appropriate world terrain seed.
                NoiseHandler.initialise();
               
                // Render world geometry tiles.
                this.renderWorld().then(() => {
                    resolve();
                })

            } catch(e) {
                console.log('ERROR', e);
                reject(['Error', e])
            }
        });
    }

    static renderWorld() {
        return new Promise((resolve, reject) => {
            try {                
                // Add initial tile as Cartesian coordinate system origin.
                this.addInitialTile();
                TileHandler.setCurrentTile();
                
                // Load tiles that fill viewport.
                const visibleTiles = TileHandler.LoadVisibleTiles(true);

                // console.log(visibleTiles);
                
                // Animate initial tiles before switching to region loading.
                this.addVisibleTiles(visibleTiles).then(() => resolve());

                // Add crosshair icon to center of the screen.
                this.addScreenCenterMarker();

                // ADD PLAYER DATA (SINGLE ITEMS RATHER THAN REGION DATA BASED TILE MARKINGS)
                if (MapData.world.player) {
                    MapLocationHandler.add(null, MapData.world.player, null);

                    // Add player data listener, will also need adding after spawn if not set here.
                    CharacterHandler.init();
                }

            } catch (e) {
                console.log('RENDER WORLD E:', e);
                reject();
            }
        });
    }

    static addInitialTile() {
        const bounds = MapData.mapApp.renderer;
        const worldCoordinates = { X: bounds.width / 2, Y: bounds.height / 2 };

        // console.log(MapData.initialCoords);

        // Add tile at center of canvas to establish Cartesian coordinate system (world -> screen).
        MapData.origin = TileHandler.addTile(worldCoordinates, MapData.initialCoords);

        // Force screen center to tile (overcome the < screenWidth issue that was found (glitch?)).
        MapData.mapViewport.snap(MapData.origin.x, MapData.origin.y, { time: 0, removeOnComplete: true, removeOnInterrupt: true });
        TileHandler.setTilePreAnimationScale(MapData.origin);
    }

    static addVisibleTiles(visibleTiles) {
        return new Promise(resolve => {

            // Loop over all loaded tiles and animate by sort order or distance from center.
            const initialTiles = MapData.TILES_LOADED;
            const initialTilesArray = Object.keys(initialTiles).map((k) => { return { loaded: initialTiles[k], coords: k } });
            const mapCenter = MapData.origin.COORDINATES;
            const withDistanceFromCenter = _.each(initialTilesArray, tile => {
                
                // Set object property value to distance.
                let coordinates = tile.coords.split('|');
                tile.distance = MathGeometry.pythagoreanDistance(
                    coordinates[0], 
                    coordinates[1],
                    mapCenter.X,
                    mapCenter.Y
                );
            });
            
            // Sort tiles distance from center.
            const sortedTiles = _.sortBy(withDistanceFromCenter, (sortItem) => {
                return sortItem.distance;
            });
            
            // Load each sorted tile.
            _.each(sortedTiles, (tile, iteration) => {
                TileHandler.AnimateTileLoading(tile.coords, iteration);
            });
            
            // After all tiles loading in by animation, load the relevant visible chunks.
            // FIXME: Does not work on iPhone
            MapData.initialChunkLoader = setTimeout(() => {
                _.each(visibleTiles, (tile, key) => {
                    let coords = CoordinateHelper.str2Obj(key);
                    let chunk = ChunkGeometry.getCoordinateChunk(coords.X, coords.Y);
                    RegionHandler.LoadRegionTilesByCoordinates(chunk.x, chunk.y);
                });
                resolve();
            }, (MapData.tileLoadingSecs * 100) * sortedTiles.length + 100);
        });
    }

    static addScreenCenterMarker() {
        const bounds = MapData.mapApp.renderer;
        
        const crossHairTexture = MapData.pixiLoader.resources['/static/assets/map/map_crosshair.png'].texture;
        let sprite = new PIXI.Sprite(crossHairTexture);
        
        sprite.anchor.set(0.5);
        sprite.width = sprite.height = MapData.tileHeight / 2;

        sprite.x = bounds.width / 2;
        sprite.y = bounds.height / 2;
        MapData.mapApp.stage.addChild(sprite);
    }

}