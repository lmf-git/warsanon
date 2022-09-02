import config from "./config";

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
    const { squares_on_screen } = config.viewport;

    console.log('wheel');
    // if (event.deltaY > 0) {
    //     const diff = {
    //         'x' : event.clientX / canvas.width * squares_on_screen,
    //         'y' : event.clientY / canvas.height * squares_on_screen
    //     };

    //     config.viewport.squares_on_screen++;
    // } else {
    //     if (squares_on_screen != 1) {
    //         const diff = {
    //             'x' : event.clientX / canvas.width * squares_on_screen,
    //             'y' : event.clientY / canvas.height * squares_on_screen
    //         };

    //         config.viewport.squares_on_screen--;
    //     }
    // }
    event.preventDefault();
};

export function mousedown(event) {
    console.log("down");
    console.log("x: " + event.clientX);
    config.viewport.clicked = true;
    event.preventDefault();
};

export function mouseup(event) {
    console.log("release");
    config.viewport.clicked = false;
    event.preventDefault();
};

export function mousemove(event) {
    // const { canvas } = window.MAP;
    const { squares_on_screen, clicked } = config.viewport;
    if (clicked) {
        // console.log("x: " + event.movementX + "\ny: " + event.movementY);
        // config.viewport.position.x += event.movementX / canvas.width * squares_on_screen;
        // config.viewport.position.y += event.movementY / canvas.height * squares_on_screen;
        // event.preventDefault();
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