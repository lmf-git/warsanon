import Config from "./config";
import { createImageElem } from "./spriteHelper";


// Note: There does not need to be a render loop for a turn based game.
// This is very inefficient but works for testing temporarily.
// Maybe we should use a load of gifs instead? Do no rendering via canvas?
export async function load_tiles(setVisibleRows) {
    const { squares_on_screen } = Config.viewport;

    // const { context, canvas } = window.MAP;
    // const village_sprite = createImageElem("/map/structures/enemy_village.png");
    // context.clearRect(0,0, canvas.width, canvas.height);

    // const square_width = canvas.width / squares_on_screen;
    // const square_height = canvas.height / squares_on_screen;

    const rows = [
        [
            { x: -1, y: -1 }, 
            { x: 1, y: 1 }, 
            { x: 2, y: 2 }
        ]
    ];

    // By rendering tiles in relation to viewport position it lets us load from any initial position.
    // for (const village of tiles){
        // context.drawImage(village_sprite,
        // (window.MAP.viewport.position.x + village.x) * square_width + canvas.width / 2,
        // (window.MAP.viewport.position.y + village.y) * square_height + canvas.height / 2, 
        // square_width, square_height);
    // }

    setVisibleRows(rows);

    // requestAnimationFrame(draw_tiles);

    return true;
}