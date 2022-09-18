import MapData from "../mapData";

export default class RegionEntities {


    static getCoords(entity) {
        return { X: entity.coords.x, Y: entity.coords.y };
    }

    static getCoordsStr(entity) {
        return entity.coords.x + '|' + entity.coords.y;
    }

    static isMobilising(entity) {
        if (typeof entity.activity !== 'undefined') {
            if (entity.activity === 'mobilising') return true;
        }
        return false;
    }

    static removeData(entity, key, collectionKey) {
        const coordsString = entity.coords.x + '|' + entity.coords.y;
        const tile = MapData.TILES_LOADED[coordsString];
        const collection = tile.DATA[collectionKey];

        if (typeof collection !== 'undefined') {
            if (typeof collection[key] !== 'undefined') {
                delete MapData.TILES_LOADED[coordsString].DATA[collectionKey][key];
            }
        }
    }

    static setData(entity, key, collectionKey) {
        // FIXME: Add entity data separately to coordinate for reverse lookups.
        const coords = entity.coords.x + '|' + entity.coords.y;
        if (typeof MapData.TILES_LOADED[coords].DATA[collectionKey] === 'undefined') {
            MapData.TILES_LOADED[coords].DATA[collectionKey] = {};   
        }
        MapData.TILES_LOADED[coords].DATA[collectionKey][key] = entity;
    }


}