/**
 * Popup component
 * exposes an easy way to display a popup/modal
 */
define(['jquery'], function($) {
	function Popup($overlay) {
		this.$overlay = $overlay;

		this.$overlay.removeClass('hidden').hide();
	}

	Popup.prototype.show = function() {
		this.$overlay.fadeIn();
	};

	Popup.prototype.hide = function() {
		this.$overlay.fadeOut();
	};

	return Popup;
});