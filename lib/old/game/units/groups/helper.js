import { Promise } from 'es6-promise';
import FirebaseHelper from '../../../auth/firebaseHelper';
import axios from 'axios';

export default class UnitGroupsHelper {

    static countUnits(group) {
        const unitKeys = Object.keys(group.units);
        let total = 0;
        unitKeys.forEach(unit => {
          total = total + group.units[unit].quantity;
        });
        return total;
    }

    static async _func(config, funcSuffix) {
        try {
            const base = FirebaseHelper._funcPath; 
            const url =  base + '/' + funcSuffix;
            const data = await axios.post(url, config)
            return data;

        } catch(e) {
            console.log(e);
        }
    }

    static build(config) {
        return this._func(config, 'moveUnitGroup');
    }

    static move(config) {
        return this._func(config, 'moveUnitGroup');
    }

    static mobilise(config) {
        return this._func(config, 'mobiliseUnitGroup');
    }

    static gather(config) {
        return this._func(config, 'gatherUnitGroup');
    }

    static sizeLabel(group) {
        const count = this.countUnits(group);
        let label = 'small';
        if (count > 50) label = 'medium';
        if (count > 100) label = 'large';
        return label;
    }

}