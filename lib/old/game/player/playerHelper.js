import 'isomorphic-fetch';
import DataHelper from '../../../utils/dataHelper';
import { Promise } from 'es6-promise';
import FirebaseHelper from '../../auth/firebaseHelper';
import PlayerData from './playerData';
import ChunkGeometry from '../map/geometry/chunkGeometry';

export default class PlayerHelper {

    static async create() {
    }

    static async spawn(worldName, spawn) {
        return new Promise(async (resolve, reject) => {
            try {
                const uid = FirebaseHelper.getUid();
                const coords = {
                    x: spawn.coords.x,
                    y: spawn.coords.y,
                };

                const player = PlayerData.getPlayerCookie(worldName);
                player.spawn = spawn;
                player.coords = coords;

                const playerUnit = {
                    type: 'character',
                    quantity: 1,
                    id: uid
                }

                const iniitialUnits = {
                    character: playerUnit
                }

                // FIXME: Refactor spawns into spawns/configs & spawns/data
                // Remove citizens from spawn data, unnecessary for player data duplication.
                const spawnMeta = { 
                    name: spawn.name,
                    _key: spawn._key,
                    structureId: spawn.structureId,
                    coords: spawn.coords
                };

                const chunk = ChunkGeometry.getCoordinateChunk(coords.x, coords.y);
                const gameDataPath = `/worlds/game_data/${worldName}`;
                const playerConfigPath = `${gameDataPath}/players/configs/${uid}/`;
                const chunkPlayerPath = `${gameDataPath}/chunks/${chunk.x}|${chunk.y}/players/${uid}`;
                const spawnPath = `${gameDataPath}/spawns/${spawn._key}/citizens/${uid}`;
                const updateData = { 
                    // Update player data.
                    [playerConfigPath + 'spawn']: spawnMeta, 
                    [playerConfigPath + 'coords']: coords,
                    // Add player to chunk.
                    [chunkPlayerPath]: player,
                    // Add player as citizen of spawn
                    [spawnPath]: true,
                    // Add player as unit so can be used and die.
                    [`${gameDataPath}/coordinates/${coords.x}|${coords.y}/${uid}/units/`]: iniitialUnits,
                    [`${gameDataPath}/players/data/${uid}/units/${coords.x}|${coords.y}/`]: iniitialUnits
                };

                DataHelper.updateMany(updateData).then(() => {
                    PlayerData.updatePlayerCookie(worldName, player);
                    resolve();
                });
    
            } catch(e) {
                console.log('Spawn error', e);
                reject(e);
            }
        });
    }

}