import MapConfig from 'lib/map/map';
import { Noise } from 'noisejs';
import MathGeometry from './geometry/mathGeometry';

export default class NoiseHandler {

    static PALETTE = { 
        OCEAN: '0x434278',
        BEACH: '0xCFBA8A',
        SCORCHED: '0x555555',
        BARE: '0x888888',
        TUNDRA: '0xbbbbaa',
        SNOW: '0xffffff',
        TEMPERATE_DESERT: '0xC6CF9B',
        SHRUBLAND: '0x889977',
        TAIGA: '0x99aa77',
        TEMPERATE_DECIDUOUS_FOREST: '0x679459',
        TEMPERATE_RAIN_FOREST: '0x347553',
        SUBTROPICAL_DESERT: '0xd2b98b',
        GRASSLAND: '0x88aa55',
        TROPICAL_SEASONAL_FOREST: '0x559944',
        TROPICAL_RAIN_FOREST: '0x448855'
    };


    static initialise() {
        MapConfig.heightNoise = new Noise(MapConfig.seed - 10);
        MapConfig.moistureNoise = new Noise(MapConfig.seed + 10);
    }

    static calcTileMoisture(x, y) {
        const noise = MapConfig.moistureNoise.perlin2(x / 10, y / 10);
        const noiseInt = Math.abs(noise);
        return noiseInt;
    }

    static calcTileHeight(x, y) {
        const noise = MapConfig.heightNoise.perlin2(x / 10, y / 10);
        const noiseInt = Math.abs(noise);
        return noiseInt;
    }

    static calculateTileNoiseType(x, y) {
        const height = this.calcTileHeight(x, y);
        const moisture = this.calcTileMoisture(x, y);
        const centerOffset = MathGeometry.pythagoreanDistance(x, y, 500, 500);
        const equatorOffset = 500 - y;
        const biome = this.calculateBiome(height, moisture, centerOffset, equatorOffset);
        return biome;
    }

    static calculateBiome(elevation, moisture, centerDist, equatorDist) {
        // TODO: Need to implement poles / equator.
        // TODO: Need to push edges of the map to create outer ocean.

        if (elevation < 0.1) return 'OCEAN';
        if (elevation < 0.12) return 'BEACH';
        
        if (elevation > 0.8) {
            if (moisture < 0.1) return 'SCORCHED';
            if (moisture < 0.2) return 'BARE';
            if (moisture < 0.5) return 'TUNDRA';
            return 'SNOW';
        }
        
        if (elevation > 0.6) {
            if (moisture < 0.33) return 'TEMPERATE_DESERT';
            if (moisture < 0.66) return 'SHRUBLAND';
            return 'TAIGA';
        }
        
        if (elevation > 0.3) {
            if (moisture < 0.16) return 'TEMPERATE_DESERT';
            if (moisture < 0.50) return 'GRASSLAND';
            if (moisture < 0.83) return 'TEMPERATE_DECIDUOUS_FOREST';
            return 'TEMPERATE_RAIN_FOREST';
        }
        
        if (moisture < 0.16) return 'SUBTROPICAL_DESERT';
        if (moisture < 0.33) return 'GRASSLAND';
        if (moisture < 0.66) return 'TROPICAL_SEASONAL_FOREST';
        return 'TROPICAL_RAIN_FOREST';
    }

}