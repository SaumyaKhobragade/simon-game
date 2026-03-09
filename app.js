let gameSeq = [];
let userSeq = [];
let previousScores = [];

let started = false;
let level = 0;

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 500);
}

function resetGame() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

function levelUp() {
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    const colors = ["red", "green", "yellow", "blue"];
    const randomColor = colors[Math.floor(Math.random() * 4)];
    gameSeq.push(randomColor);
    const btn = document.getElementById(randomColor);
    gameFlash(btn);
}

function buttonPress(event) {
    let userChosenColor = event.target.id;
    userSeq.push(userChosenColor);
    userFlash(event.target);
    checkAnswer();
}

function checkAnswer() {
    let currentIndex = userSeq.length - 1;
    if (userSeq[currentIndex] !== gameSeq[currentIndex]) {
        document.getElementById("level-title").textContent = "Game Over! Your final score was " + (level - 1) + ". Press any key to restart.";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 500);
        previousScores.push(level - 1);
        updateScoreList();
        resetGame();
        document.getElementById("highest-score").textContent = "Highest Score: " + highestScore();
    } else if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
        userSeq = [];
    }
}

let buttons = document.querySelectorAll(".btn");
buttons.forEach(function (btn) {
    btn.addEventListener("click", buttonPress);
});

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;

        levelUp();
    }
});

let scoreList = document.getElementById("score-list");
function updateScoreList() {
    scoreList.innerHTML = "";
    previousScores.forEach(function (score, index) {
        let li = document.createElement("li");
        li.textContent = "Game " + (index + 1) + ": " + score;
        li.style.fontSize = "24px";
        li.style.marginBottom = "5px";
        li.style.textAlign = "center";
        scoreList.appendChild(li);
    });
}

function highestScore() {
    if (previousScores.length === 0) {
        return 0;
    }
    return Math.max(...previousScores);
}
