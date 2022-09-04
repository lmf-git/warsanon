import map from "./map";

export const BIOMES = {
    TUNDRA: { url: '/map/textures/TUNDRA.png' },
    BARE: { url: '/map/textures/BARE.png' },
    BEACH: { url: '/map/textures/BEACH.png' },
    GRASSLAND: { url: '/map/textures/GRASSLAND.png' },
    OCEAN: { url: '/map/textures/OCEAN.png' },
    SCORCHED: { url: '/map/textures/SCORCHED.png' },
    SHRUBLAND: { url: '/map/textures/SHRUBLAND.png' },
    SNOW: { url: '/map/textures/SNOW.png' },
    SUBTROPICAL_DESERT: { url: '/map/textures/SUBTROPICAL_DESERT.png' },
    TAIGA: { url: '/map/textures/TAIGA.png' },
    TEMPERATE_DECIDUOUS_FOREST: { url: '/map/textures/TEMPERATE_DECIDUOUS_FOREST.png' },
    TEMPERATE_DESERT: { url: '/map/textures/TEMPERATE_DESERT.png' },
    TEMPERATE_RAIN_FOREST: { url: '/map/textures/TEMPERATE_RAIN_FOREST.png' },
    TROPICAL_RAIN_FOREST: { url: '/map/textures/TROPICAL_RAIN_FOREST.png' },
    TROPICAL_SEASONAL_FOREST: { url: '/map/textures/TROPICAL_SEASONAL_FOREST.png' },
};

// Note: There does not need to be a render loop for a turn based game.
// This is very inefficient but works for testing temporarily.
// Maybe we should use a load of gifs instead? Do no rendering via canvas?
export async function load_tiles(setVisibleRows) {
    const { horizontalTileNum } = map.viewport;

    // const rows = [
    //     [
    //         { x: -1, y: -1 }, 
    //         { x: 1, y: 1 }, 
    //         { x: 2, y: 2 }
    //     ]
    // ];

    // setVisibleRows(rows);

    return true;
}

// This is the map foundation.
// Draw the table based on size parameter, underlying (separate) from tile state/player data.
export function draw_tiles(position) {
    const { horizontalTileNum } = map.viewport;
    const rows = [];

    // console.log(position);

    const biomeKeys = Object.keys(BIOMES);

    for (let r = 0; r < horizontalTileNum; r++) {
        const cells = [];
        for (let c = 0; c < horizontalTileNum; c++) {
            const biomeKey = biomeKeys[Math.floor(Math.random() * biomeKeys.length)];
            const biome = BIOMES[biomeKey];

            cells.push({
                x: position.x - Math.floor(horizontalTileNum / 2) + c,
                y: position.y - Math.floor(horizontalTileNum / 2) + r,
                biome_url: biome.url,
                biome: biomeKey
            });
        }
        rows.push([...cells]);
    }

    // By rendering tiles in relation to viewport position it lets us load from any initial position.
    // for (const village of tiles){
        // context.drawImage(village_sprite,
        // (window.MAP.viewport.position.x + village.x) * square_width + canvas.width / 2,
        // (window.MAP.viewport.position.y + village.y) * square_height + canvas.height / 2, 
        // square_width, square_height);
    // }
    // Generate the top left corner tile based on width and position (center).

    // setVisibleRows(rows);
    return rows;
}