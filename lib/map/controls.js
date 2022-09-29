import map from "./mapConfig";

export function getMapContElem() {
    return document.querySelector('#map-container');
}

export function controlsListen() {
    const map = getMapContElem();
    // map.addEventListener('wheel', wheel);
    map.addEventListener('mousedown', mousedown);
    map.addEventListener('mouseup', mouseup);
    map.addEventListener('mousemove', mousemove);
}

export function controlsUnlisten() {
    const map = getMapContElem();
    // map.removeEventListener('wheel', wheel);
    map.removeEventListener('mousedown', mousedown);
    map.removeEventListener('mouseup', mouseup);
    map.removeEventListener('mousemove', mousemove);
}


// TODO: Write a simple drag handler for new map appraoch.
// https://stackoverflow.com/questions/6042202/how-to-distinguish-mouse-click-and-drag






















export function wheel(event) {
    const { position, scale } = map.viewport;
    const width = mapElement.offsetWidth;
    const height = mapElement.offsetHeight;


    // The solution to fix this may be to access 100% as a value in the thing.

    // console.log('wheel');
    const mapElement = getMapContElem();
    if (event.deltaY > 0) {
        const newPosition = {
            x: (position.x + 0.1 * (event.clientX / width - 0.5) * width / scale).toFixed(3),
            y: (position.y + 0.1 * (event.clientY / height - 0.5) * height / scale).toFixed(3)
        };
        map.viewport.setPosition({...newPosition});
        map.viewport.scale *= 0.9;
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

// TODO: Call populateScreenChunks when dragging.
export function mousemove(event) {
    event.preventDefault();

    console.log(event.target);

    const { width, clicked } = map.viewport;
    if (clicked) {
        let newPosition = map.viewport.position;

        // Round
        newPosition.x = Math.round((newPosition.x + event.movementX / map.viewport.scale + Number.EPSILON) * 100) / 100
        newPosition.y = Math.round((newPosition.y + event.movementY / map.viewport.scale + Number.EPSILON) * 100) / 100

        map.viewport.moved = true;
        map.viewport.setPosition({...newPosition});
    }
}
