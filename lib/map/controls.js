import map from "./map";

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
    const { position, scale } = map.viewport;

    // console.log('wheel');
    const mapElement = getMapContElem();
    if (event.deltaY > 0) {
        const newPosition = {
            'x' : position.x + 0.1 * (event.clientX / mapElement.offsetWidth - 0.5) * mapElement.offsetWidth / scale,
            'y' : position.y + 0.1 * (event.clientY / mapElement.offsetHeight - 0.5) * mapElement.offsetHeight / scale
        };
        map.viewport.setPosition({...newPosition});
        map.viewport.scale *= 0.9;
    
    } else {
        const newPosition = {
            'x' : position.x - 0.1 * (event.clientX / mapElement.offsetWidth - 0.5) * mapElement.offsetWidth / scale,
            'y' : position.y - 0.1 * (event.clientY / mapElement.offsetHeight - 0.5) * mapElement.offsetHeight / scale
        };
        map.viewport.setPosition({...newPosition});
        map.viewport.scale *= 1.1;
    }

    // if (event.deltaY < 0) {
    //     console.log(width);
    //     if (map.viewport.scale > 1) {
    //         map.viewport.scale *= 1.1;
    //     }
    // } else {
    //     map.viewport.scale *= 0.9;
// 
    // }
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
        const table = getMapContElem()
        newPosition.x += event.movementX / map.viewport.scale;
        newPosition.y += event.movementY / map.viewport.scale;

        map.viewport.moved = true;
        map.viewport.setPosition({...newPosition});
    }
}



export function setup() {
    controlsListen();
}