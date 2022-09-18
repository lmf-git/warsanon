import jsCookie from 'js-cookie';
import _ from 'underscore';
import { Promise } from 'es6-promise';
import FirebaseHelper from '../../auth/firebaseHelper';

// Units are stored/collected under coordinates
// [playerId]units[500|500]: { unitId: quantity }
export default class UnitsData {

    static addUnitsToPlayer(units, player) {

    }
    
    create() {

    }

    getById(id) {

    }

    update(id, data) {

    }

    delete(id) {
        
    }

    static getPlayerCookie(worldKey) {
        return jsCookie.getJSON(worldKey + '_player'); 
    }

    static setPlayerCookie(player, worldKey) {
        jsCookie.set(worldKey + '_player', player);
    }

    static updatePlayerCookie(worldKey, data) {
        const currentData = this.getPlayerCookie(worldKey);
        const newData = _.extend(currentData, data);
        this.setPlayerCookie(newData, worldKey);
    }

    static loadPlayerByUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataPath = 'worlds/game_data/' + user.currentWorld + '/players/' + user.uid;
                const data =  await FirebaseHelper.getData(dataPath);
                this.updatePlayerCookie(user.currentWorld, data);
                resolve(data);
            } catch(e) {
                console.log('loadPlayerByUser', e)
                reject(e);
            }            
        });
    }


    

}