//---------------------------WEBAUDIO-----------------
const soundCtx = new AudioContext();
//-----------------------------function expression----------------
const dBtoA = function (linAmp) {
  return Math.pow(10, linAmp / 20);
};
let carrierOsc = null;
let modulationOsc = null;
let modGain = soundCtx.createGain();
modGain.gain.value = 100;
let masterGain = soundCtx.createGain();
masterGain.gain.value = dBtoA(-12);
masterGain.connect(soundCtx.destination);
//---------------------------updates---------------------
const updateMasterGain = function () {
  let amp = dBtoA(parseFloat(masterGainFader.value));
  masterGain.gain.exponentialRampToValueAtTime(
    amp,
    soundCtx.currentTime + 0.01
  );
  faderLabel.innerText = `${masterGainFader.value} dBFS`;
};
const updateCarrierFreq = function () {
  if (carrierOsc)
    carrierOsc.frequency.setValueAtTime(
      parseFloat(carFreqFader.value),
      soundCtx.currentTime
    );

  carFreqLabel.innerText = `${carFreqFader.value} Hz`;
};
const updateModFreq = function () {
  if (modulationOsc)
    modulationOsc.frequency.setValueAtTime(
      parseFloat(modFreqFader.value),
      soundCtx.currentTime
    );

  modFreqLabel.innerText = `${modFreqFader.value} Hz`;
};
const updateModDepth = function () {
  modGain.gain.setValueAtTime(
    parseFloat(modDepthFader.value),
    soundCtx.currentTime
  );

  modDepthLabel.innerText = `${modDepthFader.value} Hz`;
};
//------------------------carrier osc-----------------------------
const playAudioC = function () {
  if (carrierOsc) return;

  carrierOsc = soundCtx.createOscillator();
  carrierOsc.type = "sine";
  carrierOsc.frequency.setValueAtTime(440, soundCtx.currentTime); // ;
  if (modulationOsc) {
    modulationOsc.connect(modGain);
    modGain.connect(carrierOsc.frequency);
  }
  carrierOsc.connect(masterGain);

  carrierOsc.start();
};
const stopAudioC = function () {
  if (carrierOsc) {
    carrierOsc.stop();
    carrierOsc.disconnect();
    carrierOsc = null;
  }
};
//-----------------------modulation osc-------------------------
const playAudioM = function () {
  if (modulationOsc) return;

  modulationOsc = soundCtx.createOscillator();
  modulationOsc.type = "sine";
  modulationOsc.frequency.setValueAtTime(100, soundCtx.currentTime);
  modulationOsc.connect(modGain);

  if (carrierOsc) {
    modGain.connect(carrierOsc.frequency);
  }
  modulationOsc.start();
};
const stopAudioM = function () {
  if (modulationOsc) {
    modulationOsc.stop();
    modulationOsc.disconnect();
    modulationOsc = null;
  }
};
//-------------------------ID-------------------------------------

let startButtonC = document.getElementById("startCar");
let startButtonM = document.getElementById("startMod");
let stopButtonC = document.getElementById("stopCar");
let stopButtonM = document.getElementById("stopMod");
let masterGainFader = document.getElementById("masterFader");
let faderLabel = document.getElementById("outputLabel");

let carFreqFader = document.getElementById("carFreq");
let carFreqLabel = document.getElementById("carFreqLabel");
let modFreqFader = document.getElementById("modFreq");
let modFreqLabel = document.getElementById("modFreqLabel");
let modDepthFader = document.getElementById("modDepth");
let modDepthLabel = document.getElementById("modDepthLabel");
//--------------------event listeners-----------------------------
startButtonC.addEventListener("click", playAudioC);
startButtonM.addEventListener("click", playAudioM);
stopButtonC.addEventListener("click", stopAudioC);
stopButtonM.addEventListener("click", stopAudioM);
masterGainFader.addEventListener("input", updateMasterGain);
carFreqFader.addEventListener("input", updateCarrierFreq);
modFreqFader.addEventListener("input", updateModFreq);
modDepthFader.addEventListener("input", updateModDepth);
//--------------------------------------------------
updateMasterGain();
updateCarrierFreq();
updateModFreq();
updateModDepth();
