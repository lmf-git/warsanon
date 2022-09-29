// Shared object for map.
const MapConfig = {
    chunks: {},

    // Viewport configuration and shared state.
    viewport: {
        position: null,
        setPosition: undefined,

        chunks: [],
        setChunks: undefined,
        
        scale: 400,

        clicked: false,
        moved: false,
        
        element: null
    }
};

export default MapConfig;