// Shared object for map.
const Config = {
    chunks: {},

    // Viewport configuration and shared state.
    viewport: {
        zoom: 1,
        position: {
            x: 0,
            y: 0
        },
        clicked: false,
        squares_on_screen: 5
    }
};

export default Config;