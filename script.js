
const canvas = document.querySelector('#canvas');
const resizeBtn = document.querySelector('#resizeBtn');
const changeResolutionBtn = document.querySelector('#changeResolutionBtn');

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
    console.log(pixels.length);

    for (let i = 0; i < pixels.length; i++) {
        let pixel = pixels[i];
        pixel.setAttribute('style', 'width:' + (1 + size / resolution) + 'px; height:' + (1 + size / resolution) + 'px;');
    };
};

//Event listener to implement drawing on canvas' pixels
canvas.addEventListener('mouseover', (e) => {
    if (e.target.className === 'pixel') {
        e.target.style.backgroundColor = 'orange';
    }
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

