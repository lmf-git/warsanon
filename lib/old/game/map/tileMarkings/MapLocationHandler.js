import _ from 'underscore';

import MapLocationElement from './sprite/MapLocationElement';
import TileData from '../data/tileData';
import RegionEntities from '../data/regionEntities';


export default class MapLocationHandler {

    // Add data and add/update marking.
    static add(region, player, key) {
        console.log(player);
        if (!RegionEntities.isMobilising(player)) {
            MapLocationElement.addTileMarking(player.coords.x, player.coords.y);
        }
    }

    static update(region, player, key) {
        const prev = MapData.ENTITIES_LOADED.players[key];
        console.log(prev, player);
        MapLocationElement.updateItemMarking(player.coords.x, player.coords.y);
    }

    // Remove data and remove/update marking.
    static remove(region, player, key) {
        MapLocationElement.removeMarking(player.coords.x, player.coords.y);
    }

}