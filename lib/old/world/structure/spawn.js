import Structure from "./structure";
import WorldDataHelper from "../worldDataHelper";
import DataHelper from "../../../utils/dataHelper";

export default class Spawn {

    static getSpawns() {}

    static respawnPlayer(player, spawn) {}

    static async create(world, spawnData) {
        const spawnStructureData = {
            type: 'spawn',
            coords: spawnData.coords,
            name: spawnData.name
        }
        const structureId = await Structure.create(world, spawnStructureData);

        const spawnsPath = WorldDataHelper.getWorldGameDataRefKey(world) + '/spawns';

        spawnData.structureId = structureId;
        const spawnId = await DataHelper.push(spawnsPath, spawnData)
        
        return { spawnId, structureId };
    }

    static async update(world, spawnData, spawnId) {
        const spawnsPath = WorldDataHelper.getWorldGameDataRefKey(world) + '/spawns/' + spawnId;
        const spawn = await DataHelper.update(spawnsPath, spawnData);

        const spawnStructureData = {
            type: 'spawn',
            coords: spawnData.coords,
            name: spawnData.name
        }

        const structure = await Structure.update(world, spawnStructureData, spawnData.structureId);

        return { spawn, structure };
    }

}