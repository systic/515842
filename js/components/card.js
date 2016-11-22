define(['jquery'], function($) {
	/* Listen for dropdown open and add card opacity mask*/
	$('.page-content').on('dropdown:toggle', '.card', function(ev, data){
		$(ev.currentTarget).toggleClass('dropdown-active', data.active);
	});
});