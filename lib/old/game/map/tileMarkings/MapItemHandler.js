import DataHelper from '../../../../utils/dataHelper';
import TileHandler from '../components/tileHandler';
import MapItemElement from './sprite/MapItemElement';
import TileData from '../data/tileData';


export default class MapItemHandler {

    static add(region, item, key) {
         // Check if tile marking needs updating or adding.
        if (TileData.getTileMarkingSprite(item.coords.x, item.coords.y, 'items')) {
            MapItemElement.updateItemMarking(item.coords.x, item.coords.y);
        } else {
            MapItemElement.addTileMarking(item.coords.x, item.coords.y);
        }
    }

    static remove(region, item, key) {
        MapItemElement.updateItemMarking(item.coords.x, item.coords.y);
    }

}