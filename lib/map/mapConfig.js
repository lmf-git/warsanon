export const BIOMES = { 
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

// Shared object for map.
const MapConfig = {
    chunksMeta: {},

    element: null,

    // Viewport configuration and shared state.
    viewport: {
        position: null,
        setPosition: null,

        chunks: [],
        setChunks: null,

        width: null,
        height: null,
        
        scale: 400,

        clicked: false,
        moved: false
    }
};

export default MapConfig;