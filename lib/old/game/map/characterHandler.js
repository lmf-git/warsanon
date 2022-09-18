import MapData from './mapData';
import FirebaseHelper from '../../auth/firebaseHelper';
import UserHelper from '../../user/userHelper';
import MapLocationHandler from './tileMarkings/MapLocationHandler';
import RegionEntities from './data/regionEntities';


export default class CharacterHandler {

    static ref = undefined;

    static init() {
        const world = MapData.world.config.name;
        const user = UserHelper.getUserFromCookie();
        const path = `worlds/game_data/${world}/players/configs/${user.uid}`;
        this.ref = FirebaseHelper._db().ref(path);

        this.ref.on('child_added', (snapshot) => {
            const key = snapshot.key;
            const value = snapshot.val();

            if (key === 'coords') {
                console.log('add initial location marking');
            }

            if (key === 'activity') {
                if (value === 'mobilising') {
                    console.log('activity key added');    
                    const markings = MapData.currentLocationWrapper.children;
                    if (typeof markings[0] !== 'undefined') markings[0].destroy();
                }
            }
        });

        this.ref.on('child_changed', (snapshot) => {
            const key = snapshot.key;

            console.log('CHILD_CHANGED_' + key);
            // console.log(snapshot.val());

            if (key === 'activity') {
                // console.log('activity changed');
                // console.log(snapshot.val());
                // const markings = MapData.currentLocationWrapper.children;
                // if (typeof markings[0] !== 'undefined') markings[0].destroy();
                // MapData.world.player
            }

            // Check if coords changed.
            if (key === 'coords') {
                const markings = MapData.currentLocationWrapper.children;
                if (typeof markings[0] !== 'undefined') markings[0].destroy();
                
                MapData.world.player.coords = snapshot.val();
                MapLocationHandler.add(null, MapData.world.player, null);
            }
        });
    }

    // FIXME: This should be called when unmounting map/any page that mounts with it.
    static end() {

    }

}