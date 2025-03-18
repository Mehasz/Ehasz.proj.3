//Gain slider control
const updateMasterGain = function () {
  let amp = dBtoA(fader.value);
  masterGain.gain.exponentialRampToValueAtTime(amp, audCtx.currentTime + 0.01);
  faderLabel.innerText = `${fader.value} dBFS`;
};

//webaudio
const audCtx = new AudioContext();

//carrier osc
let sineOsc = audCtx.createOscillator();
sineOsc.type = "sine";

//gain
let masterGain = audCtx.createGain();
masterGain.gain.value = 0.125;

//enables audio
const enableAudio = function () {
  audCtx.resume();
  sineOsc.start();
};
