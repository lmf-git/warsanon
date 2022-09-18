import MapData from "../mapData";


export default class RegionData {

    static isRegionLoaded(RegionX, RegionY) {
        return typeof MapData.REGIONS_LOADED[RegionX + '|' + RegionY] !== 'undefined';
    }

    static getLoadedRegions() {
        return MapData.REGIONS_LOADED;
    }

    static getRegion(RegionX, RegionY) {
        let result = null;
        if (typeof MapData.REGIONS_LOADED[RegionX + '|' + RegionY] !== 'undefined') {
            result = MapData.REGIONS_LOADED[RegionX + '|' + RegionY];
        }
        return result;
    }

    static setLoadedRegion(regionX, regionY) {
        MapData.REGIONS_LOADED[regionX + '|' + regionY] = {};
    }

}