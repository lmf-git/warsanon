import * as PIXI from 'pixi.js';
import _ from 'underscore';

import MapData from '../../mapData';
import ScreenGeometry from '../../geometry/screenGeometry';
import TileData from '../../data/tileData';
import RegionEntities from '../../data/regionEntities';
import PlayerData from '../../../player/playerData';
import PixiHelper from '../../../../../utils/pixi/pixiHelper';


export default class MapStructureElement {

    /* SPRITES & RENDERING */
    static createStructure(structure) {
        const coords = RegionEntities.getCoords(structure);
        let villageTexture = this.calcTexture(structure)

        let sprite = new PIXI.Sprite(villageTexture);
        
        sprite.anchor.set(0.5);
        sprite.width = sprite.height = MapData.tileHeight;

        const screenCoordinates = ScreenGeometry.GameToScreenCoords(coords.X, coords.Y);
        sprite.x = screenCoordinates.X;
        sprite.y = screenCoordinates.Y;
    
        return sprite;
    }

    static addStructureMarking(structure) {
        const coords = RegionEntities.getCoords(structure);
        const sprite = this.createStructure(structure);
        MapData.structureWrapper.addChild(sprite);
        TileData.setTileDataSprites(coords.X, coords.Y, 'structure', { structureSprite: sprite });

        return sprite;
    }

    static updateStructureMarking(structure) {
        const coords = RegionEntities.getCoords(structure);
        const coordsKey = RegionEntities.getCoordsStr(structure);

        // UPDATE COLOUR BASED ON SAFETY STATUS: ALLIANCE, ENEMY, ETC
        const tileStructureData = TileData.getField(coordsKey, 'structure');

        // Check if value changed and sprite needs changing.
        if (_.isEmpty(tileStructureData)) {
            const structureMarking = TileData.getTileMarkingSprite(coords.X, coords.Y, 'structure');
            structureMarking.structureSprite.destroy({ children: true });
            delete MapData.TILES_LOADED[coordsKey].DATA.SPRITES.structure;
        }
    }


    static calcTexture(structure) {
        const player = PlayerData.getPlayerCookie(MapData.world.config.name);

        const basePath = '/static/assets/map/structures/';
        let texturePath = '';
        
        if (structure.type === 'spawn') {
            // Calculate is own spawn or general spawn.
            
            // FIXME: Will need to update spawn structure sprite image on spawn, like this:
            if (player.spawn.structureId === structure._key) {
                texturePath = 'spawn/own_spawn.png';                
            } else {
                texturePath = 'spawn/standard_spawn.png';
            }
        }

        if (structure.type === 'player_village') {
            texturePath = 'test_village.png';
        }

        
        const texture = PixiHelper.getTexture(basePath + texturePath);
        return texture;
    }

}