/**
 * SideMenu components
 * provide a simple way to show a side menu
 */
define(['jquery'], function($) {
	function toggleMenu(e) {
		e.preventDefault();

		$('.side-menu-mask').toggle();
		$('.page-wrap').toggleClass('has-menu-opened');
	}

	if ($('.side-menu').length > 0) {
		$('.toggle-side-menu, .side-menu-mask, .cpage').on('click', toggleMenu);
	}
});