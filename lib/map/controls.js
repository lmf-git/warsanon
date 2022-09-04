import map from "./map";

const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
};

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
    const { horizontalTileNum, setHorizontalTileNum } = map.viewport;

    // console.log('wheel');
    let newSize = horizontalTileNum;
    if (event.deltaY > 0) {
        // const diff = {
        //     'x' : event.clientX / canvas.width * horizontalTileNum,
        //     'y' : event.clientY / canvas.height * horizontalTileNum
        // };

        newSize = map.viewport.horizontalTileNum + 1;
    } else {
        if (horizontalTileNum != 1) {
            // const diff = {
            //     'x' : event.clientX / canvas.width * horizontalTileNum,
            //     'y' : event.clientY / canvas.height * horizontalTileNum
            // };

            newSize = map.viewport.horizontalTileNum - 1;
        }
    }
    setHorizontalTileNum(newSize);

    event.preventDefault();
};

export function mousedown(event) {
    const { position } = map.viewport;
    console.log("down");
    console.log("x: " + event.clientX);
    map.viewport.clicked = true;
    event.preventDefault();

   position.x += 1;
   position.y += 1;

    map.viewport.setPosition({...position});
    console.log(map.viewport.setPosition);
    console.log(map.viewport.position);
};

export function mouseup(event) {
    console.log("release");
    map.viewport.clicked = false;
    event.preventDefault();
};

export function mousemove(event) {
    // const { canvas } = window.MAP;
    const { horizontalTileNum, clicked } = map.viewport;
    if (clicked) {
        // console.log("x: " + event.movementX + "\ny: " + event.movementY);
        // map.viewport.position.x += event.movementX / canvas.width * horizontalTileNum;
        // map.viewport.position.y += event.movementY / canvas.height * horizontalTileNum;
        // event.preventDefault();

        map.viewport.position.x += 1;
        map.viewport.position.y += 1;
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