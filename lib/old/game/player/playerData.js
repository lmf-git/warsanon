import jsCookie from 'js-cookie';
import _ from 'underscore';
import { Promise } from 'es6-promise';
import FirebaseHelper from '../../auth/firebaseHelper';
import UserHelper from '../../user/userHelper';


export default class PlayerData {
    
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

    static loadGroups(coord = '') {
        return new Promise(async (resolve, reject) => {
            try {
                const user = UserHelper.getUserFromCookie();
                const dataPath = `worlds/game_data/${user.currentWorld}/players/data/${user.uid}/unitGroups/${coord}`;
                const data =  await FirebaseHelper.getData(dataPath);
                resolve(data);

            } catch(e) {
                console.log('loadUnits', e)
                reject(e);
            }            
        });
    }

    static loadUnits(coord = '') {
        return new Promise(async (resolve, reject) => {
            try {
                const user = UserHelper.getUserFromCookie();
                const dataPath = `worlds/game_data/${user.currentWorld}/players/data/${user.uid}/units/${coord}`;
                const data =  await FirebaseHelper.getData(dataPath);
                resolve(data);

            } catch(e) {
                console.log('loadUnits', e)
                reject(e);
            }            
        });
    }

    static loadOwnPath(path) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = UserHelper.getUserFromCookie();
                const dataPath = 'worlds/game_data/' + user.currentWorld + '/players/' + user.uid + '/' + path;
                const data =  await FirebaseHelper.getData(dataPath);
                // this.updatePlayerCookie(user.currentWorld, data);
                resolve(data);

            } catch(e) {
                console.log('loadOwnPath', e)
                reject(e);
            }            
        });
    }

    static loadPlayerByUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const dataPath = 'worlds/game_data/' + user.currentWorld + '/players/configs/' + user.uid;
                const data =  await FirebaseHelper.getData(dataPath);
                this.updatePlayerCookie(user.currentWorld, data);
                resolve(data);
            } catch(e) {
                console.log('loadPlayerByUser', e)
                reject(e);
            }            
        });
    }

    static getWorldPath(user) {
        return `worlds/game_data/${user.currentWorld}/`;
    }

    static getWorldConfigPath(user) {
        return `worlds/configs/${user.currentWorld}/`;
    }

    static getEntityPath(user, type, location = null) {
        const world = this.getWorldPath(user);
        const base = `${world}/players/data/${user.uid}`;
        let path = `${base}/${type}`;
        if (location) {
            path = `${path}/${location}`;
        }
        return path;
    }


    

}