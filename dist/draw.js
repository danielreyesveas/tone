/**
 * Created by luketwyman on 03/11/2014.
 */

//-------------------------------------------------------------------------------------------
//  BG
//-------------------------------------------------------------------------------------------

function drawBG() {
	cxa.globalAlpha = 1;

	setColour(bgCols[1]);
	cxa.fillRect(0, 0, fullX, fullY);
}

//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------

function drawScene() {
	var sx, sy, i;

	var dataY = 30 * units;
	var dataWidth = 64 * units;

	// RINGS //
	setColour(mainCols[0]);
	cxa.globalAlpha = 0.7;
	for (i = 0; i < 2; i++) {
		cxa.beginPath();
		cxa.arc(
			dx,
			cy,
			(sunSpacing + planetSpacing * i) * units,
			0,
			Math.PI * 2,
			true
		);
		cxa.closePath();
		cxa.stroke();
	}

	// PLAY LINE //
	setColour(mainCols[0]);
	cxa.globalAlpha = 1;

	if (device == "mobile") {
		cxa.beginPath();
		cxa.moveTo(dx, Math.round(cy) + 0.5);
		cxa.lineTo(fullX, Math.round(cy) + 0.5);
		cxa.stroke();
	} else {
		cxa.beginPath();
		cxa.moveTo(dx, Math.round(cy) + 0.5);
		cxa.lineTo(fullX - 230 * units, Math.round(cy) + 0.5);
		cxa.moveTo(fullX - 150 * units, Math.round(cy) + 0.5);
		cxa.lineTo(fullX - 100 * units, Math.round(cy) + 0.5);
		cxa.moveTo(fullX - 70 * units, Math.round(cy) + 0.5);
		cxa.lineTo(fullX, Math.round(cy) + 0.5);
		cxa.stroke();
	}

	// TT //
	if (device !== "mobile") {
		cxa.textAlign = "center";
		cxa.font = "300 " + headerType + "px Josefin Sans";
		cxa.fillText("SOLARBEAT", ttx, cy - 7 * units);

		// LINE //
		cxa.beginPath();
		cxa.moveTo(0, Math.round(cy) + 0.5);
		cxa.lineTo(
			ttx + cxa.measureText("SOLARBEAT").width * 0.5,
			Math.round(cy) + 0.5
		);
		cxa.stroke();

		// WHITEVINYL //
		cxa.font = "400 italic " + dataType + "px PT Sans";
		cxa.fillText("by Whitevinyl", ttx, cy + 7 * units + dataType * 0.8);
	}

	// INFO DIAMOND//
	sx = pages[0].interactions[0].position.x;
	sy = pages[0].interactions[0].position.y;

	setColour(mainCols[1]);
	cxa.beginPath();
	cxa.moveTo(sx, sy - 15 * units);
	cxa.lineTo(sx - 15 * units, sy);
	cxa.lineTo(sx + 15 * units, sy);
	cxa.closePath();
	cxa.fill();
	setColour(mainCols[3]);
	cxa.beginPath();
	cxa.moveTo(sx - 15 * units, sy);
	cxa.lineTo(sx, sy + 15 * units);
	cxa.lineTo(sx + 15 * units, sy);
	cxa.closePath();
	cxa.fill();
	setColour(mainCols[0]);
	cxa.fillRect(sx - units * 1.5, sy - 7 * units, 3 * units, 3 * units);
	cxa.fillRect(sx - units * 1.5, sy - 1 * units, 3 * units, 9 * units);

	sx = pages[0].interactions[2].position.x;
	sy = pages[0].interactions[2].position.y;
	if (isPlaying) {
		// PAUSE //
		setColour(mainCols[1]);
		cxa.fillRect(sx + units, sy - 15 * units, 10 * units, 15 * units);
		cxa.fillRect(sx + 19 * units, sy - 15 * units, 10 * units, 15 * units);
		setColour(mainCols[3]);
		cxa.fillRect(sx + units, sy, 10 * units, 15 * units);
		cxa.fillRect(sx + 19 * units, sy, 10 * units, 15 * units);
	} else {
		// PLAY //
		setColour(mainCols[1]);
		cxa.beginPath();
		cxa.moveTo(sx, sy - 15 * units);
		cxa.lineTo(sx + 30 * units, sy);
		cxa.lineTo(sx, sy);
		cxa.closePath();
		cxa.fill();
		setColour(mainCols[3]);
		cxa.beginPath();
		cxa.moveTo(sx, sy);
		cxa.lineTo(sx + 30 * units, sy);
		cxa.lineTo(sx, sy + 15 * units);
		cxa.closePath();
		cxa.fill();
	}

	// TEMPO //
	drawSlider(
		pages[0].interactions[1].position.x,
		pages[0].interactions[1].position.y,
		80,
		15,
		tempoX
	);

	// OPEN OPTIONS //
	sx = pages[0].interactions[3].position.x;
	sy = pages[0].interactions[3].position.y;
	setColour(mainCols[1]);
	cxa.fillRect(sx, sy - 15 * units, 80 * units, 15 * units);
	setColour(mainCols[3]);
	cxa.fillRect(sx, sy, 80 * units, 15 * units);
	setColour(bgCols[1]);
	cxa.fillRect(sx + 3 * units, sy - 12 * units, 74 * units, 24 * units);
	setColour(mainCols[0]);
	cxa.beginPath();
	cxa.moveTo(sx + 35 * units, Math.round(sy - 3 * units) + 0.5);
	cxa.lineTo(sx + 25 * units, Math.round(sy - 3 * units) + 0.5);
	cxa.moveTo(sx + 35 * units, Math.round(sy + 3 * units) + 0.5);
	cxa.lineTo(sx + 25 * units, Math.round(sy + 3 * units) + 0.5);
	cxa.moveTo(sx + 45 * units, Math.round(sy - 3 * units) + 0.5);
	cxa.lineTo(sx + 55 * units, Math.round(sy - 3 * units) + 0.5);
	cxa.moveTo(sx + 45 * units, Math.round(sy + 3 * units) + 0.5);
	cxa.lineTo(sx + 55 * units, Math.round(sy + 3 * units) + 0.5);
	cxa.stroke();

	// SUN //
	setColour(mainCols[0]);
	cxa.beginPath();
	cxa.arc(dx, cy, 10 * units, 0, Math.PI * 2, true);
	cxa.closePath();
	cxa.fill();

	// PLANETS //
	for (i = 0; i < 2; i++) {
		var planet = planets[i];
		sx = dx + planet.position.x * units;
		sy = cy + planet.position.y * units;

		//GLOW
		setColour(mainCols[0]);
		cxa.globalAlpha = planet.glowAlpha / 100;
		cxa.beginPath();
		cxa.arc(sx, sy, 8 * units, 0, Math.PI * 2, true);
		cxa.closePath();
		cxa.fill();

		//PLANET
		setColour(mainCols[0]);
		cxa.globalAlpha = 1;
		cxa.beginPath();
		cxa.arc(sx, sy, 3.5 * units, 0, Math.PI * 2, true);
		cxa.closePath();
		cxa.fill();

		// COUNTER //
		cxa.textAlign = "center";
		if (device !== "mobile") {
			cxa.font = "400 italic " + dataType + "px PT Sans";
			cxa.fillText(
				planetName[i],
				dx - dataWidth * 4.5 + dataWidth * i,
				dataY
			);
			cxa.font = "300 " + midType + "px Raleway";
			cxa.fillText(
				"" + planet.yearCount,
				dx - dataWidth * 4.5 + dataWidth * i,
				dataY + 20 * units
			);
		} else {
			if (i < 5) {
				cxa.font = "400 italic " + dataType + "px PT Sans";
				cxa.fillText(
					planetName[i],
					dx - dataWidth * 2 + dataWidth * i,
					dataY
				);
				cxa.font = "300 " + midType + "px Raleway";
				cxa.fillText(
					"" + planet.yearCount,
					dx - dataWidth * 2 + dataWidth * i,
					dataY + 20 * units
				);
			} else {
				cxa.font = "400 italic " + dataType + "px PT Sans";
				cxa.fillText(
					planetName[i],
					dx - dataWidth * 2 + dataWidth * (i - 5),
					dataY + 50 * units
				);
				cxa.font = "300 " + midType + "px Raleway";
				cxa.fillText(
					"" + planet.yearCount,
					dx - dataWidth * 2 + dataWidth * (i - 5),
					dataY + 70 * units
				);
			}
		}
	}

	// COUNTER MARKERS //
	if (device !== "mobile") {
		cxa.textAlign = "right";
		cxa.font = "400 italic " + dataType + "px PT Sans";
		cxa.fillText("years", dx - dataWidth * 5.3, dataY + 11 * units);

		cxa.beginPath();
		for (i = 0; i < 9; i++) {
			cxa.moveTo(dx - dataWidth * 4 + dataWidth * i, dataY - 15 * units);
			cxa.lineTo(dx - dataWidth * 4 + dataWidth * i, dataY + 30 * units);
		}
		cxa.moveTo(dx - dataWidth * 5, dataY - 15 * units);
		cxa.bezierCurveTo(
			dx - dataWidth * 5 - 10 * units,
			dataY - 15 * units,
			dx - dataWidth * 5,
			dataY + 7.5 * units,
			dx - dataWidth * 5 - 10 * units,
			dataY + 7.5 * units
		);
		cxa.bezierCurveTo(
			dx - dataWidth * 5,
			dataY + 7.5 * units,
			dx - dataWidth * 5 - 10 * units,
			dataY + 30 * units,
			dx - dataWidth * 5,
			dataY + 30 * units
		);
	} else {
		cxa.textAlign = "center";
		cxa.font = "400 italic " + dataType + "px PT Sans";
		//cxa.fillText("YEARS:", dx, dataY - (5*units));
		//cxa.textAlign = "right";
		cxa.fillText("years", dx, dataY + 112 * units);
		for (i = 0; i < 4; i++) {
			cxa.moveTo(
				dx - dataWidth * 1.5 + dataWidth * i,
				dataY - 15 * units
			);
			cxa.lineTo(
				dx - dataWidth * 1.5 + dataWidth * i,
				dataY + 80 * units
			);
		}
		cxa.moveTo(dx - dataWidth * 2.3, dataY + 80 * units);
		cxa.bezierCurveTo(
			dx - dataWidth * 2.3,
			dataY + 110 * units,
			dx,
			dataY + 80 * units,
			dx,
			dataY + 100 * units
		);
		cxa.bezierCurveTo(
			dx,
			dataY + 80 * units,
			dx + dataWidth * 2.3,
			dataY + 110 * units,
			dx + dataWidth * 2.3,
			dataY + 80 * units
		);
	}

	cxa.stroke();

	if (beginAlpha > 0) {
		beginAlpha -= 2;

		cxa.globalAlpha = beginAlpha / 100;
		setColour(bgCols[1]);
		cxa.fillRect(0, 0, fullX, fullY);
	}
}

//-------------------------------------------------------------------------------------------
//  DRAW MENU
//-------------------------------------------------------------------------------------------

function drawOptions() {
	if (pages[1].y < fullY) {
		var sx, sy;

		// BG //
		setColour(bgCols[1]);
		cxa.fillRect(0, pages[1].y, fullX, fullY);

		drawSlider(
			pages[1].interactions[0].position.x,
			pages[1].y + pages[1].interactions[0].position.y,
			150,
			20,
			delayX
		);
		drawSlider(
			pages[1].interactions[1].position.x,
			pages[1].y + pages[1].interactions[1].position.y,
			150,
			20,
			tremoloX
		);
		drawSlider(
			pages[1].interactions[2].position.x,
			pages[1].y + pages[1].interactions[2].position.y,
			150,
			20,
			bassX
		);
		setColour(mainCols[0]);

		cxa.font = "300 " + headerType + "px Josefin Sans";
		if (device !== "mobile") {
			cxa.textAlign = "center";
			cxa.fillText(
				"ECHO",
				pages[1].interactions[0].position.x + 75 * units,
				pages[1].y + pages[1].interactions[0].position.y - 40 * units
			);
			cxa.fillText(
				"FLUTTER",
				pages[1].interactions[1].position.x + 75 * units,
				pages[1].y + pages[1].interactions[1].position.y - 40 * units
			);
			cxa.fillText(
				"BASS",
				pages[1].interactions[2].position.x + 75 * units,
				pages[1].y + pages[1].interactions[2].position.y - 40 * units
			);
		} else {
			cxa.textAlign = "right";
			cxa.fillText(
				"ECHO",
				pages[1].interactions[0].position.x - 20 * units,
				pages[1].y +
					pages[1].interactions[0].position.y +
					headerType * 0.38
			);
			cxa.fillText(
				"FLUTTER",
				pages[1].interactions[1].position.x - 20 * units,
				pages[1].y +
					pages[1].interactions[1].position.y +
					headerType * 0.38
			);
			cxa.fillText(
				"BASS",
				pages[1].interactions[2].position.x - 20 * units,
				pages[1].y +
					pages[1].interactions[2].position.y +
					headerType * 0.38
			);
		}

		// CLOSE BUTTON //
		sx = pages[1].interactions[3].position.x;
		sy = pages[1].y + pages[1].interactions[3].position.y;
		setColour(mainCols[1]);
		cxa.fillRect(dx - 40 * units, sy - 15 * units, 80 * units, 15 * units);
		setColour(mainCols[3]);
		cxa.fillRect(dx - 40 * units, sy, 80 * units, 15 * units);
		setColour(bgCols[1]);
		cxa.fillRect(dx - 37 * units, sy - 12 * units, 74 * units, 24 * units);
		setColour(mainCols[0]);
		cxa.beginPath();
		cxa.moveTo(dx - 5 * units, Math.round(sy - 5 * units));
		cxa.lineTo(dx + 5 * units, Math.round(sy + 5 * units));
		cxa.moveTo(dx + 5 * units, Math.round(sy - 5 * units));
		cxa.lineTo(dx - 5 * units, Math.round(sy + 5 * units));
		cxa.stroke();

		cxa.textAlign = "left";
		if (device !== "mobile") {
			sy = dy + pages[1].y;
			cxa.fillText("SCALE", dx - 250 * units, sy + headerType * 0.38);
		} else {
			cxa.textAlign = "right";
			sy = dy + pages[1].y - 4 * units;
			cxa.fillText("SCALE", dx - 92 * units, sy + headerType * 0.38);
		}
		for (var i = 0; i < scales.length; i++) {
			if (device !== "mobile") {
				sx = dx - 138 * units + 52 * i * units;
				sy = dy + pages[1].y;
				if (selectedScale == i) {
					setColour(mainCols[0]);
					cxa.beginPath();
					cxa.moveTo(
						sx - 20 * units,
						Math.round(sy - 20 * units) + 0.5
					);
					cxa.lineTo(
						sx + 20 * units,
						Math.round(sy - 20 * units) + 0.5
					);
					cxa.moveTo(
						sx + 20 * units,
						Math.round(sy + 20 * units) + 0.5
					);
					cxa.lineTo(
						sx - 20 * units,
						Math.round(sy + 20 * units) + 0.5
					);
					cxa.stroke();
				}
			} else {
				if (i < 4) {
					sx = dx - 42 * units + 52 * i * units;
					sy = dy + pages[1].y - 30 * units;
					if (selectedScale == i) {
						setColour(mainCols[0]);
						cxa.beginPath();
						cxa.moveTo(
							sx - 20 * units,
							Math.round(sy - 20 * units) + 0.5
						);
						cxa.lineTo(
							sx + 20 * units,
							Math.round(sy - 20 * units) + 0.5
						);
						cxa.moveTo(
							sx + 20 * units,
							Math.round(sy + 20 * units) + 0.5
						);
						cxa.lineTo(
							sx - 20 * units,
							Math.round(sy + 20 * units) + 0.5
						);
						cxa.stroke();
					}
				} else {
					sx = dx - 42 * units + 52 * (i - 4) * units;
					sy = dy + pages[1].y + 22 * units;
					if (selectedScale == i) {
						setColour(mainCols[0]);
						cxa.beginPath();
						cxa.moveTo(
							sx - 20 * units,
							Math.round(sy - 20 * units) + 0.5
						);
						cxa.lineTo(
							sx + 20 * units,
							Math.round(sy - 20 * units) + 0.5
						);
						cxa.moveTo(
							sx + 20 * units,
							Math.round(sy + 20 * units) + 0.5
						);
						cxa.lineTo(
							sx - 20 * units,
							Math.round(sy + 20 * units) + 0.5
						);
						cxa.stroke();
					}
				}
			}

			drawGlyphs(sx, sy, i);
		}
	}
}

function drawGlyphs(x, y, n) {
	switch (n) {
		case 0:
			setColour(mainCols[1]);
			cxa.fillRect(x - 1.5 * units, y - 8 * units, 3 * units, 8 * units);
			setColour(mainCols[3]);
			cxa.fillRect(x - 1.5 * units, y, 3 * units, 8 * units);
			break;

		case 1:
			setColour(mainCols[1]);
			cxa.fillRect(
				x - 4.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x + 1.5 * units, y - 4 * units, 3 * units, 4 * units);
			setColour(mainCols[3]);
			cxa.fillRect(x - 4.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x + 1.5 * units, y, 3 * units, 12 * units);
			break;

		case 2:
			setColour(mainCols[1]);
			cxa.fillRect(
				x - 7.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x - 1.5 * units, y - 4 * units, 3 * units, 4 * units);
			cxa.fillRect(
				x + 4.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			setColour(mainCols[3]);
			cxa.fillRect(x - 7.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x - 1.5 * units, y, 3 * units, 12 * units);
			cxa.fillRect(x + 4.5 * units, y, 3 * units, 4 * units);
			break;

		case 3:
			setColour(mainCols[1]);
			cxa.fillRect(
				x - 10.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x - 4.5 * units, y - 4 * units, 3 * units, 4 * units);
			cxa.fillRect(
				x + 1.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x + 7.5 * units, y - 4 * units, 3 * units, 4 * units);
			setColour(mainCols[3]);
			cxa.fillRect(x - 10.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x - 4.5 * units, y, 3 * units, 12 * units);
			cxa.fillRect(x + 1.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x + 7.5 * units, y, 3 * units, 12 * units);
			break;

		case 4:
			setColour(mainCols[1]);
			cxa.fillRect(
				x - 10.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x - 4.5 * units, y - 4 * units, 3 * units, 4 * units);
			cxa.fillRect(
				x + 1.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x + 7.5 * units, y - 4 * units, 3 * units, 4 * units);
			setColour(mainCols[3]);
			cxa.fillRect(x - 10.5 * units, y + 9 * units, 3 * units, 3 * units);
			cxa.fillRect(x - 10.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x - 4.5 * units, y, 3 * units, 12 * units);
			cxa.fillRect(x + 1.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x + 7.5 * units, y, 3 * units, 12 * units);
			break;

		case 5:
			setColour(mainCols[1]);
			cxa.fillRect(x - 4.5 * units, y - 12 * units, 3 * units, 3 * units);
			cxa.fillRect(
				x - 10.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x - 4.5 * units, y - 4 * units, 3 * units, 4 * units);
			cxa.fillRect(
				x + 1.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x + 7.5 * units, y - 4 * units, 3 * units, 4 * units);
			setColour(mainCols[3]);
			cxa.fillRect(x - 10.5 * units, y + 9 * units, 3 * units, 3 * units);
			cxa.fillRect(x - 10.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x - 4.5 * units, y, 3 * units, 12 * units);
			cxa.fillRect(x + 1.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x + 7.5 * units, y, 3 * units, 12 * units);
			break;

		case 6:
			setColour(mainCols[1]);
			cxa.fillRect(x - 4.5 * units, y - 12 * units, 3 * units, 3 * units);
			cxa.fillRect(
				x - 10.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x - 4.5 * units, y - 4 * units, 3 * units, 4 * units);
			cxa.fillRect(
				x + 1.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x + 7.5 * units, y - 4 * units, 3 * units, 4 * units);
			setColour(mainCols[3]);
			cxa.fillRect(x - 10.5 * units, y + 9 * units, 3 * units, 3 * units);
			cxa.fillRect(x + 1.5 * units, y + 9 * units, 3 * units, 3 * units);
			cxa.fillRect(x - 10.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x - 4.5 * units, y, 3 * units, 12 * units);
			cxa.fillRect(x + 1.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x + 7.5 * units, y, 3 * units, 12 * units);
			break;

		case 7:
			setColour(mainCols[1]);
			cxa.fillRect(x - 4.5 * units, y - 12 * units, 3 * units, 3 * units);
			cxa.fillRect(x + 7.5 * units, y - 12 * units, 3 * units, 3 * units);
			cxa.fillRect(
				x - 10.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x - 4.5 * units, y - 4 * units, 3 * units, 4 * units);
			cxa.fillRect(
				x + 1.5 * units,
				y - 12 * units,
				3 * units,
				12 * units
			);
			cxa.fillRect(x + 7.5 * units, y - 4 * units, 3 * units, 4 * units);
			setColour(mainCols[3]);
			cxa.fillRect(x - 10.5 * units, y + 9 * units, 3 * units, 3 * units);
			cxa.fillRect(x + 1.5 * units, y + 9 * units, 3 * units, 3 * units);
			cxa.fillRect(x - 10.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x - 4.5 * units, y, 3 * units, 12 * units);
			cxa.fillRect(x + 1.5 * units, y, 3 * units, 4 * units);
			cxa.fillRect(x + 7.5 * units, y, 3 * units, 12 * units);
			break;
	}
}

//-------------------------------------------------------------------------------------------
//  DRAW INFO
//-------------------------------------------------------------------------------------------

function drawInfo() {
	if (pages[2].y < fullY) {
		var sx, sy;

		// BG //
		setColour(bgCols[1]);
		cxa.fillRect(0, pages[2].y, fullX, fullY);

		// CLOSE BUTTON //
		sx = pages[2].interactions[0].position.x;
		sy = pages[2].y + pages[2].interactions[0].position.y;
		setColour(mainCols[1]);
		cxa.fillRect(dx - 40 * units, sy - 15 * units, 80 * units, 15 * units);
		setColour(mainCols[3]);
		cxa.fillRect(dx - 40 * units, sy, 80 * units, 15 * units);
		setColour(bgCols[1]);
		cxa.fillRect(dx - 37 * units, sy - 12 * units, 74 * units, 24 * units);
		setColour(mainCols[0]);
		cxa.beginPath();
		cxa.moveTo(dx - 5 * units, Math.round(sy - 5 * units));
		cxa.lineTo(dx + 5 * units, Math.round(sy + 5 * units));
		cxa.moveTo(dx + 5 * units, Math.round(sy - 5 * units));
		cxa.lineTo(dx - 5 * units, Math.round(sy + 5 * units));
		cxa.stroke();
	}

	setColour(mainCols[0]);
	cxa.textAlign = "left";

	if (device !== "mobile") {
		cxa.font = "300 " + midType + "px Raleway";
		var txt =
			"How many Earth years does it take for dwarf planet Pluto to complete a single orbit of the Sun?";
		textWrap(
			cxa,
			txt,
			dx - 315 * units,
			pages[2].y + dy - 100 * units,
			dataType * 3,
			300 * units
		);

		cxa.font = "400 italic " + dataType + "px PT Sans";
		txt =
			"Created by Luke Twyman/Whitevinyl, using real orbital frequencies of our solar system, and originally appearing as a Flash site in March 2010. Now remade using the newer WebAudio API, just ahead of SolarBeat's 5th birthday and coinciding with NASA's Dawn spacecraft making history by entering the orbit of dwarf planet Ceres.";
		textWrap(
			cxa,
			txt,
			dx + 15 * units,
			pages[2].y + dy - 100 * units,
			dataType * 1.5,
			300 * units
		);
	} else {
		cxa.font = "300 " + midType + "px Raleway";
		var txt =
			"How many Earth years does it take for dwarf planet Pluto to complete a single orbit of the Sun?";
		textWrap(
			cxa,
			txt,
			dx - 150 * units,
			pages[2].y + dy - 240 * units,
			dataType * 2,
			300 * units
		);

		cxa.font = "400 italic " + dataType + "px PT Sans";
		txt =
			"Created by Luke Twyman/Whitevinyl, using real orbital frequencies of our solar system, and originally appearing as a Flash site in March 2010. Now remade using the newer WebAudio API, just ahead of SolarBeat's 5th birthday and coinciding with NASA's Dawn spacecraft making history by entering the orbit of dwarf planet Ceres.";
		textWrap(
			cxa,
			txt,
			dx - 150 * units,
			pages[2].y + dy - 140 * units,
			dataType * 1.5,
			300 * units
		);
	}

	cxa.font = "400 italic " + dataType + "px PT Sans";
	setColour(mainCols[3]);
	txt = "The original version of solarBeat can still be found here.";
	textWrap(
		cxa,
		txt,
		pages[2].interactions[1].position.x,
		pages[2].y + pages[2].interactions[1].position.y,
		dataType * 1.5,
		300 * units
	);
}

//-------------------------------------------------------------------------------------------
//  DRAW BEGIN
//-------------------------------------------------------------------------------------------

function drawBegin() {
	var sx = dx;
	var sy = dy;

	setColour(mainCols[1]);
	cxa.beginPath();
	cxa.moveTo(sx - 75 * units, sy - 75 * units);
	cxa.lineTo(sx + 75 * units, sy);
	cxa.lineTo(sx - 75 * units, sy);
	cxa.closePath();
	cxa.fill();
	setColour(mainCols[3]);
	cxa.beginPath();
	cxa.moveTo(sx - 75 * units, sy);
	cxa.lineTo(sx + 75 * units, sy);
	cxa.lineTo(sx - 75 * units, sy + 75 * units);
	cxa.closePath();
	cxa.fill();
}

//-------------------------------------------------------------------------------------------
//  DRAW PARTICLES
//-------------------------------------------------------------------------------------------

function drawParticles() {
	// PARTICLES //
	setColour(mainCols[0]);
	cxa.beginPath();
	for (i = 0; i < particles.length; i++) {
		var p = particles[i];
		if (p.active) {
			cxa.moveTo(p.position.x, p.position.y - p.size * units);
			cxa.lineTo(p.position.x, p.position.y + p.size * units);
		}
	}
	cxa.stroke();
}

//-------------------------------------------------------------------------------------------
//  DRAW FUNCTIONS
//-------------------------------------------------------------------------------------------

// PASS COLOUR OBJECT //
function setColour(col) {
	var red = Math.round(col.r + masterCol.r);
	var green = Math.round(col.g + masterCol.g);
	var blue = Math.round(col.b + masterCol.b);
	var alpha = col.a + masterCol.a;

	buildColour(red, green, blue, alpha);
}

// PASS MANUAL R G B A //
function setRGBA(r, g, b, a) {
	var red = Math.round(r + masterCol.r);
	var green = Math.round(g + masterCol.g);
	var blue = Math.round(b + masterCol.b);
	var alpha = a + masterCol.a;

	buildColour(red, green, blue, alpha);
}

function buildColour(red, green, blue, alpha) {
	// RANGE //
	if (red < 0) {
		red = 0;
	}
	if (red > 255) {
		red = 255;
	}
	if (green < 0) {
		green = 0;
	}
	if (green > 255) {
		green = 255;
	}
	if (blue < 0) {
		blue = 0;
	}
	if (blue > 255) {
		blue = 255;
	}
	if (alpha < 0) {
		alpha = 0;
	}
	if (alpha > 1) {
		alpha = 1;
	}
	cxa.fillStyle = cxa.strokeStyle =
		"rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
}

function diagonalFill(x, y, w, h, s) {
	var ctx = cxa;
	var lineNo = Math.round((w + h) / s);
	var pos1 = new Point(0, 0);
	var pos2 = new Point(0, 0);
	ctx.beginPath();
	for (var j = 0; j < lineNo; j++) {
		pos1.x = s * 0.5 + s * j;
		pos1.y = 0;
		pos2.x = pos1.x - h;
		pos2.y = h;
		if (pos2.x < 0) {
			pos2.y = h + pos2.x;
			pos2.x = 0;
		}
		if (pos1.x > w) {
			pos1.y = pos1.x - w;
			pos1.x = w;
		}
		ctx.moveTo(x + pos1.x, y + pos1.y);
		ctx.lineTo(x + pos2.x, y + pos2.y);
	}
	ctx.stroke();
}

function drawSlider(x, y, w, h, value) {
	setColour(mainCols[0]);
	cxa.globalAlpha = 0.7;
	diagonalFill(
		x + units,
		y - (h - 1) * units,
		(w - 2) * units,
		(h * 2 - 2) * units,
		6 * units
	);
	cxa.globalAlpha = 1;
	setColour(mainCols[1]);
	cxa.fillRect(x + value * units, y - h * units, 10 * units, h * units);
	setColour(mainCols[3]);
	cxa.fillRect(x + value * units, y, 10 * units, h * units);
	setColour(mainCols[0]);
	cxa.beginPath();
	cxa.moveTo(x + value * units, Math.round(y - (h + 5) * units) + 0.5);
	cxa.lineTo(
		x + value * units + 10 * units,
		Math.round(y - (h + 5) * units) + 0.5
	);
	cxa.moveTo(x + value * units, Math.round(y + (h + 5) * units) + 0.5);
	cxa.lineTo(
		x + value * units + 10 * units,
		Math.round(y + (h + 5) * units) + 0.5
	);
	cxa.stroke();
}

function textWrap(context, text, x, y, lineHeight, fitWidth) {
	fitWidth = fitWidth || 0;

	if (fitWidth <= 0) {
		context.fillText(text, x, y);
		return;
	}
	var words = text.split(" ");
	var currentLine = 0;
	var idx = 1;
	while (words.length > 0 && idx <= words.length) {
		var str = words.slice(0, idx).join(" ");
		var w = context.measureText(str).width;
		if (w > fitWidth) {
			if (idx == 1) {
				idx = 2;
			}
			context.fillText(
				words.slice(0, idx - 1).join(" "),
				x,
				y + lineHeight * currentLine
			);
			currentLine++;
			words = words.splice(idx - 1);
			idx = 1;
		} else {
			idx++;
		}
	}
	if (idx > 0)
		context.fillText(words.join(" "), x, y + lineHeight * currentLine);
}

//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------
