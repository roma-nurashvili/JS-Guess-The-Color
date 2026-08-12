let mainBtn = document.getElementById("mainBtn");
let modeBtn = document.getElementById("modeBtn");
let resetBtn = document.getElementById("resetBtn")
let colorBox = document.getElementById("colorBox");
let colorCode = document.getElementById("colorCode");
let pointCount = document.getElementById("pointCount")

let colors = [];
let tries = 0;
pointCount.innerHTML = sessionStorage.getItem("points") || 0

function startGame() {
  modeBtn.style.display = "flex";
  mainBtn.style.display = "none";
  resetBtn.style.display = "none"
  colorCode.innerHTML = ""
  colorBox.innerHTML = ""
}

function randomizer(num) {
  colors = [];
  colorBox.innerHTML = "";
  modeBtn.style.display = "none";
  resetBtn.style.display = "block"
  colorCode.style.animation = "gradient 2s linear infinite";

  if(num == 3) {
    tries = 2;
  } else {
    tries = 3;
  }

  for(let i = 1; i <= num; i++) {
    let R = Math.round(Math.random() * 256);
    let G = Math.round(Math.random() * 256);
    let B = Math.round(Math.random() * 256);

    let randomColor = `rgb(${R}, ${G}, ${B})`;
    colors.push(randomColor);
  }

  for(let i = 0; i < colors.length; i++) {
    colorBox.innerHTML += `<div onclick="select(this)" class="colors" style="background-color: ${colors[i]};"></div>`;
  }

  let colorIndex = Math.floor(Math.random() * colors.length);
  colorCode.innerText = colors[colorIndex];
}

function select(div) {
  let clickedColor = div.style.backgroundColor;

  if (clickedColor == colorCode.innerText) {
    for(let i = 0; i < colorBox.children.length; i++) {
      colorBox.children[i].style.backgroundColor = clickedColor;
      colorBox.children[i].style.animation = "winAnimation 1.5s linear 1 forwards"
    }
    colorCode.innerText = "Congratulations!";
    colorCode.style.color = clickedColor;
    colorCode.style.animation = "none";
    pointCount.innerHTML++
    sessionStorage.setItem("points", pointCount.innerHTML)
  } else {
    tries--;
    div.style.backgroundColor = "grey";
    div.style.animation = "none"

    if(tries <= 0) {
      for (let i = 0; i < colorBox.children.length; i++) {
        colorBox.children[i].style.backgroundColor = "black";
        colorBox.children[i].style.animation = "none"
      }
      colorCode.innerText = "You Lose :(";
      colorCode.style.animation = "none";
      colorCode.style.color = "red"
    }
  }
}