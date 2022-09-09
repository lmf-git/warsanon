// Shared object for map.
const MapConfig = {
    chunks: {},

    pixi: null,

    // Viewport configuration and shared state.
    viewport: {
        width: 1,
        position: {
            x: 0,
            y: 0
        },
        clicked: false,

        element: null
    }
};

export default MapConfig;