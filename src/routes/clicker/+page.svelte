<script>
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

</script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
    />
    <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" href="css/clicker.css">
    <script src="js/clicker.js"></script>
</head>
<body>
    <div class="clickButton"> 
        <button type="button" class="btn btn-success m-3" onclick="increaseStimClicks()">Click me!</button>
        <p class="counter">Stimulation Clicks: <span id="stimClicksCount">0</span></p>
        <div class="rewardContainer">
            <img id="rewardImage" src="img\dvd-logo-png.png" class="hidden" width="80" height="80" onclick="buyDvD()" title="You need 50 clicks to buy this! Every bounce add one click!">
            <img id="rewardImage2" src="img\klover.png" class="hidden" width="80" height="80" onclick="buyLuckyClick()" title="You need 100 clicks to buy this! 1 in 10 chance to get 10 clicks!">
            <img id="rewardImage3" src="img\addOne.png" class="hidden" width="80" height="80" onclick="buyAddClick()" title="You need 150 clicks to buy this! Add 1 click per button-click!">
        </div>
    </div>


        <img id="dvdLogo" src="img\dvd-logo-png.png" alt="DVD Logo">
        <img id="klover" src="img\klover.png" alt="Klover">
        <img id="addOne" src="img\addOne.png" alt="Add one">

</body>

<style>
    
body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    transition: background-color 1s ease-in-out;
}

.clickButton {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rewardContainer {
    display: flex;
    flex-direction: row; 
    justify-content: center;
    gap: 10px; 
    margin-top: 10px;
}

.hidden {
    display: none;
}

#dvdLogo {
    position: absolute;
    width: 200px;
    height: 200px;
    display: no;
    display: none;
}

#klover {
    position: absolute;
    width: 200px;
    height: 200px;
    display: no;
    display: none;
}

#addOne {
    position: absolute;
    width: 200px;
    height: 200px;
    display: no;
    display: none;
}
</style>