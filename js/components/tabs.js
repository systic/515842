/**
 * Tabs component
 * provide a simple way to show a tabbed navigation
 */
define(['jquery'], function($) {
	var $items = $('.tab-item');
	$items.on('click', function() {
		// toggle tabs
		$items.removeClass('active');
		$(this).addClass('active');

		// toggle content
		$('.tab-content').removeClass('active');
		$('.tab-content[data-name="'+$(this).data('name')+'"]').addClass('active');
	});
});