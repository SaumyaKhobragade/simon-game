let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;

        levelUp();
    }
});

function buttonFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 1000);
}

function levelUp() {
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    const colors = ["red", "green", "yellow", "blue"];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSeq.push(randomColor);
    const btn = document.getElementById(randomColor);
    buttonFlash(btn);
}
