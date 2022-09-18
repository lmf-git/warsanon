import Router from 'next/router';
import firebaseRef from '../../utils/firebase';
import jsCookie from 'js-cookie';
import UserHelper from '../user/userHelper';
import { Promise } from 'es6-promise';
import 'isomorphic-fetch';

export default class FirebaseHelper {

    static getRef() {
        return firebaseRef();
    }

    static OnFirebaseClientsideLoad(firebaseAuthIdentity) {
        if (firebaseAuthIdentity) {
            if (typeof firebaseRef().auth === 'function') {
                const uid = firebaseRef().auth().currentUser.uid;

                // Update user cookie client side.
                UserHelper.getByUid(uid).then(function(user) {        
                    if (user) {
                        UserHelper.setUserCookie(user);
                    }
                });
            }
        }
    }

    static logOut() {
        return this.getRef().auth().signOut().then(() => {
            this.clearUserCookies();
            Router.push('/account/farewell');

        }, function(error) {
            console.error('Sign Out Error', error);
        });
    }

    static shouldProtectRoute(req, props) {
        const token = jsCookie.get('token');
        return !token;
    }

    static setAuthTokenCookie(token) {
        jsCookie.set('token', token);
    }

    static getUid() {
        return this.getRef().auth().currentUser.uid
    }

    static _db() {
        return FirebaseHelper.getRef().database();
    }

    static _funcPath = 'https://us-central1-test-852ee.cloudfunctions.net';

    static _restPath = 'https://test-852ee.firebaseio.com/';

    static getData(field) {
        return new Promise((resolve, reject) => {
            try {
                FirebaseHelper.getRef().database().ref(field).once('value', (snapshot) => {
                    resolve(snapshot.val());
                });
            } catch(e) {
                console.log('Firebase get error', e);
                reject(e);
            }
        });
    }

    static async authFetch(token, path) {
        const response = await fetch(this._restPath + path + '/?auth=' + token);
        const jsonData = await response.json();
        return jsonData;
    }

}