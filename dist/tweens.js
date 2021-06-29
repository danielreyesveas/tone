/**
 * Created by luketwyman on 05/11/2014.
 */

function colourTo(col, r, g, b, a, t) {
	t = t || 1000;

	//TWEEN.removeAll();

	var cPos = { red: col.r, green: col.g, blue: col.b, alpha: col.a };

	var colTween = new TWEEN.Tween(cPos);
	colTween.to({ red: r, green: g, blue: b, alpha: a }, t);
	colTween.start();

	colTween.onUpdate(function () {
		col.r = this.red;
		col.g = this.green;
		col.b = this.blue;
		col.a = this.alpha;
	});

	colTween.easing(TWEEN.Easing.Quadratic.InOut);
}

function pageTo(y, t, p) {
	var oPos = { y: p.y };

	var optionsTween = new TWEEN.Tween(oPos);
	optionsTween.to({ y: y }, t);
	optionsTween.start();

	optionsTween.onUpdate(function () {
		p.y = this.y;
	});

	optionsTween.easing(TWEEN.Easing.Quadratic.InOut);
}
