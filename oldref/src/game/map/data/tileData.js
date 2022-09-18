import MapData from '../mapData';
import RegionEntities from './regionEntities';


export default class TileData {

    static isTileSet(x, y) {
        return MapData.TILES_LOADED.hasOwnProperty(x + '|' + y);
    }

    static setLoadedTile(tile) {
        MapData.TILES_LOADED[tile.COORDINATES.X + '|' + tile.COORDINATES.Y] = tile;
    }

    static addItem(item, key, collectionKey) {
        // console.log('addItem');

        const coords = RegionEntities.getCoordsStr(item);
        if (typeof MapData.TILES_LOADED[coords] === 'undefined') {
            MapData.TILES_LOADED[coords] = { DATA: {} };
        }

        if (typeof MapData.TILES_LOADED[coords].DATA[collectionKey] === 'undefined') {
            MapData.TILES_LOADED[coords].DATA[collectionKey] = {};
        }

        MapData.ENTITIES_LOADED[collectionKey][key] = item;
        MapData.TILES_LOADED[coords].DATA[collectionKey][key] = item;
    }

    static getNthFieldItem(coords, field, nth = 0) {
        let result = null;
        let data = this.getField(coords, field);

        if (!_.isEmpty(data)) result = data[Object.keys(data)[nth]];
    
        return result;
    }

    static getData(coords, field = '') {
        if (field) {
            return this.getField(coords, field);
        } else {
            if (typeof MapData.TILES_LOADED[coords] !== 'undefined') {
                if (typeof MapData.TILES_LOADED[coords].DATA !== 'undefined') {
                    return MapData.TILES_LOADED[coords].DATA;
                }
            }
            return null
        }
    }

    static getField(coords, key) {
        if (typeof MapData.TILES_LOADED[coords] !== 'undefined') {
            if (typeof MapData.TILES_LOADED[coords].DATA[key] !== 'undefined') {
                return MapData.TILES_LOADED[coords].DATA[key];
            }
        }
        return null
    }

    static getFieldKeys(coords, field) {
        const fieldValue = TileData.getField(coords, field);
        let keys = [];
        if (fieldValue) keys = Object.keys(fieldValue);
        return keys;
    }

    static getSprites(x, y) {
        return this.getField(`${x}|${y}`, 'SPRITES')
    }

    static getTileMarkingSprite(x, y, key) {
        const sprites = this.getSprites(x, y)
        if (sprites) {
            if (typeof sprites[key] !== 'undefined') return sprites[key];
        }
        return null;
    }

    static setTileDataSprites(x, y, key, data) {
        if (typeof MapData.TILES_LOADED[x + '|' + y] === 'undefined') return null;
        if (typeof MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES === 'undefined') MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES = {};
        if (typeof MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES[key] === 'undefined') MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES[key] = {};
        MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES[key] = data;
    }

    static getFieldItemsNum(coordString, field) {
        let items = 0;
        const fieldValue = this.getField(coordString, field);
        if (fieldValue) {
            items = Object.keys(fieldValue).length;
            // console.log('settingFieldNum', items);
        }
        return items;
    }


    static getFieldItemsVisibleNum(coordString, field) {
        let items = [];
        const fieldValue = this.getField(coordString, field);
        if (fieldValue) {
            const itemKeys = Object.keys(fieldValue);
            itemKeys.map(key => {
                const item = fieldValue[key];
                if (!RegionEntities.isMobilising(item)) {
                    items.push(item)
                }
            });
        }
        const count = items.length;
        return count;
    }

    // static dataHelperSetSubItem(hostObject, path, item) {
    //     try {
    //         const path = path.split('.');
    //         const numStepsTaken = 0;
    //         let references = [];
    //         path.forEach(step => {
    //             // If no previous step, start from beginning.
    //             if (numStepsTaken = 0) {
    //                 references.push(hostObject[step]);
    //             } else {
    //                 // Updated latest reference
    //                 if (typeof references[numStepsTaken - 1][step] !== 'undefined') {
    //                     let latestRef = references[numStepsTaken - 1][step]
    //                     references.push();
    //                 }

    //             }

    //             if (typeof MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES === 'undefined') MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES = {};
    //             numStepsTaken++;
    //         })
    //         if (typeof MapData.TILES_LOADED[x + '|' + y] === 'undefined') return null;
    //         if (typeof MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES === 'undefined') MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES = {};
    //         if (typeof MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES[key] === 'undefined') MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES[key] = {};
    //         MapData.TILES_LOADED[x + '|' + y].DATA.SPRITES[key] = data;
    //     } catch(e) {
    //         console.log('SetSubItem E:', e);
    //     }

    // }



    // Maybe unnecessary here.

}