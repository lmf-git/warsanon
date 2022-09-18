import ScreenGeometry from '../geometry/screenGeometry';
import ChunkGeometry from '../geometry/chunkGeometry';
import MapData from '../mapData';
import TileHandler from './tileHandler';
import WorldDataHelper from '../../../world/worldDataHelper';
import DataHelper from '../../../../utils/dataHelper';
import FirebaseHelper from '../../../auth/firebaseHelper';

import MapUnitGroupHandler from '../tileMarkings/MapUnitGroupHandler';
import MapItemHandler from '../tileMarkings/MapItemHandler';
import MapStructureHandler from '../tileMarkings/MapStructureHandler';
import MapPlayersHandler from '../tileMarkings/MapPlayersHandler';
import TileData from '../data/tileData';
import RegionData from '../data/regionData';
import RegionEntities from '../data/regionEntities';


export default class RegionHandler {

    static _dataKeysList = [
        'unitGroups',
        'items',
        'players',
        'structure',
    ]

    static regionDataHandlers = {
        items: MapItemHandler,
        unitGroups: MapUnitGroupHandler,
        players: MapPlayersHandler,
        structure: MapStructureHandler,
    }

    static LoadRegionTilesByCoordinates(regionX, regionY) {
        const chunkSize = MapData.chunkSize;
        
        if (!RegionData.isRegionLoaded(regionX, regionY)) {
            const regionStartX = (regionX * chunkSize);
            const regionEndX = regionStartX + chunkSize;
            const regionStartY = (regionY * chunkSize);
            const regionEndY = regionStartY + chunkSize;

            for (let x = regionStartX; x <= regionEndX; x++) {
                for (let y = regionStartY; y <= regionEndY; y++) {
                    // Check if still map page, due to nav interrupts glitch.
                    if (window.location.pathname === '/game/map') {
                        TileHandler.addTileAtCoordinates(x, y);
                    }
                }
            }
            
            RegionData.setLoadedRegion(regionX, regionY);
            this.addRegionDataListeners({ X: regionX, Y: regionY });
        }
    }

    static GetVisibleRegions() {
        const hitArea = MapData.mapViewport.hitArea;
        const scale = MapData.mapViewport.scale.x; // x and y scale should be the same?
        const scanIncrement = hitArea.width / ( (MapData.tileHeight / 2) * scale);
        const horizontalScreenPadding = hitArea.width * 0.90;
        const verticalScreenPadding = hitArea.height * 0.90;
        let visibleRegions = {};

        const leftScanStart = hitArea.left - horizontalScreenPadding;
        const rightScanEnd = hitArea.right + horizontalScreenPadding;
        const topScanStart = hitArea.top - verticalScreenPadding;
        const bottomScanEnd = hitArea.bottom + verticalScreenPadding;

        for (let scanX = leftScanStart; scanX < rightScanEnd; scanX += scanIncrement) {
            for (let scanY = topScanStart; scanY < bottomScanEnd; scanY += scanIncrement) {
                let currentGameTile = ScreenGeometry.ScreenToGameCoords(scanX, scanY, MapData.origin);
                let currentChunk = ChunkGeometry.getCoordinateChunk(currentGameTile.x, currentGameTile.y);

                if (typeof visibleRegions !== 'undefined') {
                    visibleRegions[currentChunk.x + '|' + currentChunk.y] = true;
                }
            }
        }

        return visibleRegions;
    }

    static loadCurrentCoordinateRegion() {
        const hitArea = MapData.mapViewport.hitArea;
        let gameCoords = ScreenGeometry.ScreenToGameCoords(hitArea.x + hitArea.width / 2, hitArea.y + hitArea.height / 2);
        let chunk = ChunkGeometry.getCoordinateChunk(gameCoords.x, gameCoords.y);
        this.LoadRegionTilesByCoordinates(chunk.x, chunk.y);
    }

    static clearRegionDataListener(region) {}

    static clearAllRegionDataListeners() {
        Object.keys(MapData.regionDataListeners).forEach(listenerKey => {
            const chunkistener = MapData.regionDataListeners[listenerKey];
            chunkistener.ref.off();
        })
    }

    // Add region modification/insertion/deletion firebase listeners.
    static addRegionDataListeners(region) {
        const worldKey = MapData.world.config.name
        const chunkPath = WorldDataHelper.getWorldGameDataRefKey(worldKey) + 'chunks/' + region.X + '|' + region.Y;
        // const regionRef = FirebaseHelper._db().ref(chunkPath);

        const isMap = () => {
            if (window.location.pathname === '/game/map') return true;
            return false;
        }

        // For each region data key, add the required listeners.
        this._dataKeysList.forEach(key => {
            const chunkRef = FirebaseHelper._db().ref(chunkPath + '/' + key);
            MapData.regionDataListeners[region.X + '|' + region.Y] = {
                ref: chunkRef,
                listeners: ['child_added', 'child_changed', 'child_removed']
            }

            chunkRef.on('child_added', (snapshot) => {
                const data = snapshot.val()
                if (data && isMap()) {
                    TileData.addItem(data, snapshot.ref.key, key);
                    this.regionDataHandlers[key].add(region, data, snapshot.ref.key);
                }
            });
            chunkRef.on('child_changed', (snapshot) => {
                const data = snapshot.val();
                if (data && isMap()) {
                    // console.log('CHANGED_LISTENER_ITEM_' + key);
                    RegionEntities.setData(data, snapshot.ref.key, key);
                    if (typeof this.regionDataHandlers[key].update === 'function') {
                        this.regionDataHandlers[key].update(region, data, snapshot.ref.key);
                    }
                }
            });
            chunkRef.on('child_removed', (snapshot) => {
                const data = snapshot.val();
                if (data && isMap()) {
                    // console.log('REMOVE_LISTENER_ITEM_' + key);
                    RegionEntities.removeData(data, snapshot.ref.key, key);
                    this.regionDataHandlers[key].remove(region, data, snapshot.ref.key);
                }
            });

        })
    }

}