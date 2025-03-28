let stimClicks = 0;
let dvdBought = false;
let dvdMoving = false;
let luckyClickBought = false;
let addOneBought = false;
let numbers = [1, 10, 1, 1, 1, 1, 1, 1, 1, 1];
let numbers2 = [2, 20, 2, 2, 2, 2, 2, 2, 2, 2];
let numbers3 = [2, 20, 2, 2, 2, 2, 2, 2];

function increaseStimClicks() {
    if (!luckyClickBought && !addOneBought) {
        stimClicks++;
    } else if (!addOneBought && luckyClickBought){
        stimClicks += numbers[Math.floor(Math.random() * numbers.length)]; 
    } else {
        stimClicks += numbers2[Math.floor(Math.random() * numbers.length)]; 
    }
    
    document.getElementById("stimClicksCount").textContent = stimClicks;

    if (stimClicks >= 10 && !dvdBought) {
        document.getElementById("rewardImage").classList.remove("hidden");
    }
    if (stimClicks >= 60 && !luckyClickBought) {
        document.getElementById("rewardImage2").classList.remove("hidden");
    }
    if (stimClicks >= 110 && !addOneBought) {
        document.getElementById("rewardImage3").classList.remove("hidden");
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
        stimClicks -= 100;
        document.getElementById("stimClicksCount").textContent = stimClicks;
        document.getElementById("rewardImage2").classList.add("hidden");
        luckyClickBought = true;
    }
}

function buyAddClick() {
    if (stimClicks >= 150 && !addOneBought) {
        stimClicks -= 150;
        document.getElementById("stimClicksCount").textContent = stimClicks;
        document.getElementById("rewardImage3").classList.add("hidden");
        addOneBought = true;
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
            stimClicks++;
        }
        
        if (y <= 0 || y >= screenH) {
            dy = -dy;
            stimClicks++;
        }

        document.getElementById("stimClicksCount").textContent = stimClicks;
        dvd.style.left = x + "px";
        dvd.style.top = y + "px";

        requestAnimationFrame(moveDVD);
    }

    moveDVD();
}
