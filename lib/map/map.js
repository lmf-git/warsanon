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
        cursorPosition: {
            x: null,
            y: null
        },
        clicked: false,
        moved: false,
        element: null
    }
};

export default MapConfig;