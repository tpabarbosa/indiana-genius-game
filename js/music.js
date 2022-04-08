// create web audio api context
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

const audio = {
    music: true,
    sfx: true,
    isMenu: true,
};

const btn0 = document.getElementById("btn-0");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");

const musicBtn = document.getElementById("toggle-music");
const sfxBtn = document.getElementById("toggle-sfx");
const musicOff = document.getElementById("music-off");
const sfxOff = document.getElementById("sfx-off");

musicBtn.onclick = () => {
    musicOff.classList.toggle("hidden");
    audio.music = !audio.music;
};

sfxBtn.onclick = () => {
    sfxOff.classList.toggle("hidden");
    audio.sfx = !audio.sfx;
};

const tempo = 384;

function playNote(frequency, duration, btn, cb = null) {
    // create Oscillator node

    const oscillator = audioCtx.createOscillator();
    const volume = audioCtx.createGain();
    oscillator.connect(volume);
    oscillator.type = "triangle";
    oscillator.frequency.value = frequency; // value in hertz
    volume.gain.value = 0.8;
    volume.connect(audioCtx.destination);

    if ((audio.sfx && !audio.isMenu) || (audio.isMenu && audio.music)) {
        oscillator.start();
    }
    btn.classList.add("shine");
    setTimeout(function() {
        try {
            oscillator.stop();
        } catch (e) {} finally {
            btn.classList.remove("shine");
            if (cb) {
                cb();
            }
        }
    }, duration);
}

function playMelody() {
    if (!audio.isMenu) {
        return;
    }
    if (notes.length === 0) {
        notes = [...melody];
    }
    if (notes.length > 0) {
        note = notes.shift();
        const time = note[2] * tempo;
        playNote(note[0], time, note[1], playMelody);
    }
}

function playGameOver() {
    if (!audio.music) {
        return;
    }
    if (go.length > 0) {
        note = go.shift();
        const time = note[2] * tempo;
        playNote(note[0], time, note[1], playGameOver);
    }
}

function playVictory() {
    if (!audio.music) {
        return;
    }
    if (vic.length > 0) {
        note = vic.shift();
        const time = note[2] * tempo;
        playNote(note[0], time, note[1], playVictory);
    }
}

const C = [264, btn0];
const D = [296.2, btn1];
const E = [332.6, btn2];
const F = [352.4, btn3];
const G = [395.5, btn0];
const A = [444, btn1];
const B = [498.4, btn2];
const C2 = [528, btn3];
const D2 = [592.42, btn0];
const E2 = [665.28, btn1];
const F2 = [704.88, btn2];

const melody = [
    [...E, 0.75],
    [...F, 0.25],
    //
    [...G, 1],
    [...C2, 2],
    [...D, 0.75],
    [...E, 0.25],
    //
    [...F, 3],
    [...G, 0.75],
    [...A, 0.25],
    //
    [...B, 1],
    [...F2, 2],
    [...G, 0.75],
    [...A, 0.25],
    //
    [...B, 1],
    [...C2, 1],
    [...D2, 1],
    [...E, 0.75],
    [...F, 0.25],
    //
    [...G, 1],
    [...C2, 2],
    [...D2, 0.75],
    [...E2, 0.25],
    //
    [...F2, 3],
    [...G, 0.75],
    [...G, 0.25],
    //
    [...E2, 1],
    [...D2, 0.75],
    [...G, 0.25],
    [...E2, 1],
    [...D2, 0.75],
    [...G, 0.25],
    //
    [...E2, 1],
    [...D2, 0.75],
    [...G, 0.25],
    [...F2, 1],
    [...E2, 0.75],
    [...D2, 0.25],
    //
    [...C2, 2],
];

let notes = [...melody];

const gameover = [
    [...C, 0.25],
    [...D, 0.25],
    [...E, 0.25],
    [...F, 0.25],
    [...G, 0.25],
    [...A, 0.5],
    [...F, 0.75],
    [...D, 1],
    [...E, 1.25],
];

let go = [...gameover];

const victoryTheme = [
    [...D2, 0.25],
    [...C2, 0.25],
    [...B, 0.25],
    [...A, 0.25],
    [...B, 0.25],
    [...A, 0.25],
    [...D2, 0.25],
    [...C2, 0.5],
    [...B, 0.5],
    [...A, 0.5],
    [...B, 0.75],
    [...A, 0.75],
    [...C2, 1],
    [...A, 0.5],
    [...B, 0.75],
    [...A, 0.75],
    [...C2, 1],
];

let vic = [...victoryTheme];