import * as PIXI from 'pixi.js';
import MapHandler from './components/mapHandler';
import MapData from './mapData';
import NoiseHandler from './components/noiseHandler';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import CoordinateHelper from './helper/coordinateHelper';
import PixiHelper from '../../../utils/pixi/pixiHelper';
import Viewport from './components/viewport';
import { Promise } from 'es6-promise';
import RegionHandler from './components/regionHandler';
import MapLocationHandler from './tileMarkings/MapLocationHandler';

export default class MapApplication {

    static start() {
        return new Promise((resolve, reject) => {
            try {
                const mapStarter = MapHandler.startView.bind(MapHandler);

                const MapTextures = Object.keys(NoiseHandler.PALETTE);
    
                MapData.initialCoords = CoordinateHelper.getInitialCoords();
    
                MapData.currentTile$ = new BehaviorSubject({
                    x: MapData.initialCoords.X,
                    y: MapData.initialCoords.Y,
                });
    
                MapData.regionDataEvent$ = new Subject();
    
                if (MapData.pixiLoader === undefined) {
                    MapData.pixiLoader = new PIXI.Loader();
                    MapData.pixiLoader.add('/static/assets/map/map_crosshair.png');
                    MapData.pixiLoader.add('/static/assets/map/current_location.png');
    
                    MapData.pixiLoader.add('/static/assets/map/structures/test_village.png');
                    MapData.pixiLoader.add('/static/assets/map/structures/spawn/own_spawn.png');
                    MapData.pixiLoader.add('/static/assets/map/structures/spawn/standard_spawn.png');
    
                    MapData.pixiLoader.add('/static/assets/map/markings/ITEMS.png');
                    MapData.pixiLoader.add('/static/assets/map/markings/PLAYERS.png');
                    MapData.pixiLoader.add('/static/assets/map/markings/UNITS.png');
    
                    MapTextures.forEach(key => { 
                        MapData.pixiLoader.add(`/static/assets/map/textures/${key}.png`);
                    })
    
                    MapData.pixiLoader.onComplete.add(() => {
                        mapStarter().then(() => { resolve(); })
                    });
                    MapData.pixiLoader.load();
                } else {
                    mapStarter().then(() => { resolve(); })
                }
            } catch(e) {
                console.log('MapApplication start E:', e);
                reject('MapApplication start E:', e);
            }
        });
    }

    static deleteAllSprites() {
        return Promise.all([
            PixiHelper.deleteContainerSprites(MapData.tileWrapper),
            PixiHelper.deleteContainerSprites(MapData.tileMarkingWrapper),
            PixiHelper.deleteContainerSprites(MapData.structureWrapper),
            PixiHelper.deleteContainerSprites(MapData.currentLocationWrapper),
        ])
    }

    // TODO: Consider if listeners added after renderWorld
    static cancelListeners() {
        clearInterval(MapData.tileTrackingInterval);
    }

    static stopAllLoading() {
        Viewport.detachTileLoadingHandlers()

        // FIXME: Should this be promise?
        RegionHandler.clearAllRegionDataListeners();

        if (typeof MapData.initialChunkLoader !== 'undefined') {
            clearTimeout(MapData.initialChunkLoader);
        }
    }

    static annihilateLoading() {
        this.stopAllLoading();
        MapData.clearLoadedData();
    }

    static annhilateData() {
        return new Promise(resolve => {
            this.annihilateLoading();
            // this.deleteAllSprites()
            resolve();
        });
    }

    static move(x, y) {
        // If same region, pan

        // Otherwise resort to reloaded move
    }

    static reloadedMove(x, y) {
        MapData.initialCoords = { X: x, Y: y };

        // Remove player location marker.
        MapLocationHandler.remove(null, MapData.world.player, null);

        this.annihilateLoading();

        // TODO: Scale down tiles then delete.

        // Delete all existing sprites.
        this.deleteAllSprites().then(() => {
            // TODO: Delete already animated cookies so the effect occurs again, faster?
            MapHandler.renderWorld().then(() => {
                Viewport.attachTileLoadingHandlers();
            });

        });
    }

}