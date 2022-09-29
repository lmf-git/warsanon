export default class MapGeometry {

    static pythagoreanDistance(x, y, cenX, cenY){
        return Math.sqrt(Math.pow(x - cenX, 2) + Math.pow(y - cenY, 2));
    }

}