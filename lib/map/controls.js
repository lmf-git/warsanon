import map from "./mapConfig";

export function getMapContElem() {
    return document.querySelector('#map-container');
}

export function controlsListen() {
    const map = getMapContElem();
    map.addEventListener('wheel', wheel);
    map.addEventListener('mousedown', mousedown);
    map.addEventListener('mouseup', mouseup);
    map.addEventListener('mousemove', mousemove);
}

export function controlsUnlisten() {
    const map = getMapContElem();
    map.removeEventListener('wheel', wheel);
    map.removeEventListener('mousedown', mousedown);
    map.removeEventListener('mouseup', mouseup);
    map.removeEventListener('mousemove', mousemove);
}

export function wheel(event) {
    const { position, width, setWidth } = map.viewport;

    // console.log('wheel');
    let newSize = width;
    const mapElement = getMapContElem();
    if (event.deltaY < 0) {
        console.log(width);
        if (width > 1) {
            const newPosition = {
            'x' : position.x - 0.1 * (event.clientX / mapElement.offsetWidth - 0.5) * width,
            'y' : position.y - 0.1 * (event.clientY / mapElement.offsetHeight - 0.5) * width
            };
            map.viewport.setPosition({...newPosition});
            newSize *= 0.9;
        }
    } else {
        const newPosition = {
            'x' : position.x + 0.1 * (event.clientX / mapElement.offsetWidth - 0.5) * width,
            'y' : position.y + 0.1 * (event.clientY / mapElement.offsetHeight - 0.5) * width
        };
        map.viewport.setPosition({...newPosition});
        newSize *= 1.1;

    }
    map.viewport.width = newSize;

    event.preventDefault();
};

export function mousedown(event) {
    event.preventDefault();
    map.viewport.clicked = true;
};

export function mouseup(event) {
    console.log("release");
    map.viewport.clicked = false;
    map.viewport.moved = false;
    event.preventDefault();
};

export function mousemove(event) {
    event.preventDefault();

    const { width, clicked } = map.viewport;
    if (clicked) {
        let newPosition = map.viewport.position;

        // console.log("x: " + event.movementX + "\ny: " + event.movementY);
        const table = getMapContElem();
        newPosition.x += (event.movementX / table.offsetWidth * width);
        newPosition.y += (event.movementY / table.offsetHeight * width);

        map.viewport.moved = true;
        map.viewport.setPosition({...newPosition});
    }
}
