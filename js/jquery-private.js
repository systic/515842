define(['jquery'], function (jq) {

	// helper function for debouncing events
	jq.debounce = function debounce(func, wait) {
		var timeout;

		return function() {
			clearTimeout(timeout);
			timeout = setTimeout(func, wait);
		};
	};

    return jq.noConflict( true );
});