const startBtn = document.getElementById("start-button");
const splashScreen = document.getElementById("splash-screen");
const main = document.getElementById("main");
const menu = document.getElementById("menu");
const gameArea = document.getElementById("game");
const gameStatus = document.getElementById("game-status");
const gameMessage = document.getElementById("status-message");
const gameScore = document.getElementById("game-score");
const normalModeBtn = document.getElementById("normal-mode");
const restartGameBtn = document.getElementById("restart-game");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");

startBtn.onclick = () => {
    splashScreen.classList.toggle("hidden");
    main.classList.toggle("hidden");
    setTimeout(() => {
        playMelody();
    }, 800);
};

normalModeBtn.onclick = () => {
    gameArea.classList.toggle("hidden-right");
    menu.classList.toggle("hidden-left");
    menu.ontransitionend = () => {
        menu.classList.add("hidden");
    };
    audio.isMenu = false;
    gameScore.innerText = `Fase ${game.score}`;
    setTimeout(gameLoop, 1500);
};

restartGameBtn.onclick = () => {
    newGame();
};

btn4.onclick = () => {
    playPlayerNote(0);
};
btn5.onclick = () => {
    playPlayerNote(1);
};
btn6.onclick = () => {
    playPlayerNote(2);
};
btn7.onclick = () => {
    playPlayerNote(3);
};

const TURN = { computer: 0, player: 1 };

const game = {
    turn: TURN.computer,
    computerSequence: [],
    playerSequence: [],
    ended: false,
    score: 0,
    frequencies: [332.6, 444, 665.28, 279.6],
    buttons: [btn4, btn5, btn6, btn7],
    playInterval: 300,
    playingNotes: [],
};

const gameLoop = () => {
    if (!game.ended) {
        game.playerSequence = [];
        game.score++;
        gameScore.innerText = `Fase ${game.score}`;
        const color = Math.floor(Math.random() * 4);
        game.computerSequence.push(color);
        game.playingNotes = [...game.computerSequence];
        playComputerSequence();
    }
};

const playComputerSequence = () => {
    if (game.playingNotes.length === 0) {
        changeToPlayerTurn();
    }
    setTimeout(() => {
        if (game.playingNotes.length > 0) {
            note = game.playingNotes.shift();
            playNote(
                game.frequencies[note],
                game.playInterval,
                game.buttons[note],
                playComputerSequence
            );
        }
    }, 600);
};

const changeToPlayerTurn = () => {
    game.turn = TURN.player;
};

const playPlayerNote = (note) => {
    if (game.turn !== TURN.player) {
        return;
    }

    game.playerSequence.push(note);
    playNote(game.frequencies[note], game.playInterval, game.buttons[note]);
    checkSequence();
};

const checkSequence = () => {
    for (let i in game.playerSequence) {
        if (game.computerSequence[i] != game.playerSequence[i]) {
            gameOver();
            break;
        }
    }
    if (game.playerSequence.length === 20 && !game.ended) {
        victory();
    }
    if (
        game.computerSequence.length === game.playerSequence.length &&
        !game.ended
    ) {
        nextTurn();
    }
};

const nextTurn = () => {
    game.turn = TURN.computer;
    setTimeout(gameLoop, 500);
};

const gameOver = () => {
    game.ended = true;
    gameMessage.innerHTML = `Você errou!! <br>Game Over`;
    gameStatus.style.backgroundImage = "url(images/804591.jpg)";
    gameStatus.style.filter = "brightness(2)";

    setTimeout(() => {
        go = [...gameover];
        audio.isMenu = true;
        playGameOver();
        gameStatus.classList.toggle("hidden");
        gameStatus.classList.toggle("opacity-hidden");
    }, 500);
};

const victory = () => {
    game.ended = true;
    gameMessage.innerHTML = `Vitória!! <br>Você acertou toda a sequência`;
    gameStatus.style.backgroundImage = "url(images/804588.png)";
    gameStatus.style.filter = "brightness(1)";
    setTimeout(() => {
        vic = [...victoryTheme];
        audio.isMenu = true;
        playVictory();
        gameStatus.classList.toggle("hidden");
        gameStatus.classList.toggle("opacity-hidden");
    }, 500);
};

const newGame = () => {
    audio.isMenu = false;
    game.turn = TURN.computer;
    game.computerSequence = [];
    game.playerSequence = [];
    game.ended = false;
    game.score = 0;
    game.playingNotes = [];
    gameStatus.classList.toggle("hidden");
    gameStatus.classList.toggle("opacity-hidden");
    gameLoop();
};