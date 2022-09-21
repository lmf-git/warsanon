import _ from 'underscore';
import MapStructureElement from './sprite/MapStructureElement';
import TileData from '../data/tileData';
import MapData from '../mapData';


export default class MapStructureHandler {

    // Add data and add/update marking.
    static add(region, structure, key) {
        structure._key = key;
        if (TileData.getTileMarkingSprite(structure.coords.x, structure.coords.y, 'structure')) {
            MapStructureElement.updateStructureMarking(structure);
        } else {
            MapStructureElement.addStructureMarking(structure);
        }
    }

    // Remove data and remove/update marking.
    static remove(region, structure, key) {
        MapStructureElement.updateStructureMarking(structure);
    }

}