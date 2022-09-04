// Shared object for map.
const Map = {
    chunks: {},

    // Viewport configuration and shared state.
    viewport: {
        zoom: 1,
        position: {
            x: null,
            y: null
        },
        clicked: false
    }
};

export default Map;