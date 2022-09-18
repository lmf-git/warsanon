import Router from 'next/router';
import jsCookie from 'js-cookie';
import cookieUtil from '../../utils/cookie';
import FirebaseHelper from '../auth/firebaseHelper';


export default class UserHelper {

    static getJoinedWorldsFromUser(user) {
        let joined = {};
        if (user && typeof user.worlds !== 'undefined') {
            joined = user.worlds;
        }
        return joined;
    }

    static async getByUid(uid) {
        let dbRef = FirebaseHelper.getRef().database();
        let snapshot = await dbRef.ref('/users/' + uid).once('value');
        return snapshot.val();
    }

    static async getByUsername(username) {
        let dbRef = FirebaseHelper.getRef().database();
        let snapshot = await dbRef.ref().child("users").orderByChild("username").equalTo(username).once('value');
        return snapshot.val();
    }

    static createUser(user) {
        let currentUser = FirebaseHelper.getRef().auth().currentUser;
        user.provider = 'testing';
        return FirebaseHelper.getRef().database().ref('users/' + currentUser.uid).set(user);
    }

    static clearUserCookies() {
        jsCookie.remove('token');
        jsCookie.remove('user');
    }

    static joinWorldCookie(world) {
        let user = this.getUserFromCookie();

        typeof user.worlds === 'undefined' ? user.worlds = {} : null;

        user.worlds[world] = true;
        this.setUserCookie(user);
    }

    static updateCookie(field, value) {
        let user = this.getUserFromCookie();
        user[field] = value;
        this.setUserCookie(user);                                               
    }

    static setCookieCurrentWorld(worldKey) {
        let user = this.getUserFromCookie();
        user.currentWorld = worldKey;
        this.setUserCookie(user);
    }

    static logOut() {
        return FirebaseHelper.getRef().auth().signOut().then(() => {
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

    static setUserCookie(user) {
        user.uid = FirebaseHelper.getUid();
        jsCookie.set('user', user)
    }

    static setAuthTokenCookie(token) {
        jsCookie.set('token', token);
    }

    static getUserFromCookie() {
        return jsCookie.getJSON('user'); 
    }

    static routeGuard() {
        if (this.shouldProtectRoute()) {
            if (typeof window !== 'undefined') {
                Router.push('/account/login');
            }
        }
    }

    static completionGuard(props, res) {
        const user = this.getFromPropsOrCookie(props);
        let hasUsername = false;

        if (user && typeof user.username !== 'undefined') {
            hasUsername = true;
        }

        if (!hasUsername) {
            if (res) {
                res.writeHead(302, { Location: '/account/complete' });
                res.end()
                res.finished = true

            } else {
                Router.push('/account/complete');
            }
        }   
    }

    static getFromPropsOrCookie(props) {
        const isClient = typeof window !== 'undefined';
        const isPropsDefined = props && typeof props.user !== undefined;

        if (isClient) return this.getUserFromCookie();
        
        if (isPropsDefined && !isClient) return props.user;
    }

    static isoGetUser(req) {
        let user = null;
        if (typeof window === 'undefined') {
            user = this.getUserFromRequest(req);
        } else {
            user = this.getUserFromCookie();
        }
        return user;
    }

    static isoGetToken(req) {
        let token = null;
        if (typeof window === 'undefined') {
            const cookies = cookieUtil.parse(req.headers.cookie);
            token = cookies.token;
        } else {
            token = jsCookie.getJSON('token'); 
        }
        return token;
    }

    static getUserFromRequest(request) {
        let user = null;

        if (typeof window === 'undefined') {
            const cookie = cookieUtil.parse(request.headers.cookie);
            if (cookie && typeof cookie.user !== 'undefined') user = JSON.parse(cookie.user);
        } else {
            this.refreshAuth();
        }

        return user;
    }

    static async refreshAuth() {
        // Force token refresh.
        if (typeof window !== 'undefined') {
            const currentUser = FirebaseHelper.getRef().auth().currentUser;
            if (currentUser) {
                const token = await currentUser.getIdToken();
                jsCookie.set('token', token);
            }
        }
    }

    static adornInitialProps(req, props) {
        const user = this.getUserFromRequest(req);
        if (user) {
          props.user = user;
        }
        return props;
    }

}