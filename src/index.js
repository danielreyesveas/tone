// document.querySelector("#play").onclick = playScale;
// document.querySelector("#seq").onclick = seq;
// document.querySelector("#oct").onclick = oct;

// let playing = false;

// function playStop() {
// 	if (playing) {
// 		Tone.Transport.stop();
// 		playing = false;
// 	} else {
// 		Tone.Transport.start();
// 		playing = true;
// 	}
// }

// function playScale() {
// 	const synth = new Tone.Synth();
// 	synth.oscillator.type = "sine";
// 	const gain = new Tone.Gain(0.5);
// 	synth.toMaster();
// 	synth.connect(gain);

// 	//synth.triggerAttackRelease("C4", "8n");
// 	const notes = ["C4", "E4", "G4", "C5", "E5", "G5"];

// 	let index = 0;

// 	Tone.Transport.scheduleRepeat((time) => {
// 		repeat(time);
// 	}, "8n");

// 	Tone.Transport.bpm.value = 120;

// 	function repeat(time) {
// 		let note = notes[index % notes.length];
// 		console.log(note);
// 		synth.triggerAttackRelease(note, "8n", time);
// 		index++;
// 	}

// 	playStop();

// 	setTimeout(() => {
// 		Tone.Transport.stop();
// 	}, 5000);

// 	console.log(Tone.Transport.bpm.value);
// }

// function seq() {
// 	const synths = [new Tone.Synth(), new Tone.Synth(), new Tone.Synth()];

// 	synths[0].oscillator.type = "sine";
// 	synths[1].oscillator.type = "sine";
// 	synths[2].oscillator.type = "sine";

// 	const gain = new Tone.Gain(0.6);
// 	gain.toMaster();

// 	synths.forEach((synth) => synth.connect(gain));

// 	const notes = ["G5", "E4", "C3"];

// 	const rows = document.getElementsByClassName("row");
// 	let index = 0;
// 	Tone.Transport.scheduleRepeat(repeat, "16n");
// 	playStop();

// 	function repeat(time) {
// 		const step = index % 16;
// 		for (let i = 0; i < rows.length; i++) {
// 			const note = notes[i];
// 			const synth = synths[i];
// 			const row = rows[i];

// 			const input = row.querySelector(`input:nth-child(${step + 1})`);

// 			if (input.checked) {
// 				synth.triggerAttackRelease(note, "8n", time);
// 			}
// 		}
// 		index++;
// 	}
// }

// function oct() {
// 	console.log(123);
// 	const inputs = document.querySelectorAll("input");
// 	let chordIdx = 0;
// 	Array.from(inputs).forEach((input) => {
// 		input.addEventListener("change", () => {
// 			if (input.checked) handleChord(input.value);
// 		});
// 	});

// 	const chords = [
// 		"A0 C1 E1",
// 		"F0 A0 C1",
// 		"G0 B0 D1",
// 		"D0 F0 A0",
// 		"E0 G0 B0",
// 	].map(formatChords);

// 	const synth = new Tone.Synth();
// 	synth.oscillator.type = "sine";
// 	let step = 0;

// 	function handleChord(valueString) {
// 		chordIdx = parseInt(valueString) - 1;
// 		console.log(step);
// 		console.log(chordIdx);
// 	}

// 	const gain = new Tone.Gain(0.5);
// 	gain.toMaster();
// 	synth.connect(gain);

// 	Tone.Transport.scheduleRepeat(onRepeat, "16n");
// 	playStop();
// 	Tone.Transport.bpm.value = 150;

// 	function onRepeat(time) {
// 		let chord = chords[chordIdx];
// 		let note = chord[step % chord.length];
// 		synth.triggerAttackRelease(note, "16n", time);
// 		step++;
// 	}

// 	function formatChords(chordString) {
// 		let chord = chordString.split(" ");
// 		let arr = [];
// 		for (let i = 0; i < 2; i++) {
// 			for (let j = 0; j < chord.length; j++) {
// 				let noteOct = chord[j].split("");
// 				let note = noteOct[0];
// 				let oct = noteOct[1] === "0" ? i + 4 : i + 5;
// 				note += oct;

// 				arr.push(note);
// 			}
// 		}

// 		return arr;
// 	}
// }

// const play = document.getElementById("play");
// const osc1_play = document.getElementById("osc-1-play");
// const osc2_play = document.getElementById("osc-2-play");

// function intToFreq(int) {
// 	return Math.pow(2, int / 12) * baseFreq;
// }

// let isPlaying = false;
// let attack = [0.2, 0.05];
// let release = [2.6, 1.9];

// let scaleAug = [3, 0];
// let scaleMajor = [4, 0];
// let scaleMajAug = [4, 0];
// let scaleMinor = [3, 0];
// let scaleArabic = [4, 0];
// let scaleArabic2 = [4, 0];
// let scaleGuXian = [3, 0];
// let scaleAkebono = [3, 0];
// let scales = [scaleArabic, scaleAkebono];
// let selectedScale = 1;

// let baseFreq = 349.23; //F4
// let osc = [];
// let osc2 = [];
// let env = [];
// let env2 = [];
// let limiter;
// let masterLevel;
// let masterDelay;
// let volume = -10;
// let tremolo = 2;
// let delay = 0.1;

// play.addEventListener("click", () => {
// 	limiter = new Tone.Limiter(-10);
// 	limiter.toDestination();

// 	const gain = new Tone.Gain(0.5);
// 	gain.toMaster();
// 	synth.connect(gain);

// 	masterDelay = new Tone.PingPongDelay(0.25);
// 	masterDelay.setWet(delay);
// 	masterDelay.connect(limiter);

// 	masterLFO = new Tone.LFO(5.5, -tremolo, tremolo);
// 	masterLFO.start();

// 	for (i = 0; i < 2; i++) {
// 		osc[i] = new Tone.Oscillator(intToFreq(scales[selectedScale][i]));
// 		osc2[i] = new Tone.Oscillator(intToFreq(scales[selectedScale][i] + 12));
// 		env[i] = new Tone.Envelope(attack[i], 0.01, 0.5, release[i]);
// 		env2[i] = new Tone.Envelope(attack[i], 0.01, 0.5, release[i]);
// 		//pan[i] = new Tone.PanVol(0.275 + (i*0.05) ,volume );

// 		masterLFO.connect(osc[i].detune);
// 		masterLFO.connect(osc2[i].detune);

// 		env[i].connect(osc[i].output.gain);
// 		env2[i].connect(osc2[i].output.gain);
// 		osc[i].connect(masterDelay);
// 		osc2[i].connect(masterDelay);
// 		//pan[i].connect(masterDelay);
// 		osc[i].start();
// 		osc2[i].start();
// 		console.log("play");
// 	}
// 	isPlaying = true;
// });

document.getElementById("test").style.display = "none";
document.getElementById("tone").style.display = "none";
document.getElementById("metro").style.display = "none";

let steps = [0, 0.001, 0.005, 0.01, 0.05, 0.1, 0.125, 0.25, 0.5, 0.75];
const synthSelect = document.getElementById("synth-type");
const oscillatorSelect = document.getElementById("oscillator-type");
const oscillatorPartialsSelect = document.getElementById("oscillator-partials");
const toggle = document.getElementById("toggle");
const envelopeAttack = document.getElementById("envelope-attack");
const envelopeDecay = document.getElementById("envelope-decay");
const envelopeSustain = document.getElementById("envelope-sustain");
const envelopeRelease = document.getElementById("envelope-release");
const gain = document.getElementById("gain");

envelopeAttack.addEventListener("input", () => {
	let value = steps[parseInt(envelopeAttack.value)];
	update({ attack: value });
});

envelopeDecay.addEventListener("input", () => {
	let value = steps[parseInt(envelopeDecay.value)];
	update({ decay: value });
});

envelopeSustain.addEventListener("input", () => {
	let value = steps[parseInt(envelopeSustain.value)];
	update({ sustain: value });
});

envelopeRelease.addEventListener("input", () => {
	let value = steps[parseInt(envelopeRelease.value)];
	update({ release: value });
});

class Instrument {
	constructor() {
		this.synth = null;
		this.gain = new Tone.Gain(0.2);
		this.gain.toMaster();
		this.tick = 0;
		this.initializeTransport();
	}

	toggle() {
		this.playing = !this.playing;
		if (this.playing) {
			Tone.Transport.start();
			toggle.textContent = "Pause";
		} else {
			Tone.Transport.stop();
			toggle.textContent = "Play";
		}
	}

	initializeTransport() {
		const notes = "CDEFGAB".split("").map((n) => `${n}4`);

		Tone.Transport.scheduleRepeat((time) => {
			const note = notes[(this.tick * 2) % notes.length];
			if (this.synth) this.synth.triggerAttackRelease(note, "8n", time);
			this.tick++;
		}, "4n");
	}

	play() {
		this.synth.triggerAttackRelease("C4", "16n");
	}

	get defaultSettings() {
		return {
			Synth: {
				oscillator: { type: "triangle" },
				envelope: {
					attack: 0.005,
					decay: 0.1,
					sustain: 0.3,
					release: 1,
				},
			},
			AMSynth: {
				harmonicity: 3,
				detune: 0,
				oscillator: {
					type: "sine",
				},
				envelope: {
					attack: 0.01,
					decay: 0.01,
					sustain: 1,
					release: 0.5,
				},
				modulation: {
					type: "square",
				},
				modulationEnvelope: {
					attack: 0.5,
					decay: 0,
					sustain: 1,
					release: 0.5,
				},
			},
			FMSynth: {
				harmonicity: 3,
				modulationIndex: 10,
				detune: 0,
				oscillator: {
					type: "sine",
				},
				envelope: {
					attack: 0.01,
					decay: 0.01,
					sustain: 1,
					release: 0.5,
				},
				modulation: {
					type: "square",
				},
				modulationEnvelope: {
					attack: 0.5,
					decay: 0,
					sustain: 1,
					release: 0.5,
				},
			},
		};
	}

	update(synthType, oscillatorType, oscillatorPartials, envelope, gain) {
		this.updateSynthType(synthType, envelope);
		this.updateOscillatorType(oscillatorType, oscillatorPartials);
		this.updateGain(gain);
	}

	updateSynthType(synthType, envelope) {
		if (this.synth) {
			this.synth.disconnect(this.gain);
			this.synth.dispose();
		}
		const settings = this.defaultSettings[synthType];
		settings.envelope = Object.assign(settings.envelope, envelope);
		this.synth = new Tone[synthType](settings);
		this.synth.connect(this.gain);
	}

	updateOscillatorType(oscillatorType, oscillatorPartials = null) {
		const partials = oscillatorPartials ? oscillatorPartials : "";
		this.synth.oscillator.type = `${oscillatorType}${partials}`;
	}

	updateGain(gain) {
		if (this.gain.gain.value !== gain) this.gain.gain.value = gain;
	}
}

const inst = new Instrument();
update();

toggle.addEventListener("click", (e) => {
	inst.toggle();
});

synthSelect.addEventListener("change", update);

oscillatorSelect.addEventListener("change", update);

oscillatorPartialsSelect.addEventListener("change", update);

gain.addEventListener("change", update);

function update(envelope = {}) {
	inst.update(
		synthSelect.value,
		oscillatorSelect.value,
		oscillatorPartialsSelect.value,
		envelope,
		gain.value
	);
}

// (function () {
// 	Tone.Transport.bpm.value = 100;
// 	Tone.Transport.timeSignature = "4/4";
// 	const synth = new Tone.Synth();
// 	const gain = new Tone.Gain(0.2);
// 	gain.toMaster();
// 	synth.connect(gain);
// 	Tone.Transport.scheduleRepeat(function (time) {
// 		synth.triggerAttackRelease("C6", "64n");
// 		console.log(
// 			"Quarter Notes:",
// 			Tone.Transport.getTicksAtTime(time) / 192
// 		);
// 	}, "4n");

// 	var isPlaying = false;

// 	document
// 		.getElementById("togglePlay")
// 		.addEventListener("click", function () {
// 			if (isPlaying) {
// 				Tone.Transport.pause();
// 			} else {
// 				Tone.Transport.start();
// 			}

// 			isPlaying = !isPlaying;
// 		});
// })();
