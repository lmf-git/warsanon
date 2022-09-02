import { useEffect } from "react";

export default function GameMap() {

  const resize = () => {
    const { canvas } = window.MAP;
    canvas.width = document.body.offsetWidth;
    canvas.height = document.body.offsetHeight;
  };

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    // Shared object for map.
    window.MAP = {
      canvas: canvas,
      context: context,

      viewport: {
        zoom: 1,
        position: {
          x: 0,
          y: 0
        }
      }
    };

    // Loaded game chunks.
    window.CHUNKS = {};

    // Set initial dimensions (full screen).
    resize();

    // Preload critical assets/textures.
    // TODO: ...

    const image = document.createElement('img');
    image.src = "/logo.png"

    const village_sprite = document.createElement('img');
    village_sprite.src = "/map/structures/enemy_village.png";

    // Load chunk information.
    // TODO: ...
      // Draw a coordinate system/set of tiles

    //load village info 
    const villages = [{'x' : -1, 'y' : -1}, {'x' : 1, 'y' : 1}, {'x' : 2, 'y' : 2}];

    window.addEventListener('resize', resize);
    let squares_on_screen = 5;
    
    let clicked = false;
    let target = {'x' : 0, 'y' : 0};

    draw_villages();
  
    canvas.addEventListener('wheel', (event) => {
      console.log('wheel');
      if(event.deltaY > 0){
        const diff = {
          'x' : event.clientX / canvas.width * squares_on_screen,
          'y' : event.clientY / canvas.height * squares_on_screen};

        squares_on_screen++;
      } else{
        if(squares_on_screen != 1){
          const diff = {
            'x' : event.clientX / canvas.width * squares_on_screen,
            'y' : event.clientY / canvas.height * squares_on_screen};

          squares_on_screen--;
        }
      }
      event.preventDefault();
    });

    canvas.addEventListener('mousedown', (event) => {
      console.log("down");
      console.log("x: " + event.clientX);
      clicked = true;
      event.preventDefault();
    });

    canvas.addEventListener('mouseup', (event) => {
      console.log("release");
      clicked = false;
      event.preventDefault();
    });

    canvas.addEventListener('mousemove', (event) => {
      if(clicked){
        console.log("x: " + event.movementX + "\ny: " + event.movementY);
        target.x += event.movementX / canvas.width * squares_on_screen;
        target.y += event.movementY / canvas.height * squares_on_screen;
        event.preventDefault();
      }
    });

    function draw_villages(){
      context.clearRect(0,0, canvas.width, canvas.height);

      const square_width = canvas.width / squares_on_screen;
      const square_height = canvas.height / squares_on_screen;

      for(const village of villages){
        context.drawImage(village_sprite,
          (target.x + village.x) * square_width + canvas.width / 2,
          (target.y + village.y) * square_height + canvas.height / 2, 
          square_width, square_height);
      }
      requestAnimationFrame(draw_villages);
    }
  
  });

  return (
    <>
      <canvas />
    </>
  )
}
