/**
 * Created by luketwyman on 03/11/2014.
 */

// INIT //
var canvas;
var cxa;
var scene = 0;
var TWEEN;

// METRICS //
var halfX = 0;
var halfY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;
var dx = halfX;
var dy = halfY;
var headerType = 0;
var midType = 0;
var dataType = 0;
var bodyType = 0;
var subType = 0;
var cy = 0;
var ttx = 0;
var pageDest = 0;
var device = "desktop";

var pages = [];

// INTERACTION //
var mouseX = 0;
var mouseY = 0;
var touchTakeover = false;
var touch;
var mouseIsDown = false;
var isPlaying = false;
var playOver = false;
var infoOver = false;
var tempoOver = false;
var delayOver = false;
var tremoloOver = false;
var bassOver = false;
var optionsOver = false;
var optionsCloseOver = false;
var infoCloseOver = false;
var scaleOver = [];
var originalOver = false;
var whitevinylOver = false;

var tempoSelected = false;
var delaySelected = false;
var tremoloSelected = false;
var bassSelected = false;

var tempoX = 42;
var tremoloX = 12;
var delayX = 20;
var bassX = 0;

// COLOURS //
var bgCols = [new Colour(84, 202, 231, 1), new Colour(25, 31, 35, 1)];
var darkCols = [
	new Colour(26, 24, 30, 1),
	new Colour(25, 31, 35, 1),
	new Colour(40, 30, 42, 1),
	new Colour(30, 30, 34, 1),
	new Colour(25, 30, 37, 1),
];
var mainCols = [
	new Colour(255, 255, 255, 1),
	new Colour(232, 52, 77, 1),
	new Colour(255, 202, 196, 1),
	new Colour(54, 216, 172, 1),
	new Colour(84, 231, 196, 1),
	new Colour(255, 81, 105, 1),
];
var masterCol = new Colour(0, 0, 0, 0);
var beginAlpha = 100;

// SOUND SETTINGS //
var tempoMin = 0.3;
var tempoMax = 9;
var delayMin = 0;
var delayMax = 0.45;
var tremoloMin = 0;
var tremoloMax = 15;
var bassMin = -60;
var bassMax = -28;

var tempo = (tempoMax - tempoMin) * 0.6;
var volume = -10;
var tremolo = 2;
var delay = 0.1;
var bass = -60;

// PLANETS //
var planetName = [
	"Mercury",
	"Venus",
	"Earth",
	"Mars",
	"Ceres",
	"Jupiter",
	"Saturn",
	"Uranus",
	"Neptune",
	"Pluto",
];
var planetYear = [
	87.96, 224.7, 365.25, 686.97, 1680.5, 4331.57, 10759.22, 30799.09, 60190,
	90613.3,
];
var planetAttack = [0.2, 0.05, 0.05, 0.05, 0.05, 0.06, 0.06, 0.08, 0.1, 0.2];
var planetRelease = [2.6, 1.9, 2, 2.1, 2.1, 2.2, 2.8, 3.5, 4, 6];
var planetFlash = [0, 0, 0, 0, 0, 2, 5, 15, 30, 50];
var planets = [];

// SCALES //
var scaleAug = [3, 0, 3, 7, 9, 10, 12, 14, 15, 19];
var scaleMajor = [4, 0, 4, 7, 9, 11, 12, 14, 16, 19];
var scaleMajAug = [4, 0, 4, 6, 7, 9, 12, 14, 18, 19];
var scaleMinor = [3, 0, 3, 7, 8, 10, 12, 15, 17, 19];
var scaleArabic = [4, 0, 4, 7, 8, 10, 12, 16, 17, 19];
var scaleArabic2 = [4, 0, 4, 5, 7, 8, 10, 12, 13, 16];
var scaleGuXian = [3, 0, 3, 5, 7, 10, 12, 15, 17, 19];
var scaleAkebono = [3, 0, 3, 7, 8, 12, 14, 15, 19, 20];
var scales = [
	scaleArabic,
	scaleAkebono,
	scaleMajor,
	scaleAug,
	scaleMajAug,
	scaleMinor,
	scaleArabic2,
	scaleGuXian,
];
var selectedScale = 2;

// AUDIO COMPONENTS //
var drone;
var droneEnv;
var osc = [];
var osc2 = [];
var env = [];
var env2 = [];
var pan = [];
var baseFreq = 349.23; //F4
var masterLFO;
var masterDelay;
var bassDrone;
var limiter;
var masterLevel;

// PARTICLES //
var particles = [];
var pool = [];

var sunSpacing = 25;
var planetSpacing = 15;

//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------

function init() {
	////////////// SETUP CANVAS ////////////

	canvas = document.getElementById("cnvs");

	// MOUSE //
	canvas.addEventListener("mousedown", mousePress, false);
	canvas.addEventListener("mouseup", mouseRelease, false);

	cxa = canvas.getContext("2d");
	cxa.webkitImageSmoothingEnabled = false;
	cxa.mozImageSmoothingEnabled = false;
	cxa.imageSmoothingEnabled = false;

	// SET CANVAS & DRAWING POSITIONS //
	metrics();

	// DONE //
	scene = 1;
	draw();
} // END INIT

function createPlanets() {
	var i;

	limiter = new Tone.Limiter(-10);
	limiter.toMaster();

	masterLevel = Tone.Master;
	masterLevel.setVolume(volume);

	masterDelay = new Tone.PingPongDelay(0.25);
	masterDelay.setWet(delay);
	masterDelay.connect(limiter);

	masterLFO = new Tone.LFO(5.5, -tremolo, tremolo);
	masterLFO.start();

	for (i = 0; i < 10; i++) {
		planets[i] = new Planet(sunSpacing + planetSpacing * i, planetYear[i]);

		osc[i] = new Tone.Oscillator(intToFreq(scales[selectedScale][i]));
		osc2[i] = new Tone.Oscillator(intToFreq(scales[selectedScale][i] + 12));
		env[i] = new Tone.Envelope(
			planetAttack[i],
			0.01,
			0.5,
			planetRelease[i]
		);
		env2[i] = new Tone.Envelope(
			planetAttack[i],
			0.01,
			0.5,
			planetRelease[i]
		);
		//pan[i] = new Tone.PanVol(0.275 + (i*0.05) ,volume );

		masterLFO.connect(osc[i].detune);
		masterLFO.connect(osc2[i].detune);

		env[i].connect(osc[i].output.gain);
		env2[i].connect(osc2[i].output.gain);
		osc[i].connect(masterDelay);
		osc2[i].connect(masterDelay);
		//pan[i].connect(masterDelay);
		osc[i].start();
		osc2[i].start();
	}

	drone = new Tone.Oscillator(intToFreq(12), "triangle");
	droneEnv = new Tone.Envelope(planetAttack[0], 0.01, 0.5, planetRelease[0]);
	droneEnv.connect(drone.output.gain);
	masterLFO.connect(drone.detune);
	drone.connect(masterDelay);
	drone.start();

	bassDrone = new Tone.Oscillator(intToFreq(-24));

	bassDrone.connect(masterDelay);
	bassDrone.setVolume(bass);
	bassDrone.start();

	for (i = 0; i < 50; i++) {
		var p = new Particle();
		particles[i] = p;
		pool[i] = p;
	}
}

function setupPages() {
	var interactions;
	interactions = [
		new Interaction(new Point(ttx, cy + 60 * units)),
		new Interaction(new Point(fullX - 230 * units, cy)),
		new Interaction(new Point(fullX - 100 * units, cy)),
		new Interaction(new Point(fullX - 230 * units, cy + 60 * units)),
	];
	if (device == "mobile") {
		interactions = [
			new Interaction(new Point(dx - 95 * units, fullY - 110 * units)),
			new Interaction(new Point(dx - 40 * units, fullY - 110 * units)),
			new Interaction(new Point(dx + 80 * units, fullY - 110 * units)),
			new Interaction(new Point(dx - 40 * units, fullY - 50 * units)),
		];
	}
	pages[0] = new Page(0, interactions, true);

	interactions = [
		new Interaction(new Point(dx - 250 * units, dy - 90 * units)),
		new Interaction(new Point(dx - 75 * units, dy - 90 * units)),
		new Interaction(new Point(dx + 100 * units, dy - 90 * units)),
		new Interaction(new Point(dx - 40 * units, dy + 105 * units)),
	];
	if (device == "mobile") {
		interactions = [
			new Interaction(new Point(dx - 15 * units, dy - 270 * units)),
			new Interaction(new Point(dx - 15 * units, dy - 190 * units)),
			new Interaction(new Point(dx - 15 * units, dy - 110 * units)),
			new Interaction(new Point(dx - 40 * units, dy + 130 * units)),
		];
	}
	pages[1] = new Page(fullY, interactions, false);

	interactions = [
		new Interaction(new Point(dx - 40 * units, dy + 105 * units)),
		new Interaction(
			new Point(dx + 15 * units, dy - 41 * units + dataType * 3)
		),
	];
	if (device == "mobile") {
		interactions = [
			new Interaction(new Point(dx - 40 * units, dy + 130 * units)),
			new Interaction(
				new Point(dx - 150 * units, dy - 41 * units + dataType * 3)
			),
		];
	}
	pages[2] = new Page(fullY, interactions, false);
}

function intToFreq(int) {
	return Math.pow(2, int / 12) * baseFreq;
}

function linValue(minpos, maxpos, minval, maxval, position) {
	var scale = (maxval - minval) / (maxpos - minpos);
	return (position - minpos) * scale + minval;
}

function changeScale(array) {
	for (var i = 0; i < planets.length; i++) {
		osc[i].setFrequency(intToFreq(array[i]));
		osc2[i].setFrequency(intToFreq(array[i] + 12));
	}
	bassDrone.setFrequency(intToFreq(-24));
}

function particleBurst(n, s) {
	// AVAILABLE PARTICLES //
	var l = n;
	if (pool.length < n) {
		l = pool.length;
	}

	for (var i = 0; i < l; i++) {
		var p = pool.shift();
		p.active = true;
		p.position = new Point(
			dx - 260 * units + Math.random() * 520 * units,
			cy
		);
		p.peak = 0.1 + Math.random() * s;
		p.delay = Math.round(Math.random() * 30);
	}
}

//-------------------------------------------------------------------------------------------
//  LOOP
//-------------------------------------------------------------------------------------------

function draw() {
	if (scene == 1) {
		drawBegin();
	}
	if (scene == 2) {
		update();
	}

	requestAnimationFrame(draw, canvas);
}

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

function update() {
	if (TWEEN) {
		TWEEN.update();
	}

	var i;

	//PLOT PLANET PATHS
	for (i = 0; i < 10; i++) {
		var planet = planets[i];

		if (isPlaying) {
			planet.angle -= ((2 * Math.PI) / planet.year) * tempo;

			// ANGLE
			var param = planet.angle;
			var destX = Math.cos(param);
			var destY = Math.sin(param);
			planet.position.x = destX * planet.rad;
			planet.position.y = destY * planet.rad;
		}

		// GLOW ALPHA FADE
		if (planet.glowAlpha > 0) {
			planet.glowAlpha -= 1;
		}

		//COMPLETE YEAR
		var yearCheck = planet.position.y;
		if (yearCheck < 0 && planet.yearYes && isPlaying) {
			planet.yearCount += 1;
			planet.yearYes = false;

			//SOUND PLAY //
			if (i == 0) {
				env[i].triggerAttackRelease(env[i].attack, "+0", 0.2);
				env2[i].triggerAttackRelease(env[i].attack, "+0", 0.1);
				droneEnv.triggerAttackRelease(env[i].attack, "+0", 0.05);
			} else {
				env[i].triggerAttackRelease(env[i].attack, "+0", 1);
				env2[i].triggerAttackRelease(env[i].attack, "+0", 0.5);
			}

			// FLASH //
			if (i > 4) {
				particleBurst(25, planetFlash[i]);
			}

			//GLOW ALPHA
			planet.glowAlpha = 50;
		}
		if (planet.angle < 0) {
			planet.angle += Math.PI * 2;
		}

		//RESET YEARYES
		if (yearCheck > 0 && planet.yearYes == false) {
			planet.yearYes = true;
		}
	}

	if (particles.length > 0) {
		for (i = 0; i < particles.length; i++) {
			var p = particles[i];
			if (p.active) {
				// INITIAL DELAY //
				if (p.delay > 0) {
					p.delay -= 1;
				} else {
					// SHRINK //
					if (p.polarity == 1) {
						p.size -= 0.05;

						// GROW //
					} else {
						if (p.size < p.peak) {
							p.size += p.peak / 10;
						} else {
							p.polarity = 1;
						}
					}

					p.position.y += (p.peak / 5) * p.direction;
				}

				// RESET //
				if (p.polarity == 1 && p.size <= 0) {
					p.polarity = -1;
					p.active = false;
					pool.push(p);
				}
			}
		}
	}
}

//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------

function mousePress() {
	mouseIsDown = true;
	rolloverCheck();

	if (scene == 1) {
		createPlanets();
		scene = 2;
		isPlaying = true;
		/*if (env.length>0) {
            droneEnv.triggerAttackRelease(env[i].attack,"+0",0.01);
        }*/

		return;
	}

	if (playOver) {
		if (isPlaying) {
			isPlaying = false;
			bassDrone.setVolume(-100, 0.5);
		} else {
			isPlaying = true;
			bassDrone.setVolume(bass, 0.5);
		}
		console.log(masterLFO);
	}

	if (tempoOver) {
		tempoSelected = true;
		tempoX = setSlider(pages[0].interactions[1].position.x, 70);
		tempo = linValue(0, 70, tempoMin, tempoMax, tempoX);
	}

	if (optionsOver) {
		pageTo(pageDest, 300, pages[1]);
		pages[1].open = true;
	}
	if (optionsCloseOver) {
		pageTo(fullY, 300, pages[1]);
		pages[1].open = false;
	}
	if (infoOver) {
		pageTo(pageDest, 300, pages[2]);
		pages[2].open = true;
	}
	if (infoCloseOver) {
		pageTo(fullY, 300, pages[2]);
		pages[2].open = false;
	}
	if (originalOver) {
		window.open("http://whitevinyldesign.com/solarbeat/2010", "_blank");
	}
	if (whitevinylOver) {
		window.open("http://whitevinyldesign.com", "_blank");
	}

	if (delayOver) {
		delaySelected = true;
		delayX = setSlider(pages[1].interactions[0].position.x, 140);
		delay = linValue(0, 90, delayMin, delayMax, delayX);
		masterDelay.setWet(delay);
	}
	if (tremoloOver) {
		tremoloSelected = true;
		tremoloX = setSlider(pages[1].interactions[1].position.x, 140);
		tremolo = linValue(0, 90, tremoloMin, tremoloMax, tremoloX);
		masterLFO.setMin(-tremolo);
		masterLFO.setMax(tremolo);
	}
	if (bassOver) {
		bassSelected = true;
		bassX = setSlider(pages[1].interactions[2].position.x, 140);
		bass = linValue(0, 90, bassMin, bassMax, bassX);
		if (isPlaying) {
			bassDrone.setVolume(bass, 0.1);
		}
	}

	for (var i = 0; i < scales.length; i++) {
		if (scaleOver[i]) {
			changeScale(scales[i]);
			selectedScale = i;
		}
	}
}

function mouseRelease() {
	mouseIsDown = false;
	tempoSelected = false;
	delaySelected = false;
	tremoloSelected = false;
	bassSelected = false;
}

function rolloverCheck() {
	var scaleCheck = false;

	if (pages[1].open == false && pages[2].open == false) {
		optionsCloseOver = false;
		infoCloseOver = false;

		infoOver = hudCheck(
			pages[0].interactions[0].position.x - 20 * units,
			pages[0].interactions[0].position.y - 20 * units,
			40 * units,
			40 * units
		);
		tempoOver = hudCheck(
			pages[0].interactions[1].position.x - 5 * units,
			pages[0].interactions[1].position.y - 20 * units,
			90 * units,
			40 * units
		);
		playOver = hudCheck(
			pages[0].interactions[2].position.x - 5 * units,
			pages[0].interactions[2].position.y - 20 * units,
			40 * units,
			40 * units
		);
		optionsOver = hudCheck(
			pages[0].interactions[3].position.x - 5 * units,
			pages[0].interactions[3].position.y - 20 * units,
			90 * units,
			40 * units
		);
		if (device !== "mobile") {
			whitevinylOver = hudCheck(
				ttx - 40 * units,
				cy,
				80 * units,
				25 * units
			);
		}
	} else if (pages[1].open) {
		optionsOver = false;

		delayOver = hudCheck(
			pages[1].interactions[0].position.x - 5 * units,
			pages[1].y + pages[1].interactions[0].position.y - 25 * units,
			160 * units,
			50 * units
		);
		tremoloOver = hudCheck(
			pages[1].interactions[1].position.x - 5 * units,
			pages[1].y + pages[1].interactions[1].position.y - 25 * units,
			160 * units,
			50 * units
		);
		bassOver = hudCheck(
			pages[1].interactions[2].position.x - 5 * units,
			pages[1].y + pages[1].interactions[2].position.y - 25 * units,
			160 * units,
			50 * units
		);
		optionsCloseOver = hudCheck(
			pages[1].interactions[3].position.x - 5 * units,
			pages[1].y + pages[1].interactions[3].position.y - 20 * units,
			90 * units,
			40 * units
		);

		for (var i = 0; i < scales.length; i++) {
			if (device !== "mobile") {
				scaleOver[i] = hudCheck(
					dx - 160 * units + 52 * i * units,
					dy + pages[1].y - 20 * units,
					40 * units,
					40 * units
				);
			} else {
				if (i < 4) {
					scaleOver[i] = hudCheck(
						dx - 62 * units + 52 * i * units,
						dy + pages[1].y - 50 * units,
						40 * units,
						40 * units
					);
				} else {
					scaleOver[i] = hudCheck(
						dx - 62 * units + 52 * (i - 4) * units,
						dy + pages[1].y + 2 * units,
						40 * units,
						40 * units
					);
				}
			}

			if (scaleOver[i]) {
				scaleCheck = true;
			}
		}
	} else if (pages[2].open) {
		infoOver = false;

		infoCloseOver = hudCheck(
			pages[2].interactions[0].position.x - 5 * units,
			pages[2].y + pages[2].interactions[0].position.y - 20 * units,
			90 * units,
			40 * units
		);
		originalOver = hudCheck(
			pages[2].interactions[1].position.x - 5 * units,
			pages[2].y + pages[2].interactions[1].position.y - 15 * units,
			300 * units,
			25 * units
		);
	}

	if (
		playOver ||
		infoOver ||
		tempoOver ||
		optionsOver ||
		optionsCloseOver ||
		infoCloseOver ||
		originalOver ||
		delayOver ||
		tremoloOver ||
		bassOver ||
		whitevinylOver ||
		scaleCheck
	) {
		canvas.style.cursor = "pointer";
	} else {
		canvas.style.cursor = "default";
	}
}

function hudCheck(x, y, w, h) {
	// IS CURSOR WITHIN GIVEN BOUNDARIES
	var mx = mouseX;
	var my = mouseY;
	return mx > x && mx < x + w && my > y && my < y + h;
}

// DETERMINE CLICK //
function clickOrTouch(event) {
	var x, y;

	if (touchTakeover == true) {
		x = touch.pageX;
		y = touch.pageY;
	} else {
		x = event.pageX;
		y = event.pageY;
	}

	const ratio = getPixelRatio();
	mouseX = x * ratio;
	mouseY = y * ratio;

	if (mouseIsDown == false) {
		mousePress(event);
	}
}

function setSlider(sliderpos, maxval) {
	var sliderX = (mouseX - sliderpos) / units - 5;

	if (sliderX < 0) {
		sliderX = 0;
	}
	if (sliderX > maxval) {
		sliderX = maxval;
	}
	return sliderX;
}

//-------------------------------------------------------------------------------------------
//  METRICS
//-------------------------------------------------------------------------------------------

function metrics() {
	var canvasDestW = window.innerWidth;
	var canvasDestH = window.innerHeight;
	const ratio = getPixelRatio();
	canvas.width = canvasDestW * ratio;
	canvas.height = canvasDestH * ratio;

	console.log(canvasDestW);

	// UNIT SIZES //
	halfX = Math.round((canvasDestW * ratio) / 2);
	halfY = Math.round((canvasDestH * ratio) / 2);
	fullX = canvasDestW * ratio;
	fullY = canvasDestH * ratio;

	// DEVICE CHECK //

	if (fullY > fullX * 1.05) {
		device = "mobile";
	} else if (fullY > fullX * 0.65) {
		device = "tablet";
	} else {
		device = "desktop";
	}
	console.log(device);

	var u;

	if (device == "mobile") {
		u = canvasDestW * ratio * 2.3;
		units = u / 1000;

		// TEXT SIZES //
		headerType = Math.round(u / 40);
		midType = Math.round(u / 60);
		dataType = Math.round(u / 90);
		bodyType = Math.round(u / 100);
		subType = Math.round(u / 90);
	} else {
		u = canvasDestW * ratio * 0.85;
		units = u / 800;

		// TEXT SIZES //
		headerType = Math.round(u / 32);
		midType = Math.round(u / 45);
		dataType = Math.round(u / 80);
		bodyType = Math.round(u / 100);
		subType = Math.round(u / 90);
	}

	dx = halfX;
	dy = halfY;
	if (device == "mobile") {
		cy = dy;
		pageDest = 145 * units;
	} else {
		cy = dy + 20 * units;
		pageDest = 60 * units;
	}

	ttx = (dx - (sunSpacing + planetSpacing * 9) * units) * 0.5;

	setupPages();
}

function getPixelRatio() {
	var cntx = cxa;
	var dpr = window.devicePixelRatio || 1;
	var bsr =
		cntx.webkitBackingStorePixelRatio ||
		cntx.mozBackingStorePixelRatio ||
		cntx.msBackingStorePixelRatio ||
		cntx.oBackingStorePixelRatio ||
		cntx.backingStorePixelRatio ||
		1;

	return dpr / bsr;
}

function Point(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

function Colour(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

function Planet(rad, year) {
	this.position = new Point(rad, 0);
	this.angle = 0;
	this.rad = rad;
	this.year = year;
	this.yearCount = 0;
	this.yearYes = false;
	this.glowAlpha = 0;
}

function Particle() {
	this.position = new Point(0, 0);
	this.peak = 2 + Math.random() * 30;
	this.size = 0;
	this.polarity = -1;
	this.active = false;
	this.direction = 1;
	var dice = Math.floor(Math.random() * 2);
	if (dice == 0) {
		this.direction = -1;
	}
	this.delay = 0;
}

function Page(y, interactions, open) {
	this.y = y;
	this.interactions = interactions;
	this.open = open;
}

function Interaction(position) {
	this.position = position;
}
