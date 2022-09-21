import * as PIXI from 'pixi.js';
import * as PIXI_VIEWPORT from 'pixi-viewport';
import MapData from '../mapData';
import TileHandler from './tileHandler';
import RegionHandler from './regionHandler';


export default class Viewport {

    static initialise() {
        const mapContainer = document.getElementById('map-container');
        MapData.mapViewport = new PIXI_VIEWPORT.Viewport({
            screenWidth: mapContainer.clientWidth,
            screenHeight: mapContainer.clientHeight,
            worldWidth: mapContainer.clientWidth,
            worldHeight: mapContainer.clientHeight,
            interaction: MapData.mapApp.renderer.interaction
        });

        MapData.mapApp.stage.addChild(MapData.mapViewport);

        this.addLayerWrappers();

        MapData.mapViewport
            .drag()
            .pinch()
            // .wheel({ smooth: 60 })
            // .decelerate(); Turned off for optimisation, never stops firing.
            .clampZoom({ 
                minWidth: 400,
                minHeight: 400,
                maxHeight: mapContainer.clientWidth * 10,
                maxWidth: mapContainer.clientWidth * 10
            })

        this.attachTileLoadingHandlers();
    }

    static addLayerWrappers() {
        MapData.tileWrapper = new PIXI.Container();
        MapData.mapViewport.addChild(MapData.tileWrapper);

        MapData.structureWrapper = new PIXI.Container();
        MapData.mapViewport.addChild(MapData.structureWrapper);

        MapData.tileMarkingWrapper = new PIXI.Container();
        MapData.mapViewport.addChild(MapData.tileMarkingWrapper);

        MapData.currentLocationWrapper = new PIXI.Container();
        MapData.mapViewport.addChild(MapData.currentLocationWrapper);
    }

    static attachTileLoadingHandlers() {
        // TODO: Seems to continue firing after mapComponent unmounted (or should be unmounted)
        MapData.mapViewport.on('moved', () => {
            TileHandler.setCurrentTile();
            RegionHandler.loadCurrentCoordinateRegion();
        });

        MapData.mapViewport.on('moved-end', TileHandler.setCurrentTile);
        MapData.tileTrackingInterval = setInterval(TileHandler.setCurrentTile, 500);
    }

    static detachTileLoadingHandlers() {
        MapData.mapViewport.off('moved');
        MapData.mapViewport.off('moved-end');
        clearInterval(MapData.tileTrackingInterval);
    }


}