import * as PIXI from 'pixi.js';

import MapData from '../../mapData';
import ScreenGeometry from '../../geometry/screenGeometry';
import RegionHandler from '../../components/regionHandler';
import TileData from '../../data/tileData';

export default class MapUnitGroupElement {

    /* SPRITES & RENDERING */
    static createTileMarking() {  
        // let sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        let sprite = new PIXI.Sprite(MapData.pixiLoader.resources['/static/assets/map/markings/UNITS.png'].texture);
        
        sprite.anchor.set(1, 1);
        sprite.width = sprite.height = MapData.tileHeight / 2;
        sprite.rotation = Math.PI * 2 * 0.125;
        // sprite.tint = 0xCB0D0F;
        return sprite;
    }

    static addTileMarking(x, y) {
        const groupMarking = TileData.getTileMarkingSprite(x, y, 'unitGroups');
        if (!groupMarking) {
            const tileSprite = this.createTileMarking();
            const unitGroupsNum = TileData.getFieldItemsNum(`${x}|${y}`, 'unitGroups');
            const textSprite = new PIXI.Text(unitGroupsNum);
            textSprite.anchor.set(0.5, 1.75);
            textSprite.style.font = "bold 10px arial";
            textSprite.style.align = "left";
            textSprite.style.fill = 0xFFFFFF;
            textSprite.text = unitGroupsNum;
    
            // Position all at same location (anchor repositions each)
            const coordinates = ScreenGeometry.GameToScreenCoords(x, y);
            textSprite.x = tileSprite.x = coordinates.X;
            textSprite.y = tileSprite.y = coordinates.Y;
    
            MapData.tileMarkingWrapper.addChild(tileSprite);
            MapData.tileMarkingWrapper.addChild(textSprite);
            
            TileData.setTileDataSprites(x, y, 'unitGroups', { textSprite, tileSprite });
        }
    }

    // TODO: Update tile colour based on number?
    static updateUnitGroupMarking(x, y) {
        const groupMarking = TileData.getTileMarkingSprite(x, y, 'unitGroups');        
        if (groupMarking) {
            const coordUnitGroupsNum = TileData.getFieldItemsNum(`${x}|${y}`, 'unitGroups');

            // If 0 remove sprites, otherwise update.
            if (coordUnitGroupsNum <= 0) {
                try {
                    groupMarking.textSprite.destroy();
                    groupMarking.tileSprite.destroy();
                    delete MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES.unitGroups;
                } catch(e) {
                    console.log('Error destroy unitGroup', e);
                }
            } else {
                groupMarking.textSprite.text = coordUnitGroupsNum;
            }
        }
    }

}