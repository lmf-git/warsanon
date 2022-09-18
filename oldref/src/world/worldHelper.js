import 'isomorphic-fetch';
import Router from 'next/router';
import FirebaseHelper from '../auth/firebaseHelper';
import UserHelper from '../user/userHelper';
import DataHelper from '../../utils/dataHelper';
import PlayerData from '../game/player/playerData';

export default class WorldHelper {

    static async create() {
        const worldsResponse = await fetch('https://test-852ee.firebaseio.com/worlds.json');
        const worldsData = await worldsResponse.json();
        let worldsDataArray = DataHelper.jsonToArrayWithKey(worldsData);
        return worldsDataArray;
    }

    static async setCurrentWorld(worldName) {
        return new Promise(async (resolve, reject) => {
            try {
                let updates = {};
                updates['/users/' + FirebaseHelper.getUid() + '/currentWorld'] = worldName;
                let result = await FirebaseHelper.getRef().database().ref().update(updates);
                UserHelper.setCookieCurrentWorld(worldName);
                resolve(result);

            } catch(e) {
                console.log('Join world error', e);
                reject(e);
            }
        });
    }

    static join(worldName) {
        // FIXME: Refactor to cloudfunction.
        return new Promise((resolve, reject) => {
            try {
                const uid = FirebaseHelper.getUid();
                let updates = {};
                updates['/users/' + uid + '/worlds/' + worldName] = true;

                // Get username from user.
                const user = UserHelper.getUserFromCookie();

                const player = {
                    spawn: false,
                    premium: true,
                    score: 0,
                    deaths: 0,
                    coords: false,
                    name: user.username
                };
                updates['/worlds/game_data/' + worldName + '/players/configs/' + uid] = player;
                
                DataHelper.updateMany(updates).then(data => {
                    UserHelper.joinWorldCookie(worldName);
                    PlayerData.setPlayerCookie(player, worldName);
                    resolve();
                });
    
            } catch(e) {
                console.log('Join world error', e);
                reject(e);
            }
        });
    }


    static playWorld(worldName) {
        this.setCurrentWorld(worldName).then(() => {
            const user = UserHelper.getUserFromCookie();
            PlayerData.loadPlayerByUser(user).then(player => {
                PlayerData.setPlayerCookie(player, worldName);
                Router.push({ pathname: '/game/map' })
            })
        });
    };

    static navigateToStatistics(worldName) {
        Router.push({
          pathname: '/statistics',
          query: { world: worldName }
        });
    };

    static shouldGuardWorld(user, query) {
        if ((typeof user.currentWorld === 'undefined') 
            && (typeof query.world === 'undefined')) {
            return true;
        } else {
            return false;
        }
    }

}