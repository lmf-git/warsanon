import 'isomorphic-fetch';
import DataHelper from '../../utils/dataHelper';
import MapData from '../game/map/mapData';
import FirebaseHelper from '../auth/firebaseHelper';

export default class WorldDataHelper {

    static async getWorldsConfigsData() {
        const worldsResponse = await fetch(this._dbHost() + 'worlds/configs.json');
        const worldsData = await worldsResponse.json();
        return DataHelper.jsonToArrayWithKey(worldsData);
    }

    static async getWorldConfigsData(worldkey) {
        const worldResponse = await fetch(this._dbHost() + 'worlds/configs/' + worldkey + '.json');
        const worldData = await worldResponse.json();
        return worldData;
    }

    static async getWorldGameData(worldKey, query = '') {
        const queryPath = this._dbHost() + this.getWorldGameDataRefKey(worldKey) + query;
        const worldResponse = await fetch(queryPath);
        const worldData = await worldResponse.json();
        return worldData;
    }

    static _dbHost() {
        return 'https://test-852ee.firebaseio.com/';
    }

    static getWorldsDataRefKey() {
        return 'worlds/game_data/';
    }

    static getWorldGameDataRefKey(worldKey) {
        return this.getWorldsDataRefKey() + worldKey + '/';
    }

}