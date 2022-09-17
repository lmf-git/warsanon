import { getAuth, onAuthStateChanged } from "firebase/auth";

export default class AuthManager {

    // Assuming from docs that calling subscription - assuming I spell it correctly
    // will end the subscription/stop listening.
    static subscribe(setAuth) {
        const listener = onAuthStateChanged(getAuth(),  auth => setAuth(auth));
        return () => listener();
    }
}