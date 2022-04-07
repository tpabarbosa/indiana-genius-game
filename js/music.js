// create web audio api context
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

const music = {
    isPlaying: true,
};

const btn0 = document.getElementById("btn-0");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");

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
    oscillator.start();
    btn.classList.add("shine");

    setTimeout(function() {
        oscillator.stop();
        btn.classList.remove("shine");
        if (cb) {
            cb();
        }
    }, duration);
}

function playMelody() {
    if (!music.isPlaying) {
        return;
    }
    if (notes.length === 0) {
        notes = [...melody];
    }
    if (notes.length > 0) {
        // note = notes.pop();
        note = notes.shift();
        const time = note[2] * tempo;
        playNote(note[0], time, note[1], playMelody);
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