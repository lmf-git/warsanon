import * as PIXI from 'pixi.js';

import MapData from '../../mapData';
import ScreenGeometry from '../../geometry/screenGeometry';
import TileData from '../../data/tileData';

export default class MapLocationElement {

    static createTileMarking() {  
        let sprite = new PIXI.Sprite(MapData.pixiLoader.resources['/static/assets/map/current_location.png'].texture);
        sprite.anchor.set(0.5, 0.5);
        sprite.width = sprite.height = MapData.tileHeight;
        return sprite;
    }

    static addTileMarking(x, y) {
        const tileSprite = this.createTileMarking();
        const coordinates = ScreenGeometry.GameToScreenCoords(x, y);
        tileSprite.x = coordinates.X;
        tileSprite.y = coordinates.Y;

        tileSprite.scale.x = tileSprite.scale.y = 0;

        tileSprite.COORDINATES = { x, y };
        
        // TODO: Animate location added.
        MapData.currentLocationWrapper.addChild(tileSprite);
        TileData.setTileDataSprites(x, y, 'location', { tileSprite });

        TweenMax.to(tileSprite.scale, 1.5, { x: 0.5, y: 0.5 });
    }

    static updateItemMarking(x, y) {
        // this.removeMarking(x, y);
    }

    static removeMarking(x, y) {
        const locationMarking = TileData.getTileMarkingSprite(x, y, 'location');
        if (locationMarking) {
            try {
                locationMarking.tileSprite.destroy();
                delete MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES.location;
            } catch(e) {
                console.log('Error destroy item', e);
            }
        }
    }


}