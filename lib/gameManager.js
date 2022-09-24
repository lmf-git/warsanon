import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';
import MapConfig from "./map/mapConfig";
import NoiseHandler from "./noiseHandler";

const PALETTE = { 
    OCEAN: '0x434278',
    BEACH: '0xCFBA8A',
    SCORCHED: '0x555555',
    BARE: '0x888888',
    TUNDRA: '0xbbbbaa',
    SNOW: '0xffffff',
    TEMPERATE_DESERT: '0xC6CF9B',
    SHRUBLAND: '0x889977',
    TAIGA: '0x99aa77',
    TEMPERATE_DECIDUOUS_FOREST: '0x679459',
    TEMPERATE_RAIN_FOREST: '0x347553',
    SUBTROPICAL_DESERT: '0xd2b98b',
    GRASSLAND: '0x88aa55',
    TROPICAL_SEASONAL_FOREST: '0x559944',
    TROPICAL_RAIN_FOREST: '0x448855'
};

export default class GameManager {
    static chunks = [];
    static chunkSize = 15;

    static bootstrap(setOverlay) {
        console.log('Bootstrapping the game [map only].');
        //setOverlay('spawn');
    }

    static async loadChunk(x, y) {
        

        // TODO get chunk detail from game server
        const chunk = {
            x: 0,
            y: 0,
            structures: [
                { x : 1, y : 1, type : "ally_village" },
                { x : 0, y : 0, type : "own_spawn" },
                { x : 4, y : 4, type : "friendly_village" },
                { x : 2, y : 3, type : "enemy_village" },
                { x : 1, y : 4, type : "enemy_village" }
            ],
            terrain: []
        };

        let pos = MapConfig.viewport.position;
        
        for (let i = 0; i < this.chunkSize; i++) {
            for (let j = 0; j < this.chunkSize; j++) {
                const biome = PALETTE[NoiseHandler.calculateTileNoiseType(x * this.chunkSize + j, y * this.chunkSize + i)];
                const square = new PIXI.Graphics();
                square.beginFill(biome);
                square.drawRect(0,0,20,20);
                square.endFill();
                chunk.terrain.push({
                    x: x * this.chunkSize + j,
                    y: y * this.chunkSize + i,
                    sprite: square
                });
                MapConfig.pixi.stage.addChild(square);
            }
        }
        
        for (let i = 0; i < chunk.structures.length; i++) {
            const texture = await Assets.load('/map/structures/' + chunk.structures[i].type + ".png");
            chunk.structures[i].sprite = new PIXI.Sprite(texture);
            MapConfig.pixi.stage.addChild(chunk.structures[i].sprite);
        }

        this.chunks.push(chunk);
    }
}