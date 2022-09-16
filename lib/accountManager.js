export default class AccountManager {
    static set(account) {
        localStorage.setItem('account', account);
    }

    static get() {
        return localStorage.getItem('account');
    }
}