

export function createImageElem(src) {
    const image = document.createElement('img');
    image.src = src;
    return image;
}

export function preload() {
    // Preload critical assets/textures.
    const image = createImageElem("/logo.png");
    const village_sprite = createImageElem("/map/structures/enemy_village.png");
}