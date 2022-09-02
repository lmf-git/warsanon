export function controlsListen() {
    const { canvas } = window.MAP;
    canvas.addEventListener('wheel', wheel);
    canvas.addEventListener('mousedown', mousedown);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('mousemove', mousemove);
}

export function controlsUnlisten() {
    const { canvas } = window.MAP;
    canvas.removeEventListener('wheel', wheel);
    canvas.removeEventListener('mousedown', mousedown);
    canvas.removeEventListener('mouseup', mouseup);
    canvas.removeEventListener('mousemove', mousemove);
}

export function wheel(event) {
    const { canvas } = window.MAP;
    const { squares_on_screen } = window.MAP.viewport;

    console.log('wheel');
    if (event.deltaY > 0) {
        const diff = {
            'x' : event.clientX / canvas.width * squares_on_screen,
            'y' : event.clientY / canvas.height * squares_on_screen
        };

        window.MAP.viewport.squares_on_screen++;
    } else {
        if (squares_on_screen != 1) {
            const diff = {
                'x' : event.clientX / canvas.width * squares_on_screen,
                'y' : event.clientY / canvas.height * squares_on_screen
            };

            window.MAP.viewport.squares_on_screen--;
        }
    }
    event.preventDefault();
};

export function mousedown(event) {
    console.log("down");
    console.log("x: " + event.clientX);
    window.MAP.viewport.clicked = true;
    event.preventDefault();
};

export function mouseup(event) {
    console.log("release");
    window.MAP.viewport.clicked = false;
    event.preventDefault();
};

export function mousemove(event) {
    const { canvas } = window.MAP;
    const { squares_on_screen } = window.MAP.viewport;

    if (window.MAP.viewport.clicked) {
        console.log("x: " + event.movementX + "\ny: " + event.movementY);
        window.MAP.viewport.position.x += event.movementX / canvas.width * squares_on_screen;
        window.MAP.viewport.position.y += event.movementY / canvas.height * squares_on_screen;
        event.preventDefault();
    }
}

export function resize() {
    const { canvas } = window.MAP;
    const map = document.querySelector('#map');
    canvas.width = map.offsetWidth;
    canvas.height = map.offsetHeight;
};

export function setup() {
    // Set initial dimensions (full screen).
    resize();

    controlsListen();
    window.addEventListener('resize', resize);
}