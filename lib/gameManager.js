import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';
import MapConfig from "./map/mapConfig";
import NoiseHandler from "./noiseHandler";

const terrainTiles = { 
    OCEAN: '/map/textures/OCEAN.png',
    BEACH: '/map/textures/BEACH.png',
    SCORCHED: '/map/textures/SCORCHED.png',
    BARE: '/map/textures/BARE.png',
    TUNDRA: '/map/textures/TUNDRA.png',
    SNOW: '/map/textures/SNOW.png',
    TEMPERATE_DESERT: '/map/textures/TEMPERATE_DESERT.png',
    SHRUBLAND: '/map/textures/SHRUBLAND.png',
    TAIGA: '/map/textures/TAIGA.png',
    TEMPERATE_DECIDUOUS_FOREST: '/map/textures/TEMPERATE_DECIDUOUS_FOREST.png',
    TEMPERATE_RAIN_FOREST: '/map/textures/TEMPERATE_RAIN_FOREST.png',
    SUBTROPICAL_DESERT: '/map/textures/SUBTROPICAL_DESERT.png',
    GRASSLAND: '/map/textures/GRASSLAND.png',
    TROPICAL_SEASONAL_FOREST: '/map/textures/TROPICAL_SEASONAL_FOREST.png',
    TROPICAL_RAIN_FOREST: '/map/textures/TROPICAL_RAIN_FOREST.png'
};

export default class GameManager {

    static bootstrap(setOverlay) {
        console.log('Bootstrapping the game [map only].');
        //setOverlay('spawn');
    }

    static async loadChunk(x, y) {
        const chunkSize = 15;
        //get chunk detail from game server
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
        
        for (let i = 0; i < chunkSize; i++) {
            for (let j = 0; j < chunkSize; j++) {
                const biome = terrainTiles[NoiseHandler.calculateTileNoiseType(x + j, y + i)];
                chunk.terrain.push({
                    x: x * chunkSize + j,
                    y: y * chunkSize + i,
                    sprite: new PIXI.Sprite.from(biome)
                });
                MapConfig.pixi.stage.addChild(chunk.terrain[i * chunkSize + j].sprite);
            }
        }
        
        for (let i = 0; i < chunk.structures.length; i++) {
            const texture = await Assets.load('/map/structures/' + chunk.structures[i].type + ".png");
            chunk.structures[i].sprite = new PIXI.Sprite(texture);
            MapConfig.pixi.stage.addChild(chunk.structures[i].sprite);
        }

        MapConfig.pixi.ticker.add(() => {
            for (let i = 0; i < chunkSize; i++) {
                for (let j = 0; j < chunkSize; j++) {
                    chunk.terrain[i * chunkSize + j].sprite.x = (MapConfig.viewport.position.x + chunk.terrain[i * chunkSize + j].x) * MapConfig.viewport.scale + MapConfig.mapElem.width / 2;
                    chunk.terrain[i * chunkSize + j].sprite.y = (MapConfig.viewport.position.y + chunk.terrain[i * chunkSize + j].y) * MapConfig.viewport.scale + MapConfig.mapElem.height / 2;
                    chunk.terrain[i * chunkSize + j].sprite.width = MapConfig.viewport.scale;
                    chunk.terrain[i * chunkSize + j].sprite.height = MapConfig.viewport.scale;
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