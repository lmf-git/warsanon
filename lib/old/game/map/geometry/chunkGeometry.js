import MapData from '../mapData';

export default class ChunkGeometry {

    static getCoordinateChunk(x, y) {
        const chunkSize = MapData.chunkSize;
        return {
            x: Math.floor(x / chunkSize),
            y: Math.floor(y / chunkSize)
        }
    }

}