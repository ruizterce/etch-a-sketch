
const canvas = document.querySelector('#canvas');
const resizeBtn = document.querySelector('#resizeBtn');
const changeResolutionBtn = document.querySelector('#changeResolutionBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
let rainbow = false;
let mouseClicked = false;

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


    //Adapt pixel size to canvas size via inline css
    let pixels = canvas.querySelectorAll('.pixel');

    for (let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.setAttribute('style', 'width:' + (1 + size / resolution) + 'px; height:' + (1 + size / resolution) + 'px;');
    };
};

//Function and event listeners to implement drawing on canvas' pixels

function paint(e) {
    let color;
    if (rainbow) {
        let randomColor = Math.round(0xffffff * Math.random()).toString(16);
        color = "#" + randomColor;

    } else {
        color = 'orange';
    };

    if (e.target.className === 'pixel') {
        e.target.style.backgroundColor = color;
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
    size = document.querySelector('#size').value;
    resolution = document.querySelector('#resolution').value;
    for (let i = 0; i < canvas.querySelectorAll('div').length; i++) {
        canvas.removeChild(canvas.lastChild);
    }
    createCanvas(size, resolution);
};

resizeBtn.addEventListener('click', () => {
    resizeCanvas();
});

// Reset pixels' color to default
function clearCanvas() {
    let pixels = canvas.querySelectorAll('.pixel');
    for (let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.style.backgroundColor = 'deepskyblue';
    };
};

clearBtn.addEventListener('click', () => {
    clearCanvas();
});


//Toggle rainbow mode

function toggleRainbow() {
    rainbow = !rainbow;
    console.log(rainbow);
};

rainbowBtn.addEventListener('click', () => {
    toggleRainbow();

    if (rainbow) {
        rainbowBtn.style.background = 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,252,0,1) 16%, rgba(0,255,0,1) 32%, rgba(0,255,248,1) 48%, rgba(0,0,255,1) 64%, rgba(255,0,241,1) 80%, rgba(255,0,0,1) 100%)';
    } else {
        rainbowBtn.style.background = '';
    }
});

