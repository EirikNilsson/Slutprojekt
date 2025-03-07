let stimClicks = 0;
let dvdBought = false;
let dvdMoving = false;
let luckyClickBought = false;
let numbers = [1, 10, 1, 1, 1, 1, 1, 1, 1, 1];


function increaseStimClicks() {
    if (!luckyClickBought) {
        stimClicks++;
        document.getElementById("stimClicksCount").textContent = stimClicks;

    }

    if (stimClicks >= 10 && !dvdBought) {
        document.getElementById("rewardImage").classList.remove("hidden");
    }
}

function buyDvD() {
    if (stimClicks >= 50 && !dvdBought) {
        stimClicks -= 50;
        document.getElementById("stimClicksCount").textContent = stimClicks;
        document.getElementById("rewardImage").classList.add("hidden");
        document.getElementById("dvdLogo").style.display = "block";
        dvdBought = true;
        startDVDAnimation();
    } 
}

function buyLuckyClick() {
    if (stimClicks >= 100 && !luckyClickBought) {
        stimClicks += number[Math.floor(Math.random() * number.length)]
        document.getElementById("stimClicksCount").textContent = stimClicks;
        
    }
}

function startDVDAnimation() {
    if (dvdMoving) return;
    dvdMoving = true;

    let dvd = document.getElementById("dvdLogo");
    let x = 200, y = 200;
    let dx = 4, dy = 4;
    let screenW = window.innerWidth - 200;
    let screenH = window.innerHeight - 150;

    function moveDVD() {
        x += dx;
        y += dy;

        if (x <= 0 || x >= screenW) {
            dx = -dx;
            stimClicks++;};
        if (y <= 0 || y >= screenH) {
            dy = -dy;
            stimClicks++;
        }


        dvd.style.left = x + "px";
        dvd.style.top = y + "px";

        requestAnimationFrame(moveDVD);

    }

    moveDVD();
}
document.getElementById("stimClicksCount").textContent = stimClicks;