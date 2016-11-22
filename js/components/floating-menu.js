/**
 * floating buble menu
 */
define(['jquery'], function($) {
	$.fn.floatingMenu = function() {
		$(this).each(function(_, menu){
			var $menu = $(menu),
				$btn = $menu.find('.toggle-menu-btn'),
				toggleActive = $menu.toggleClass.bind($menu, 'active'),
				delayActive = setTimeout.bind(null, toggleActive, 27),
				toggleVisible = $menu.toggleClass.bind($menu, 'visible');

			$btn.bind('click', toggleVisible);
			$btn.bind('click', delayActive);

			$menu.on('click', function(ev) {
				if($(ev.target).is($menu)) {
					toggleActive()
					toggleVisible()
				}
			})
		});
	}
});