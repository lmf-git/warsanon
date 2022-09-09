export default class WorldManager {
    static set(code) {
        localStorage.setItem('currentWorld', code);
    }

    static get() {
        return localStorage.getItem('currentWorld');
    }
}