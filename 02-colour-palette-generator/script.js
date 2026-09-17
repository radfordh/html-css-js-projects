const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", function(e) {
    if(e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexValue)
        .then(() =>showCopySucess(e.target))
        .catch(err => console.log(err))
    } else if(e.target.classList.contains("colour")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard.writeText(hexValue)
        .then(() =>showCopySucess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch(err => console.log(err))
    }
});

function showCopySucess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = "#48bb78"

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = ""
    }, 1500);
}

function generatePalette() {
    const colours = []
    for(let i=0; i<5; i++) {
        colours.push(generateRandomColour())
    }
    updatePaletteDisplay(colours);
}

function generateRandomColour() {
    const letters = "0123456789ABCDEF"
    let colour = "#"
    for(let i=0; i<6; i++) {
        colour += letters[Math.floor(Math.random()*16)];
    }
    return colour;
}


function updatePaletteDisplay(colours) {
    const colourBoxes = document.querySelectorAll(".colour-box");
    colourBoxes.forEach((box,index) => {
        const colour = colours[index];
        const colourDiv = box.querySelector(".colour");
        const hexValue = box.querySelector(".hex-value");

        colourDiv.style.backgroundColor = colour;
        hexValue.textContent = colour;
    })
}


//generates new palette when page refreshes
generatePalette();