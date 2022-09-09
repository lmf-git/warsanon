// Shared object for map.
const MapConfig = {
    chunks: {},

    pixi: null,

    // Viewport configuration and shared state.
    viewport: {
        width: 1,
        position: {
            x: null,
            y: null
        },
        clicked: false,

        element: null
    }
};

export default MapConfig;