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