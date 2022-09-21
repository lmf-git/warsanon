import Helper from '../src/user/userHelper';


export default class NextUtil {    
    

    // Solves the problem of rendering server side and client-side
    static getFieldFromInitialDataOrCookie(props, field) {
        let result = null;

        // Get from cookies that are set only on client-side 
        if (typeof window !== 'undefined') {
            // FIXME: Only works for user cookies, no other cookies.
            result = Helper.getUserFromCookie();


        // Otherwise attempt to get from server data.
        } else {
            if (props && typeof props[field] !== undefined) {
                result = props[field];
            }
        }

        return result;
    }
    
}