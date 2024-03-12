
const canvas = document.querySelector('#canvas');
const resizeBtn = document.querySelector('#resizeBtn');
const changeResolutionBtn = document.querySelector('#changeResolutionBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const penSizeBtn = document.querySelector('#penSizeBtn');
const paintColor = document.querySelector('#paintColor');
const paintColorBtn = document.querySelector('#paintColorBtn');
const bgColorBtn = document.querySelector('#bgColorBtn');
const eraseBtn = document.querySelector('#eraseBtn');
let resolution = 16;
let rainbow = false;
let erase = false;
let mouseClicked = false;
let penColor = 'orange';
let bgColor = '#00bfff';
let penSize = 1;

document.querySelector('#size').value = 960;
document.querySelector('#resolution').value = 16;
createCanvas(960, 16);

//Create divs in canvas area with the given resolution
function createCanvas(size, resolution) {
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
    //Adjust #canvas div element size
    canvas.setAttribute('style', 'width:' + (size) + 'px; height:' + (size) + 'px;');
    paint

    //Adapt pixel size to canvas size and apply background color
    let pixels = canvas.querySelectorAll('.pixel');

    for (let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.setAttribute('style', 'width:' + (1 + size / resolution) + 'px; height:' + (1 + size / resolution) + 'px; background-color:' + bgColor + ';');
        pixel.textContent = i; //Debug
    };
};

//Function and event listeners to implement drawing on canvas' pixels

function paint(e) {
    let color;

    if (erase) {
        color = bgColor;
    } else if (rainbow) {
        let randomColor = Math.round(0xffffff * Math.random()).toString(16);
        color = "#" + randomColor;

    } else {
        color = penColor;
    };

    if (e.target.className === 'pixel') {
        e.target.style.backgroundColor = color;

        //Look for adjacent pixels to paint
        if (penSize > 1) {
            let pixels = canvas.querySelectorAll('.pixel');
            for (let i = 0; i < pixels.length; i++) {

                //Check adjacent pixels for penSize 2
                if (parseInt(pixels[i].textContent) === parseInt(e.target.textContent) + resolution ||
                    parseInt(pixels[i].textContent) === parseInt(e.target.textContent) - resolution ||
                    parseInt(pixels[i].textContent) === parseInt(e.target.textContent) + 1 ||
                    parseInt(pixels[i].textContent) === parseInt(e.target.textContent) - 1) {
                    pixels[i].style.backgroundColor = color;
                };

                //Check adjacent pixels for penSize 3
                if (parseInt(penSize) === 3) {
                    if (parseInt(pixels[i].textContent) === parseInt(e.target.textContent) + resolution * 2 ||
                        parseInt(pixels[i].textContent) === parseInt(e.target.textContent) - resolution * 2 ||
                        parseInt(pixels[i].textContent) === parseInt(e.target.textContent) + resolution + 1 ||
                        parseInt(pixels[i].textContent) === parseInt(e.target.textContent) + resolution - 1 ||
                        parseInt(pixels[i].textContent) === parseInt(e.target.textContent) - resolution + 1 ||
                        parseInt(pixels[i].textContent) === parseInt(e.target.textContent) - resolution - 1 ||
                        parseInt(pixels[i].textContent) === parseInt(e.target.textContent) + 2 ||
                        parseInt(pixels[i].textContent) === parseInt(e.target.textContent) - 2) {
                        pixels[i].style.backgroundColor = color;
                    };

                }

            };
        };

    };
};

document.addEventListener('mousedown', (e) => {
    mouseClicked = true;
    paint(e);
});

document.addEventListener('mouseup', () => {
    mouseClicked = false;
});


canvas.addEventListener('mouseover', (e) => {

    if (mouseClicked) {
        paint(e);
    };
});

//Delete all elements in canvas and create again with the desired size and resolution specified in text input elements.

function resizeCanvas() {

    if (parseInt(document.querySelector('#resolution').value) > 64) {
        alert('Max resolution is 64');
        document.querySelector('#resolution').value = resolution;
        document.querySelector('#size').value = size;
    } else {
        size = document.querySelector('#size').value;
        resolution = parseInt(document.querySelector('#resolution').value);
        for (let i = 0; i < canvas.querySelectorAll('div').length; i++) {
            canvas.removeChild(canvas.lastChild);
        };
        createCanvas(size, resolution);
    };

};

resizeBtn.addEventListener('click', () => {
    resizeCanvas();
});

// Reset pixels' color to default
function clearCanvas() {
    let pixels = canvas.querySelectorAll('.pixel');
    for (let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.style.backgroundColor = bgColor;
    };
};

clearBtn.addEventListener('click', () => {
    clearCanvas();
});


//Toggle rainbow mode

function toggleRainbow() {
    rainbow = !rainbow;
};

rainbowBtn.addEventListener('click', () => {
    toggleRainbow();

    if (rainbow) {
        rainbowBtn.style.background = 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,252,0,1) 16%, rgba(0,255,0,1) 32%, rgba(0,255,248,1) 48%, rgba(0,0,255,1) 64%, rgba(255,0,241,1) 80%, rgba(255,0,0,1) 100%)';
        paintColor.style.background = 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,252,0,1) 16%, rgba(0,255,0,1) 32%, rgba(0,255,248,1) 48%, rgba(0,0,255,1) 64%, rgba(255,0,241,1) 80%, rgba(255,0,0,1) 100%)';
    } else {
        rainbowBtn.style.background = '';
        paintColor.style.background = '';
    }
});

//Toggle erase mode

function toggleErase() {
    erase = !erase;
};

eraseBtn.addEventListener('click', () => {
    toggleErase();

    if (erase) {
        eraseBtn.style.background = 'white';
        eraseBtn.style.color = 'deepskyblue';

    } else {
        eraseBtn.style.background = '';
        eraseBtn.style.color = '';
    }
});

//Change pen size

penSizeBtn.addEventListener('input', (e) => {
    penSize = e.target.value;
})

//Change paint color
paintColorBtn.addEventListener('change', (e) => {
    penColor = e.target.value;
}, false);

//Change background color, only if the pixel is not painted
bgColorBtn.addEventListener('change', (e) => {
    let oldBgColor = bgColor;
    bgColor = e.target.value;

    //Functions to transform rgb to hex
    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    //Iterate through unpainted pixels
    let pixels = canvas.querySelectorAll('.pixel');
    for (let i = 0; i < pixels.length; i++) {

        let pixel = pixels[i];

        //Check that pixel backgroundColor is in rgb(r, g, b) format and separate components
        if (pixel.style.backgroundColor.charAt(0) === "r") {
            let r = parseInt(pixel.style.backgroundColor.split(",")[0].replace("rgb(", ""));
            let g = parseInt(pixel.style.backgroundColor.split(",")[1].replace(" ", ""));
            let b = parseInt(pixel.style.backgroundColor.split(",")[2].replace(" ", "").replace(")", ""));

            //Convert pixel color to Hex, compare to old color. If it's equal, replace with new color
            if (rgbToHex(r, g, b) === oldBgColor) {
                pixel.style.backgroundColor = bgColor;
            };
        };
    };

}, false);


