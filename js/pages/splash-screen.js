define(['jquery'], function($) {
	// animate the intro "loader"
	!function animateAndRedirectIntro(){
		setTimeout(redirectToIntro, 5000);

		function redirectToIntro() {
			window.location.pathname="/intro.html";
		}

		var progress = 0, progressUnit = 15, diff = 0;
		setInterval(updateProgress.bind(0, $('.loader-indicator')), 5000/(100/progressUnit));

		function updateProgress(el) {
			var p = Math.floor(Math.random() * progressUnit) + 1;
			progress += p + diff;
			diff = progressUnit - p;
			el.html(progress+'%');
		}
	}();
});