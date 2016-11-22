define(['jquery', 'components/tabs'], function($) {
	var $scanBtn = $('.scan-btn'),
		$states = $('.page-state'),
		$defaultState = $('.page-state.default'),
		$failedState = $('.page-state.scan-failed'),

		toggleSuccessBtn = $.fn.toggleClass.bind($scanBtn, 'scan-btn scan-success', null),

		$notif = $('.notifications'),
		hideNotif = $.fn.fadeOut.bind($notif, 150),
		hideNotifLater = $.debounce(hideNotif, 2000),
		showNotif = $.fn.fadeIn.bind($notif, 150, hideNotifLater),

		_toggle = $.fn.toggle.bind($states, {
			duration: 0,
			always: $.debounce(toggled, 27, false)
		});

	// reset page states' display property
	// force display flex on page states
	$states.css({display: 'flex'});
	$failedState.hide();

	$scanBtn.on('click', toggle);

	// show the error status on first scan
	// show the success status on second scan
	function toggle(e) {
		$(e.currentTarget).is('.scan-btn') && $states.toggle({
			duration: 0,
			always: $.debounce(toggled, 27, false)
		}) && hideNotif();

		$(e.currentTarget).is('.scan-success') && showNotif() && toggleSuccessBtn();
	}

	function toggled(e) {
		if($defaultState.is(':visible')) {
			toggleSuccessBtn();
		}
	}

	// if success was passed as hash, show success message and repalce hash
	if(window.location.hash.indexOf('success') > -1) {
		showNotif();
		window.location.hash = window.location.hash.replace('success', '');
	}
});