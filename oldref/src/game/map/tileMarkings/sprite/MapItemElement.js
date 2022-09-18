
import * as PIXI from 'pixi.js';

import MapData from '../../mapData';
import ScreenGeometry from '../../geometry/screenGeometry';
import RegionHandler from '../../components/regionHandler';
import TileData from '../../data/tileData';

export default class MapItemElement {

    static createTileMarking(number) {  
        // let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        let sprite = new PIXI.Sprite(MapData.pixiLoader.resources['/static/assets/map/markings/ITEMS.png'].texture);

        sprite.anchor.set(0, 0);
        sprite.width = sprite.height = MapData.tileHeight / 2;
        sprite.rotation = Math.PI * 2 * 0.125;
        // sprite.tint = 0xcb0d0;
        return sprite;
    }

    static addTileMarking(x, y, number) {
        const itemMarking = TileData.getTileMarkingSprite(x, y, 'items');
        if (!itemMarking) {
            const tileSprite = this.createTileMarking(number);
            const textSprite = new PIXI.Text(number);
            textSprite.anchor.set(0.5, -0.75);
            textSprite.style.font = "bold 10px arial";
            textSprite.style.align = "left";
            textSprite.style.fill = 0xFFFFFF;
            textSprite.text = TileData.getFieldItemsNum(`${x}|${y}`, 'items');
            

            // Position all at same location (anchor repositions each)
            const coordinates = ScreenGeometry.GameToScreenCoords(x, y);
            textSprite.x = tileSprite.x = coordinates.X;
            textSprite.y = tileSprite.y = coordinates.Y;

            MapData.tileMarkingWrapper.addChild(tileSprite);
            MapData.tileMarkingWrapper.addChild(textSprite);

            const itemSprites = { textSprite, tileSprite };

            TileData.setTileDataSprites(x, y, 'items', itemSprites);
        }
    }

    // TODO: Update tile colour based on number?
    static updateItemMarking(x, y) {
        const itemMarking = TileData.getTileMarkingSprite(x, y, 'items');
        if (itemMarking) {
            const coordItemsNum = TileData.getFieldItemsNum(`${x}|${y}`, 'items');
            // If 0 remove sprites, otherwise update.
            if (coordItemsNum <= 0) {
                try {
                    itemMarking.textSprite.destroy();
                    itemMarking.tileSprite.destroy();
                    delete MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES.items;
                } catch(e) {
                    console.log('Error destroy item', e);
                }
            } else {
                itemMarking.textSprite.text = coordItemsNum;
            }
        }
    }


}