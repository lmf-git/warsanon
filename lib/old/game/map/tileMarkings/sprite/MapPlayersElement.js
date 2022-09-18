
import * as PIXI from 'pixi.js';

import MapData from '../../mapData';
import ScreenGeometry from '../../geometry/screenGeometry';
import TileData from '../../data/tileData';

export default class MapPlayersElement {

    static createTileMarking(number) {  
        // let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        let sprite = new PIXI.Sprite(MapData.pixiLoader.resources['/static/assets/map/markings/PLAYERS.png'].texture);

        sprite.anchor.set(1, 0);
        sprite.width = sprite.height = MapData.tileHeight / 2;
        sprite.rotation = Math.PI * 2 * 0.125;
        // sprite.tint = 0xcb8f0d;
        return sprite;
    }

    static addTileMarking(x, y, number) {
        const marking = TileData.getTileMarkingSprite(x, y, 'players');

         if (!marking) {
            const tileSprite = this.createTileMarking(number);
            const textSprite = new PIXI.Text(number);
            textSprite.anchor.set(2.75, 0.5);
            textSprite.style.font = "bold 10px arial";
            textSprite.style.align = "center";
            textSprite.style.fill = 0xFFFFFF;
            textSprite.text = TileData.getFieldItemsNum(`${x}|${y}`, 'players');

            // Position all at same location (anchor repositions each)
            const coordinates = ScreenGeometry.GameToScreenCoords(x, y);
            textSprite.x = tileSprite.x = coordinates.X;
            textSprite.y = tileSprite.y = coordinates.Y;

            MapData.tileMarkingWrapper.addChild(tileSprite);
            MapData.tileMarkingWrapper.addChild(textSprite);

            const itemSprites = { textSprite, tileSprite };
            
            TileData.setTileDataSprites(x, y, 'players', itemSprites);
        }
    }

    // TODO: Update tile colour based on number?
    static updateItemMarking(x, y) {
        // console.log('updateItemMarking');
        const marking = TileData.getTileMarkingSprite(x, y, 'players');
        if (marking) {
            // console.log(marking);
            const coordItemsNum = TileData.getFieldItemsNum(`${x}|${y}`, 'players');
            // console.log(coordItemsNum);

            // If 0 remove sprites, otherwise update.
            if (coordItemsNum <= 0) {
                console.log('DESTROYING PLAYERS');
                try {
                    marking.textSprite.destroy();
                    marking.tileSprite.destroy();
                    delete MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES.players;
                } catch(e) {
                    console.log('Error destroy item', e);
                }
            } else {
                marking.textSprite.text = coordItemsNum;
            }
        }
    }


}