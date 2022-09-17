import { child, get, getDatabase, ref } from 'firebase/database';

export default class AccountManager {
    static set(account) {
        localStorage.setItem('account', account);
    }

    static get() {
        return localStorage.getItem('account');
    }

    static initialise(auth, setAccount) {
        const load = async () => {
            console.log('Loading', auth)
            const dbRef = ref(getDatabase());
            const accountSnapshot = await get(child(dbRef, `accounts/${auth.uid}`));
    
            // Default account data state.
            const accountData = accountSnapshot.val() ? accountSnapshot.val() : { worlds: {} };
            setAccount(accountData);
        }

        if (auth)
            load();
    };

}