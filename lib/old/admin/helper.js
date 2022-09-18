import Router from 'next/router';

export default class AdminHelper {
    static isAdmin(user) {
        if (user) { 
            if (typeof user.admin !== 'undefined' && user.admin) return true; 
        }
        return false;
    }

     static adminGuard(props, res) {
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

}