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
    
    static chunks = [];
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
        console.log('Bootstrapping the game [map only].');
        //setOverlay('spawn');
    }

    // TODO: Implement and use 
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