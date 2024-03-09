let resolution = 64;
const canvas = document.querySelector('#canvas');

createCanvas();

//Create divs in canvas area with the given resolution
function createCanvas() {
    for (let i = 0; i < resolution; i++) {
        const newCol = document.createElement('div');
        newCol.className = 'col';


        for (let j = 0; j < resolution; j++) {
            const newPixel = document.createElement('div');
            newPixel.className = 'pixel';
            newCol.appendChild(newPixel);
        };
        canvas.appendChild(newCol);
    };

    //Adapt pixel size to canvas size via inline css
    let pixels = canvas.querySelectorAll('.pixel');
    console.log(pixels.length);

    for (let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.setAttribute('style', 'width:' + (1 + 960 / resolution) + 'px; height:' + 960 / resolution + 'px;');
    };
};

//Event listener to implement drawing on canvas' pixels
canvas.addEventListener('mouseover', (e) => {
    if (e.target.className === 'pixel') {
        e.target.style.backgroundColor = 'orange';
    }
});
