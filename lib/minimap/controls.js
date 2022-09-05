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
    event.preventDefault();

    console.log("down");
    console.log("x: " + event.clientX);

    map.viewport.clicked = true;
    
    const newPosition = map.viewport.position
    newPosition.x += 1;
    newPosition.y += 1;

    map.viewport.setPosition({...newPosition});
};

export function mouseup(event) {
    console.log("release");
    map.viewport.clicked = false;
    event.preventDefault();
};

export function mousemove(event) {
    event.preventDefault();

    const { horizontalTileNum, clicked } = map.viewport;
    if (clicked) {
        const newPosition = map.viewport.position;

        // console.log("x: " + event.movementX + "\ny: " + event.movementY);
        const table = document.querySelector('#map');

        newPosition.x += Math.floor(event.movementX / table.offsetWidth * horizontalTileNum);
        newPosition.y += Math.floor(event.movementY / table.offsetHeight * horizontalTileNum);

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