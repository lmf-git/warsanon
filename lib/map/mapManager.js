import { controlsListen } from "./controls";
import MapConfig from "./mapConfig";
import NoiseHandler from "./noiseHandler";

const PALETTE = { 
    OCEAN: '#434278',
    BEACH: '#CFBA8A',
    SCORCHED: '#555555',
    BARE: '#888888',
    TUNDRA: '#bbbbaa',
    SNOW: '#ffffff',
    TEMPERATE_DESERT: '#C6CF9B',
    SHRUBLAND: '#889977',
    TAIGA: '#99aa77',
    TEMPERATE_DECIDUOUS_FOREST: '#679459',
    TEMPERATE_RAIN_FOREST: '#347553',
    SUBTROPICAL_DESERT: '#d2b98b',
    GRASSLAND: '#88aa55',
    TROPICAL_SEASONAL_FOREST: '#559944',
    TROPICAL_RAIN_FOREST: '#448855'
};

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

    static bootstrap(setOverlay) {
        // Attach resize handler.
        window.addEventListener('resize', this.resize);
        
        setTimeout(() => {
            console.log('Bootstrapping the game [map only].');

            // Set the map element to the shared object.
            MapConfig.element = document.querySelector('#viewport');
            // MapConfig.element = document.body;

            console.log(MapConfig.element.offsetHeight);
            console.log(MapConfig.element.offsetHeight)
            this.resize();

            // Load the 8 chunks around the chunk.
            this.populateScreenChunks();
            
            
            // May need to handle a critical user flow when game starts.
            // setOverlay('spawn');
        }, 0);
    }

    static populateScreenChunks() {
        const chunks = [];
        const { position, setChunks } = MapConfig.viewport;
        for (let x = position.x - 2; x <= position.x + 1; x++)
            for (let y = position.y - 2; y <= position.y + 1; y++) {
                // TODO: Add event listener to the chunk.
                // ...

                // Add chunk to chunks to be rendered.
                chunks.push(this.calcChunk(x, y));
            }

        console.log(chunks);
        setChunks(chunks);
    }

    static calcChunk(cX, cY) {
        const chunk = {
            x: cX * this.chunkSize,
            y: cY * this.chunkSize,
            structures: [
                ...this.testStructures
            ],
            tiles: []
        };

        for (let i = 0; i < this.chunkSize; i++) {
            for (let j = 0; j < this.chunkSize; j++) {
                const offsetX = cX * this.chunkSize + j;
                const offsetY = cY * this.chunkSize + i;
                const biome = PALETTE[NoiseHandler.biome(offsetX, offsetY)];
                chunk.tiles.push({
                    x: i,
                    y: j,
                    biome: biome
                });
            }
        }

        // console.log(chunk);
        return chunk;
    }

    static resize() {
        MapConfig.viewport.width = MapConfig.element.offsetWidth;
        MapConfig.viewport.height = MapConfig.element.offsetHeight;
        
        // MapConfig.element.offsetHeight;
    }

    static calcChunkScreenPos(chunk) {
        // console.log('Calculating chunk pos on screen from its chunk coordinates');
        // console.log(chunk);
        // console.log(MapConfig.viewport.height);
        
        return {
            top: `${chunk.y * MapConfig.viewport.height}px`,
            left: `${chunk.x * MapConfig.viewport.width}px`,
        }
    }
}