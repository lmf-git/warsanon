import { Promise } from 'es6-promise';
import DataHelper from '../../../utils/dataHelper';
import ChunkGeometry from '../../game/map/geometry/chunkGeometry';
import WorldDataHelper from '../worldDataHelper';


export default class Structure {

    static async get(worldId, structureId) {
        // Add to config
        const structureConfig = await DataHelper.push(this._allConfigsPath(worldId), structure)

        // Add to relevant region
        const regionStructure = await this.addToRegion(worldId, structure);

        return { structureConfig, regionStructure };
    }

    static async create(worldId, structure) {
        // Add to config
        const newStructureConfigId = await DataHelper.push(this._allConfigsPath(worldId), structure)

        // Add to relevant region
        const regionStructure = await this.addToRegion(worldId, structure, newStructureConfigId);

        return newStructureConfigId;
    }

    static async delete(worldId, structureId) {
        // TODOO: Remove region entity too.
        return await DataHelper.set(this._configPath(structureId, worldId), null);
    }

    static async update(worldId, structure, structureId) {
        try {
            // Update structure region item, must go first due to previous data comparison.
            const regionUpdate = await this._updateRegionStructure(worldId, structureId, structure);

            // Update structure item
            const result = await DataHelper.update(this._configPath(structureId, worldId), structure);
            return true;

        } catch(e) {
            alert('update failed');
            console.log(e);
        }
    }


    /* REGION RELATED */

    static async removeFromRegion(worldId, chunk, structureId) {
        return await DataHelper.set(this._chunkPath(chunk, structureId, worldId), null);
    }

    static async _moveStructureRegions(from, structureId, structure, worldId) {
        // Remove from old region
        await this.removeFromRegion(worldId, from, structureId);

        // Add to new region
        return await this.addToRegion(worldId, structure, structureId);
    }

    static async _updateRegionStructure(worldId, structureId, data) {
        const structure = await DataHelper.get(this._configPath(structureId, worldId));

        const chunk = ChunkGeometry.getCoordinateChunk(structure.coords.x, structure.coords.y);
        const newChunk = ChunkGeometry.getCoordinateChunk(data.coords.x, data.coords.y);

        if (chunk.x === newChunk.x && chunk.x === newChunk.x) {
            return await DataHelper.update(this._chunkPath(chunk, structureId, worldId), data);
        } else {
            return await this._moveStructureRegions(chunk, structureId, data, worldId);
        }
    }

    // FIXME: Use set instead of push to use same structureId for region as for game_data/structure(s)
    static async addToRegion(worldId, structure, structureId) {
        const chunk = ChunkGeometry.getCoordinateChunk(structure.coords.x, structure.coords.y);
        const regionPath = this._chunkPath(chunk, structureId, worldId);
        const regionStructure = await DataHelper.set(regionPath, structure);
        return regionStructure;
    }


    /** FIREBASE DATA STRUCTURE HELPERS */
    static _chunkPath(chunk, structureId, worldId) {
        return `${this._worldPath(worldId)}chunks/${chunk.x}|${chunk.y}/structure/${structureId}`;
    }

    static _configPath(structureId, worldId) {
        return `${this._worldPath(worldId)}/structures/configs/${structureId}`;
    }

    static _worldPath(worldId) {
        return WorldDataHelper.getWorldGameDataRefKey(worldId);
    }

    static _allConfigsPath(worldId) {
        return `${this._worldPath(worldId)}/structures/configs`;
    }

}