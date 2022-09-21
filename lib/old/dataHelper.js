import { Promise } from 'es6-promise';
import FirebaseHelper from '../src/auth/firebaseHelper';
import UserHelper from '../src/user/userHelper';


export default class DataHelper {

    static jsonToArrayWithKey(jsonObject) {
        let result = [];
        if (jsonObject) {
            result = Object.keys(jsonObject).map((k) => { 
                let item = jsonObject[k];
                item._key = k;
                return item;
            });
        }
        return result;
    }

    static jsonObjectToArray(jsonObject) {
        return Object.keys(jsonObject).map((k) => jsonObject[k]);
    }

    static get(refPath) {
        return new Promise((resolve, reject) => {
            try {
                FirebaseHelper.getRef().database().ref(refPath)
                    .once('value', (snapshot) => {
                        let data = null;
                        if (snapshot.val()) {
                            data = snapshot.val();
                        }
                        resolve(data);
                    });
    
            } catch(e) {
                console.log('Spawn error', e);
                reject(e);
            }
        });
    }

    static set(refPath, data) {
        return new Promise((resolve, reject) => {
            try {
                FirebaseHelper.getRef().database().ref(refPath)
                    .set(data, (err) => {
                        if (!err) {
                            resolve();
                        }
                    });
    
            } catch(e) {
                console.log('Spawn error', e);
                reject(e);
            }
        });
    }

    static delete(refPath) {
        return new Promise((resolve, reject) => {
            try {
                FirebaseHelper.getRef().database().ref(refPath)
                    .delete((err) => {
                        if (!err) {
                            resolve();
                        }
                    });
    
            } catch(e) {
                console.log('Spawn error', e);
                reject(e);
            }
        });
    }

    static push(refPath, data) {
        return new Promise((resolve, reject) => {
            try {
                const newItemRef = FirebaseHelper.getRef().database().ref(refPath)
                    .push(data, (err) => {
                        if (!err) {
                            resolve(newItemRef.key);
                        }
                    });
    
            } catch(e) {
                console.log('Spawn error', e);
                reject(e);
            }
        });
    }

    static update(refPath, data) {
        return new Promise((resolve, reject) => {
            try {
                FirebaseHelper.getRef().database().ref()
                    .update({ [refPath]: data }, (err) => {
                        if (!err) {
                            resolve();
                        }
                    });
    
            } catch(e) {
                console.log('Spawn error', e);
                reject(e);
            }
        });
    }

    static updateMany(updateObject) {
        return new Promise((resolve, reject) => {
            try {
                FirebaseHelper.getRef().database().ref()
                    .update(updateObject, (err) => {
                        if (!err) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
    
            } catch(e) {
                console.log('updateMany error', e);
                reject(e);
            }
        });
    }

    static extractData(data, keys) {
        const extracted = {};
        if (data) {                
            keys.forEach(key => {
                if (typeof data[key] !== 'undefined') {
                    extracted[key] = data[key];
                }
            });
        }
        return extracted;
    }

    static async isoFetch(req, path) {
        let data = null;

        if (typeof window === 'undefined') {     
            path = `${path}.json`;
            const token = UserHelper.isoGetToken(req);
            data = await FirebaseHelper.authFetch(token, path);

        } else {
            data =  await FirebaseHelper.getData(path);
        }

        return data;
    }

}
  