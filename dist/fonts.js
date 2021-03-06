/**
 * Created by luketwyman on 15/11/2014.
 */

WebFontConfig = {
	google: {
		families: [
			"PT+Sans:400,400italic:latin",
			"Josefin+Sans:300:latin",
			"Raleway:300:latin",
		],
	},
};
(function () {
	var wf = document.createElement("script");
	wf.src =
		("https:" == document.location.protocol ? "https" : "http") +
		"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
	wf.type = "text/javascript";
	wf.async = "false";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(wf, s);
})();
