import { useEffect } from "react";
import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';

import MapConfig from 'lib/map/mapConfig';
import { controlsListen } from "lib/map/controls";
import map from 'lib/map/mapConfig';
import { VILLAGES } from 'lib/map/assets';

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
                    structures[i].sprite.x = (map.viewport.position.x + structures[i].x) * map.viewport.scale + view.width / 2;
                    structures[i].sprite.y = (map.viewport.position.y + structures[i].y) * map.viewport.scale + view.height / 2;
                    structures[i].sprite.width = map.viewport.scale;
                    structures[i].sprite.height = map.viewport.scale;
                }
            });
        };

        load();
    }, []);
    return <canvas id="map" className={styles.map} />
}
