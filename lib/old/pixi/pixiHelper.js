import * as PIXI from 'pixi.js';
import { Promise } from 'es6-promise';
import MapData from '../../src/game/map/mapData';



export default class PixiHelper {

    static placeSpriteAtTile(tile, sprite) {

    }

    static getTexture(texturePath) {
        return MapData.pixiLoader.resources[texturePath].texture
    }

    static sprite(texture = PIXI.Texture.WHITE) {
        let sprite = new PIXI.Sprite(texture);
        return sprite;
    }

    static spriteAtCoordinate(gameCoordinates, sprite) {
        
    }

    static deleteContainerSprites(container) {
        return new Promise(resolve => {
            if (container.children.length === 0) {
                resolve()
            } else {
                while (container.children.length > 0) {
                    if (container.children.length === 1) {
                        container.children[0].destroy();
                        resolve();
                    } else {
                        container.children[0].destroy();
                    }
                }
            }
        })
    }

}
  