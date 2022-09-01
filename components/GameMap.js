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

    // Draw image
    const image = document.createElement('img');
    image.src = "/logo.png"

    image.addEventListener('load', (e) => {
      context.drawImage(image, 20, 20, 20, 20);
      context.drawImage(image, 30, 30, 20, 20);
      context.drawImage(image, 40, 40, 20, 20);
      context.drawImage(image, 50, 50, 20, 20);
      context.drawImage(image, 60, 60, 20, 20);
      context.drawImage(image, 70, 70, 20, 20);
      context.drawImage(image, 80, 80, 20, 20);
    });

    // Load chunk information.
    // TODO: ...
      // Draw a coordinate system/set of tiles

    window.addEventListener('resize', resize);
  });

  return (
    <>
      <canvas />
    </>
  )
}
