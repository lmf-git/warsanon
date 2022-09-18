
import MapUnitGroupElement from './sprite/MapUnitGroupElement';
import TileData from '../data/tileData';
import MapData from '../mapData';
import RegionEntities from '../data/regionEntities';


export default class MapUnitGroupHandler {

    // Add data and add/update marking.
    static add(region, group, key) {
        if (!RegionEntities.isMobilising(group)) {
            // Check if tile marking needs updating or adding.
            if (TileData.getTileMarkingSprite(group.coords.x, group.coords.y, 'unitGroups')) {
                MapUnitGroupElement.updateUnitGroupMarking(group.coords.x, group.coords.y);
            } else {
                MapUnitGroupElement.addTileMarking(group.coords.x, group.coords.y);
            }
        }
    }

    static update(region, item, key) {
        const prev = MapData.ENTITIES_LOADED.unitGroups[key];

        // If mobilisation status removed, add marking.
        if (RegionEntities.isMobilising(prev) && !RegionEntities.isMobilising(item)) {
            this.add(null, item, key);
        }

        // If coords change, update.
        if (prev.coords.x !== item.coords.x || prev.coords.y !== item.coords.y) {
            RegionEntities.removeData(prev, key, 'unitGroups');
            MapUnitGroupElement.updateUnitGroupMarking(prev.coords.x, prev.coords.y);

            TileData.addItem(item, key, 'unitGroups');
            this.add(null, item, key);
        }

        MapData.ENTITIES_LOADED.players[key] = item;
    }

    // Remove data and remove/update marking.
    static remove(region, group, key) {  
        MapUnitGroupElement.updateUnitGroupMarking(group.coords.x, group.coords.y);
    }

}