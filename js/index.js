document.querySelector(".fade-layer").addEventListener("click", showMenu)


document.querySelector(".nav-button").addEventListener("click", showMenu)

function showMenu(){
    let menu = document.querySelector("nav.nav");
    menu.classList.toggle("show");

    let layer = document.querySelector(".fade-layer");
    layer.classList.toggle("visible")
}
