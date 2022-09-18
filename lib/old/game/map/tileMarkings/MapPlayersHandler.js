import MapPlayersElement from './sprite/MapPlayersElement';
import TileData from '../data/tileData';
import MapData from '../mapData';
import RegionEntities from '../data/regionEntities';


export default class MapPlayersHandler {

    static add(region, item, key) {
        if (!RegionEntities.isMobilising(item)) {
            // Check if tile marking needs updating or adding.
            if (TileData.getTileMarkingSprite(item.coords.x, item.coords.y, 'players')) {
                MapPlayersElement.updateItemMarking(item.coords.x, item.coords.y);
            } else {
                MapPlayersElement.addTileMarking(item.coords.x, item.coords.y);
            }
            MapData.ENTITIES_LOADED.players[key] = item;
        }
    }

    static update(region, item, key) {
        const prev = MapData.ENTITIES_LOADED.players[key];

        // If mobilisation status removed, add marking.
        if (RegionEntities.isMobilising(prev) && !RegionEntities.isMobilising(item)) {
            this.add(null, item, key);
        }

        // If coords change, update.
        if (prev.coords.x !== item.coords.x || prev.coords.y !== item.coords.y) {
            RegionEntities.removeData(prev, key, 'players');
            MapPlayersElement.updateItemMarking(prev.coords.x, prev.coords.y);

            TileData.addItem(item, key, 'players');
            this.add(null, item, key);
        }

        MapData.ENTITIES_LOADED.players[key] = item;
    }

    static remove(region, item, key) {
        console.log('removingPlayerMarking')
        MapPlayersElement.updateItemMarking(item.coords.x, item.coords.y);
    }

}