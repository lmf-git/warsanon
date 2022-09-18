import jsHttpCookie from 'cookie';

export default class CookieUtil {

    static parse(cookie) {
        let result = null;

        try {
            if (typeof cookie === 'string') {
                const parsed = jsHttpCookie.parse(cookie);
                result = parsed;
            }
        } catch(e) {
            console.log('failed to parse', e);
        }

        return result;
    }

}
  