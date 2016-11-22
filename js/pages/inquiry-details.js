define(['jquery', 'components/popup', 'components/side-menu', 'components/dropdown'], function($, Popup) {
	// enable the page dropdowns
	$('.dropdown').dropdown();

	// Get those popups/modals ready to be displayer
	var popup = new Popup($('.reply-popup'));
	$('.reply-btn').on('click', function(ev){
		ev.preventDefault();
		popup.show();
	});

	// close modal when click on close btn
	$('.close-modal').on('click', function() {
		popup.hide();
	})
});