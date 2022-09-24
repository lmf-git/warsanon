

export default class MathGeometry {

    static rotatePoint(cx, cy, x, y, angle) {
        let rotatedPoint = { x: undefined, y: undefined }; 
        let radians = (Math.PI / 180) * angle;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);        
        rotatedPoint.x = (cos * (x - cx)) + (sin * (y - cy)) + cx;
        rotatedPoint.y = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return rotatedPoint;
    }

    static pythagoreanDistance(x, y, cenX, cenY){
        return Math.sqrt(Math.pow(x - cenX, 2) + Math.pow(y - cenY, 2));
    }

}