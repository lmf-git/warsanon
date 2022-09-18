import { useEffect } from "react";
import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';

import MapConfig from 'lib/map/mapConfig';
import { setup } from "lib/map/controls";
import map from 'lib/map/mapConfig';
import { VILLAGES } from 'lib/map/assets';

import styles from '@components/Map/Map.module.css';

export default function Map() {
    useEffect(() => {
        if (window.safari !== undefined)
            PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL;
        
        const view = document.querySelector('#map');
        const resizeTo = document.querySelector('#map-container');
        const engine =  MapConfig.pixi = new PIXI.Application({ view, resizeTo });

        setup();

        // Some placeholder villages, will be loaded from db in future
        let structures = [
            { x : -1, y : -1, type : "ally_village" },
            { x : 0, y : 0, type : "own_spawn" },
            { x : 4, y : 4, type : "friendly_village" },
            { x : 2, y : 3, type : "enemy_village" },
            { x : 1, y : 5, type : "enemy_village" },
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
                    structures[i].sprite.x = (map.viewport.position.x + structures[i].x + map.viewport.width / 2) / map.viewport.width * engine.renderer.width;
                    structures[i].sprite.y = (map.viewport.position.y + structures[i].y + map.viewport.width / 2) / map.viewport.width * engine.renderer.height;
                    structures[i].sprite.width = engine.renderer.width / map.viewport.width;
                    structures[i].sprite.height = engine.renderer.height / map.viewport.width;

                    // structures[i].sprite.x = 0;
                    // structures[i].sprite.y = 0;
                    // structures[i].sprite.width = 50;
                    // structures[i].sprite.height = 50;
                }
            });
        };

        load();
    }, []);
    return <canvas id="map" className={styles.map} />
}
