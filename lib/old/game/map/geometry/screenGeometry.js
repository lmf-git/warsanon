import MapData from '../mapData';
import MathGeometry from './mathGeometry';

export default class ScreenGeometry {

    static ScreenToGameCoords(X, Y) {
        let gameCoords = { x: undefined, y: undefined };
        const Origin = MapData.origin;

        const originCoords = { x: Origin.position.x, y: Origin.position.y };

        // Rotate screen coordinates to regular oreitnation
        const normaliseScreenPos = MathGeometry.rotatePoint(originCoords.x, originCoords.y, X, Y, 45);

        // Compare SCREEN_POS of given SCREEN_POS (X, Y) coordinates to plane origin SCREEN_POS
        // Round x & y by 100 for integer result.
        const diffX = Math.round((originCoords.x - normaliseScreenPos.x) / 100);
        const diffY =  Math.round((originCoords.y - normaliseScreenPos.y) / 100);

        // Sum differences, referencing origin coordinates.
        gameCoords.x = Origin.COORDINATES.X - diffX;
        gameCoords.y = Origin.COORDINATES.Y + diffY;

        return gameCoords;
    }

    static GameToScreenCoords(X, Y) {
        let xOffset = this.OffsetXFromOrigin(X, MapData.origin);
        let screenPosition = this.OffsetYFromXOffset(Y, xOffset, MapData.origin);
        return screenPosition;
    }
    
    static OffsetXFromOrigin(X) {
        const tileWidth = 100 * Math.sqrt(2);
        const Origin = MapData.origin;
        const originPosition = { x: Origin.position.x, y: Origin.position.y };

        let diffx = Origin.COORDINATES.X - X;
        let dx = diffx * (tileWidth / 2);
        let dy = diffx * (tileWidth / 2);

        dx = (originPosition.x - dx);
        dy = originPosition.y - dy;

        return { X: dx, Y: dy };
    }

    static OffsetYFromXOffset(Y, XOffset) {
        const tileWidth = 100 * Math.sqrt(2);
        let diffy = MapData.origin.COORDINATES.Y - Y;
        let dx = diffy * (tileWidth / 2);
        let dy = diffy * (tileWidth / 2);

        dx = XOffset.X - dx;
        dy = (XOffset.Y + dy);

        return { X: dx, Y: dy };
    }

}