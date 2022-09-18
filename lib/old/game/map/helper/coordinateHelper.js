import MapData from '../mapData';
import jsCookie from 'js-cookie';
import _ from 'underscore';
import PlayerData from '../../player/playerData';

export default class CoordinateHelper {

    static str2Array(coordString) {
        return coordString.split('|');
    }

    static str2Obj(coordString) {
        const coordArray = this.str2Array(coordString);
        return {
            X: parseInt(coordArray[0]),
            Y: parseInt(coordArray[1])
        }
    }

    static _key(x, y) {
        return x + '|' + y;
    }

    static _currentCoordCookieKey() {
        return MapData.world.config.name + '_coordinate';
    }

    static _currentZoomCookieKey() {
        return MapData.world.config.name + '_coordinate';
    }

    static getCurrentCoordCookie() {
        return jsCookie.getJSON(this._currentCoordCookieKey());
    }

    static setCurrentCoordCookie() {
        jsCookie.set(this._currentCoordCookieKey(), {
            X: MapData.currentTile.x,
            Y: MapData.currentTile.y
        });
    }

    static getCurrentZoomCookie() {
        return jsCookie.getJSON(this._currentZoomCookieKey());
    }

    static setCurrentZoomCookie() {
        jsCookie.set(this._currentZoomCookieKey(), 100);
    }

    static getInitialCoords() {
        let initialCoords = { X: 500, Y: 500 };

        const previous = this.getCurrentCoordCookie();
        if (previous) initialCoords = previous;

        const player = PlayerData.getPlayerCookie(MapData.world.config.name);
        if (player.coords) initialCoords = { X: player.coords.x, Y: player.coords.y };

        return initialCoords;
    }

    
    // FIXME: Refactor into structure code.
    static _structureLabel(structureData) { 
        if (!_.isEmpty(structureData)) { 
            const structure = structureData[Object.keys(structureData)[0]];
            return structure.name
        } 

        return '-';
    }



}