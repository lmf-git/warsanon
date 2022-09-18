import ScreenGeometry from '../geometry/screenGeometry';
import TweenMax from 'gsap';
import MapData from '../mapData';
import NoiseHandler from './noiseHandler';
import PixiHelper from '../../../../utils/pixi/pixiHelper';
import CoordinateHelper from '../helper/coordinateHelper';
import TileData from '../data/tileData';


export default class TileHandler {

    static addTileAtCoordinates(X, Y) {
        const tile = this.addTile(
            ScreenGeometry.GameToScreenCoords(X, Y, this.origin),
            { X, Y }
        );
        return tile;
    }

    static createTile(worldCoords, gameCoords) {       
        const biome = NoiseHandler.calculateTileNoiseType(gameCoords.X, gameCoords.Y);
        
        let sprite = PixiHelper.sprite();
        sprite.tint = NoiseHandler.PALETTE[biome];
        sprite.DATA = {
            BIOME: biome
        };

        sprite.COORDINATES = {
            X: parseInt(gameCoords.X),
            Y: parseInt(gameCoords.Y)
        }
        
        sprite.anchor.set(0.5);
        sprite.width = sprite.height = MapData.tileHeight;

        sprite.x = worldCoords.X;
        sprite.y = worldCoords.Y;
        
        sprite.rotation = Math.PI * 2 * 0.125;
        return sprite;
    }

    // TODO: Queue load tiles from closest to center (sort by closest to center when adding to queue)
    static addTile(worldCoords, gameCoords) {
        const sprite = this.createTile(worldCoords, gameCoords);
        MapData.tileWrapper.addChild(sprite);
        
        TileData.setLoadedTile(sprite);
        return sprite;
    }

    static LoadVisibleTiles(preanimate = false) {
        const visibleTiles = this.getVisibleTiles();
        this.LoadTilesByObject(visibleTiles, preanimate);
        return visibleTiles;
    }

    static LoadTilesByObject(tilesObject, preAnimate = false) {
        const tileIdentities = Object.keys(tilesObject);
        for (let tileIndex = 0; tileIndex < tileIdentities.length; tileIndex++) {
            let currentTileData = tileIdentities[tileIndex];
            let tileCoordinates = currentTileData.split('|');
            let x = parseInt(tileCoordinates[0]);
            let y = parseInt(tileCoordinates[1]);

            if (!TileData.isTileSet(x, y)) {
                let currentTile = this.addTileAtCoordinates(x, y);
    
                if (currentTile && preAnimate) {
                    this.setTilePreAnimationScale(currentTile);
                }
            }
        }
    }

    static getVisibleTiles() {
        const hitArea = MapData.mapViewport.hitArea;
        const scale = MapData.mapViewport.scale.x; // x and y scale should be the same?
        const scanIncrement = hitArea.width / ( (MapData.tileHeight / 3) * scale);
        let visibleTiles = {};

        // FIXME: Add a padding to prevent outer gaps.
        for (let scanX = hitArea.left; scanX < hitArea.right; scanX += scanIncrement) {
            for (let scanY = hitArea.top; scanY < hitArea.bottom; scanY += scanIncrement) {
                const currentGameTile = ScreenGeometry.ScreenToGameCoords(scanX, scanY, MapData.origin);

                if (typeof visibleTiles[currentGameTile.x + '|' + currentGameTile.y] === 'undefined') {
                    visibleTiles[currentGameTile.x + '|' + currentGameTile.y] = true;
                }
            }
        }

        return visibleTiles;
    }

    /* INTERACTION */ 
    static setCurrentTile() {
        const area = MapData.mapViewport.hitArea;
        MapData.currentTile = ScreenGeometry.ScreenToGameCoords(area.x + area.width / 2, area.y + area.height / 2);
        MapData.currentTile$.next(MapData.currentTile);
        CoordinateHelper.setCurrentCoordCookie();

        // if (typeof MapData.TILES_LOADED['499|500'] !== 'undefined') {
        //     console.log(MapData.TILES_LOADED['499|500'].DATA);
        // }
    }


    /* ANIMATION */
    static createTileForAnimatedLoad() {
        const tile = this.createTile();
        this.setTilePreAnimationScale(tile);
        return tile;
    }

    static setTilePreAnimationScale(tile) {
        // Initial tile scale is 6.25 - why? Find out and add note here.
        tile.scale.x = tile.scale.y = 0;
    }

    static AnimateTileLoading(coords, iteration) {
        setTimeout(() => {
            if (MapData.TILES_LOADED[coords]) {
                TweenMax.to(MapData.TILES_LOADED[coords].scale, MapData.tileLoadingSecs, { x: 6.25, y: 6.25 });
            }
        }, (MapData.tileLoadingSecs * 100) * iteration);
    }



    // Maybe unnecessary here.

}