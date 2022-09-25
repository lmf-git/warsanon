import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';
import MapConfig from "./mapConfig";
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


 

export default class MapManager {
    
    static chunks = [];
    static chunkSize = 15;

    static bootstrap(setOverlay) {
        console.log('Bootstrapping the game [map only].');
        //setOverlay('spawn');
    }

    // TODO: Implement and use 
    static populateScreenChunks() {
        // Get screen center position
        const { position } = MapConfig.viewport;
        for (let x = position.x - 2; x <= position.x + 1; x++)
            for (let y = position.y - 2; y <= position.y + 1; y++)
                this.loadChunk(x, y);
    }

    static async loadChunk(x, y) {
        // TODO: Don't load if already loaded.
        // TODO: fix this to not need to be inside this method
        const VILLAGES = {
        ALLY_VILLAGE: await Assets.load('/map/structures/ally_village.png'),
        ENEMY_VILLAGE: await Assets.load('/map/structures/enemy_village.png'),
        FRIENDLY_VILLAGE: await Assets.load('/map/structures/friendly_village.png'),
        OWN_SPAWN: await Assets.load('/map/structures/own_spawn.png'),
        STANDARD_SPAWN: await Assets.load('/map/structures/standard_spawn.png'),
        TEST_VILLAGE: await Assets.load('/map/structures/test_village.png'),
        }

        
        // TODO get chunk detail from game server
        const chunk = {
            x: 0,
            y: 0,
            structures: [
                { x: x * this.chunkSize + 1, y: y * this.chunkSize + 1, type : "ALLY_VILLAGE" },
                { x: x * this.chunkSize + 0, y: y * this.chunkSize + 0, type : "OWN_SPAWN" },
                { x: x * this.chunkSize + 4, y: y * this.chunkSize + 4, type : "FRIENDLY_VILLAGE" },
                { x: x * this.chunkSize + 2, y: y * this.chunkSize + 3, type : "ENEMY_VILLAGE" },
                { x: x * this.chunkSize + 1, y: y * this.chunkSize + 4, type : "ENEMY_VILLAGE" }
            ],
            terrain: []
        };

        // TODO: Implement
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
        
        // TODO: Add the database event listeners in place of this.
        for (let i = 0; i < chunk.structures.length; i++) {
            const texture = VILLAGES[chunk.structures[i].type];
            chunk.structures[i].sprite = new PIXI.Sprite(texture);
            MapConfig.pixi.stage.addChild(chunk.structures[i].sprite);
        }

        this.chunks.push(chunk);
    }

    static tick() {
        const { chunkSize } = this;
        this.chunks.map(chunk => {
            for (let i = 0; i < chunkSize; i++) {
                for (let j = 0; j < chunkSize; j++) {
                    const scale = MapConfig.viewport.scale;
                    chunk.terrain[i * chunkSize + j].sprite.x = (MapConfig.viewport.position.x + chunk.terrain[i * chunkSize + j].x) * scale + MapConfig.mapElem.width / 2;
                    chunk.terrain[i * chunkSize + j].sprite.y = (MapConfig.viewport.position.y + chunk.terrain[i * chunkSize + j].y) * scale + MapConfig.mapElem.height / 2;
                    chunk.terrain[i * chunkSize + j].sprite.width = scale;
                    chunk.terrain[i * chunkSize + j].sprite.height = scale;
                }
            }

            for (let i = 0; i < chunk.structures.length; i++) {
                chunk.structures[i].sprite.x = (MapConfig.viewport.position.x + chunk.structures[i].x) * MapConfig.viewport.scale + MapConfig.mapElem.width / 2;
                chunk.structures[i].sprite.y = (MapConfig.viewport.position.y + chunk.structures[i].y) * MapConfig.viewport.scale + MapConfig.mapElem.height / 2;
                chunk.structures[i].sprite.width = MapConfig.viewport.scale;
                chunk.structures[i].sprite.height = MapConfig.viewport.scale;
            }
        });
    }
}