export default class MapData {
    // Terrain and moisture generation.
    static heightNoise = undefined;
    static moistureNoise = undefined;

    // World Data
    static world = {
        config: {

        },
        spawns: {
            
        },
        player: {
            
        }
    };

    // FIXME: Refactor into real data.
    static initialCoords = { 
        X: undefined, 
        Y: undefined 
    };

    static initialChunkLoader = undefined;

    // Graphic foundation.
    static mapApp = undefined;
    static mapViewport = undefined;
    static pixiLoader = undefined;

    // Layers
    static tileWrapper = undefined;
    static structureWrapper = undefined;
    static tileMarkingWrapper = undefined;
    static currentLocationWrapper = undefined;

    // Elements related to world tiles.
    static origin = undefined;
    static currentTile = undefined;

    // Loading data.
    static NUM_TILES_LOADED = 0;
    static TILES_LOADED = {};
    static REGIONS_LOADED = {};
    static ENTITIES_LOADED = {
        players: {},
        unitGroups: {},
        structure: {},
    }

    /* FIREBASE DATA LISTENERS */
    static regionDataListeners = {};

    // X|Y.ITEMID

    // Element sizing.
    static tileHeight = 100;
    static chunkSize = 40;
    static regionSize = 80;
    static continentSize = 160;

    // Observable for component updates.
    static currentTile$ = undefined;
    static regionDataEvent$ = undefined;

    // Interval used for filling event gaps.
    static tileTrackingInterval = undefined;
    
    // Animation Timing
    static tileLoadingSecs = 0.5;

    static endMap() {
        // MapApplication.annihilateLoading();
        clearInterval(this.tileTrackingInterval);
        
        if (this.mapViewport) {
            if (typeof this.mapViewport.destroy !== 'undefined') {
                this.mapViewport.destroy({ children: true });
            }
        }

        this.mapApp = this.mapViewport = undefined;
        this.clearLoadedData();
    }

    static clearLoadedData() {
        this.TILES_LOADED = {};
        this.REGIONS_LOADED = {};
    }

}