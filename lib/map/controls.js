import map from "./map";

export function controlsListen() {
    const map = document.querySelector('#map');
    map.addEventListener('wheel', wheel);
    map.addEventListener('mousedown', mousedown);
    map.addEventListener('mouseup', mouseup);
    map.addEventListener('mousemove', mousemove);
}

export function controlsUnlisten() {
    const map = document.querySelector('#map');
    map.removeEventListener('wheel', wheel);
    map.removeEventListener('mousedown', mousedown);
    map.removeEventListener('mouseup', mouseup);
    map.removeEventListener('mousemove', mousemove);
}

export function wheel(event) {
    const { width, setwidth } = map.viewport;

    // console.log('wheel');
    let newSize = width;
    if (event.deltaY > 0) {
        // const diff = {
        //     'x' : event.clientX / canvas.width * width,
        //     'y' : event.clientY / canvas.height * width
        // };

        newSize = map.viewport.width + 1;
    } else {
        if (width != 1) {
            // const diff = {
            //     'x' : event.clientX / canvas.width * width,
            //     'y' : event.clientY / canvas.height * width
            // };

            newSize = map.viewport.width - 1;
        }
    }
    setwidth(newSize);

    event.preventDefault();
};

export function mousedown(event) {
    event.preventDefault();
    map.viewport.clicked = true;
};

export function mouseup(event) {
    console.log("release");
    map.viewport.clicked = false;
    event.preventDefault();
};

export function mousemove(event) {
    event.preventDefault();

    const { width, clicked } = map.viewport;
    if (clicked) {
        let newPosition = map.viewport.position;

        // console.log("x: " + event.movementX + "\ny: " + event.movementY);
        const table = document.querySelector('#map');
        newPosition.x += (event.movementX / table.offsetWidth * width);
        newPosition.y += (event.movementY / table.offsetHeight * width);
        
        map.viewport.setPosition({...newPosition});
    }
}

export function resize() {
    // const { canvas } = window.MAP;
    // const map = document.querySelector('#map');
    // canvas.width = map.offsetWidth;
    // canvas.height = map.offsetHeight;
};

export function setup() {
    // Set initial dimensions (full screen).
    resize();

    controlsListen();
    window.addEventListener('resize', resize);
}