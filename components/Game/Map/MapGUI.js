import { useEffect } from "react";
import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';

import MapConfig from 'lib/map/mapConfig';
import { controlsListen } from "lib/map/controls";
import map from 'lib/map/mapConfig';
import { VILLAGES } from 'lib/map/assets';
import NoiseHandler from "lib/noiseHandler";

import styles from '@components/Game/Map/MapGUI.module.css';

export default function MapGUI() {
    useEffect(() => {
        if (window.safari !== undefined)
            PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL;

        const view = document.querySelector('#map');
        const resizeTo = document.querySelector('#map-container');

        // Initial sizing.
        view.width = resizeTo.offsetWidth;
        view.height = resizeTo.offsetHeight;

        const engine =  MapConfig.pixi = new PIXI.Application({ view, resizeTo });


        controlsListen();

        /*
        // Some placeholder villages, will be loaded from db in future
        let structures = [
            { x : -1, y : -1, type : "ally_village" },
            { x : 0, y : 0, type : "own_spawn" },
            { x : 4, y : 4, type : "friendly_village" },
            { x : 2, y : 3, type : "enemy_village" },
            { x : 1, y : 5, type : "enemy_village" }
        ];

        // 
        const load = async () => {
            for (let i = 0; i < structures.length; i++) {
                const texture = await Assets.load('/map/structures/' + structures[i].type + ".png");
                structures[i].sprite = new PIXI.Sprite(texture);
                engine.stage.addChild(structures[i].sprite);
            }
            
            engine.ticker.add(() => {
                for (let i = 0; i < structures.length; i++) {
                    structures[i].sprite.x = (MapConfig.viewport.position.x + structures[i].x) * MapConfig.viewport.scale + view.width / 2;
                    structures[i].sprite.y = (MapConfig.viewport.position.y + structures[i].y) * MapConfig.viewport.scale + view.height / 2;
                    structures[i].sprite.width = MapConfig.viewport.scale;
                    structures[i].sprite.height = MapConfig.viewport.scale;
                }
            });
        };
        */
        
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

        

        const chunkSize = 25;
        async function loadChunk(x, y){
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
            }

            let pos = MapConfig.viewport.position;
            
            for(let i = 0; i < chunkSize; i++){
                for(let j = 0; j < chunkSize; j++){
                    chunk.terrain.push(
                        {x : x * chunkSize + j,
                         y : y * chunkSize + i,
                         sprite : new PIXI.Sprite.from(terrainTiles[NoiseHandler.calculateTileNoiseType(x + j, y + i)])
                        });
                    engine.stage.addChild(chunk.terrain[i * chunkSize + j].sprite);
                }
            }
            
            for (let i = 0; i < chunk.structures.length; i++) {
                const texture = await Assets.load('/map/structures/' + chunk.structures[i].type + ".png");
                chunk.structures[i].sprite = new PIXI.Sprite(texture);
                engine.stage.addChild(chunk.structures[i].sprite);
            }

            engine.ticker.add(() => {
                for(let i = 0; i < chunkSize; i++){
                    for(let j = 0; j < chunkSize; j++){
                        chunk.terrain[i * chunkSize + j].sprite.x = (MapConfig.viewport.position.x + chunk.terrain[i * chunkSize + j].x) * MapConfig.viewport.scale + view.width / 2;
                        chunk.terrain[i * chunkSize + j].sprite.y = (MapConfig.viewport.position.y + chunk.terrain[i * chunkSize + j].y) * MapConfig.viewport.scale + view.height / 2;
                        chunk.terrain[i * chunkSize + j].sprite.width = MapConfig.viewport.scale;
                        chunk.terrain[i * chunkSize + j].sprite.height = MapConfig.viewport.scale;
                    }
                }

                for (let i = 0; i < chunk.structures.length; i++) {
                    chunk.structures[i].sprite.x = (MapConfig.viewport.position.x + chunk.structures[i].x) * MapConfig.viewport.scale + view.width / 2;
                    chunk.structures[i].sprite.y = (MapConfig.viewport.position.y + chunk.structures[i].y) * MapConfig.viewport.scale + view.height / 2;
                    chunk.structures[i].sprite.width = MapConfig.viewport.scale;
                    chunk.structures[i].sprite.height = MapConfig.viewport.scale;
                }
            });
        }

        //get this from game server
        MapConfig.seed = 2384832974;
        NoiseHandler.initialise();
        loadChunk(0, 0);
        //load();

    }, []);

    return <canvas id="map" className={styles.map} />
}
