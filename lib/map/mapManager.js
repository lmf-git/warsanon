import { controlsListen } from "./controls";
import MapConfig from "./mapConfig";
import NoiseHandler from "./noiseHandler";

// TODO: Don't load if already loaded.
// TODO: fix this to not need to be inside this method
const VILLAGE_IMAGES = {
    ALLY_VILLAGE: '/map/structures/ally_village.png',
    ENEMY_VILLAGE: '/map/structures/enemy_village.png',
    FRIENDLY_VILLAGE: '/map/structures/friendly_village.png',
    OWN_SPAWN: '/map/structures/own_spawn.png',
    STANDARD_SPAWN: '/map/structures/standard_spawn.png',
    TEST_VILLAGE: '/map/structures/test_village.png',
};

export default class MapManager {
    
    static chunkSize = 15;

    static chunkLoaded(x, y) {
        const chunkKey = x + '|' + y;
        return typeof MapConfig.chunksMeta?.[chunkKey] !== 'undefined';
    }

    static testStructures = [
        { 
            x: this.chunkSize + 1, 
            y: this.chunkSize + 1, 
            type: "ALLY_VILLAGE" 
        },
        { 
            x: this.chunkSize + 0, 
            y: this.chunkSize + 0, 
            type: "OWN_SPAWN" 
        },
        {
            x: this.chunkSize + 4, 
            y: this.chunkSize + 4, 
            type: "FRIENDLY_VILLAGE" 
        },
        {
            x: this.chunkSize + 2, 
            y: this.chunkSize + 3, 
            type: "ENEMY_VILLAGE" 
        },
        { 
            x: this.chunkSize + 1, 
            y: this.chunkSize + 4, 
            type: "ENEMY_VILLAGE"
         }
    ];

    static bootstrap(setOverlay, setOffset) {
        const { setPosition, position } = MapConfig.viewport;

        // Attach resize handler.
        window.addEventListener('resize', this.resize);
        
        setTimeout(() => {
            console.log('Bootstrapping the game [map only].');

            // Set the map element to the shared object.
            MapConfig.element = document.querySelector('#viewport');

            this.resize();

            // Calculate the offset for centering tiles in comparison to viewport.
            setOffset({ 
                x: 
                    MapConfig.viewport.width / 2 + 
                    (MapConfig.viewport.width / MapManager.chunkSize) / 2,
                y: 
                    MapConfig.viewport.height / 2 + 
                    (MapConfig.viewport.height / MapManager.chunkSize) / 2
            });

            // Update the position to trigger all other loading/centering.
            setPosition(position);
            
            // May need to handle a critical user flow when game starts.
            setOverlay('spawn');
        }, 0);
    }

    static addChunk(x, y) {
        const { setChunks, chunks } = MapConfig.viewport;
        const chunkKey = x + '|' + y;

        if (!(chunkKey in MapConfig.chunksMeta)) {
            const chunk = this.calcChunk(x, y);
            MapConfig.chunksMeta[chunkKey] = chunk;

            // Update the components.
            const prevChunks = chunks;
            prevChunks.push(chunk);

            setChunks([...prevChunks]);

            // TODO: Add event listener to the chunk.
            // ...
        }
    }

    static chunking() {
        const { position } = MapConfig.viewport;

        const currentChunk = {
            x: -Math.round(position.x),
            y: -Math.round(position.y)
        };

        // Load all of the chunks around new position that aren't loaded.
        for (let x = currentChunk.x - 2; x <= currentChunk.x + 1; x++)
            for (let y = currentChunk.y - 2; y <= currentChunk.y + 1; y++)
                if (!this.chunkLoaded(x, y))
                    this.addChunk(x, y);
    }

    static calcChunk(cX, cY) {
        const { position } = MapConfig.viewport;

        const chunk = {
            x: cX,
            y: cY,
            structures: [
                ...this.testStructures
            ],
            tiles: []
        };

        for (let i = 0; i < this.chunkSize; i++) {
            for (let j = 0; j < this.chunkSize; j++) {
                const x = Math.round(position.x + j);
                const y = Math.round(position.y - i);

                chunk.tiles.push({
                    x, y,
                    biome: NoiseHandler.biome(x, y)
                });
            }
        }

        // console.log(chunk);
        return chunk;
    }

    static resize() {
        MapConfig.viewport.width = MapConfig.element.offsetWidth;
        MapConfig.viewport.height = MapConfig.element.offsetHeight;

        // TODO: Reposition all the chunks, due to responsive - gap created after resize.
    }

    static calcChunkScreenPos(chunk) {
        const { height, width } = MapConfig.viewport;
        return {
            top: Math.round((chunk.y * height )) + 'px',
            left: Math.round((chunk.x * width )) + 'px',
        }
    }
}