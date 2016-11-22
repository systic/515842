define(['jquery', 'jqHammerjs'], function($) {
	var $steps = $('.intro-steps').hammer(),
		$dots = $('.intro-steps-pagination .step'),
		$active = $('.intro-step:first'),
		$navItems = $('.intro-nav li'),
		$lastNavItem = $('.intro-nav li:last-child'),
		$nextBtn = $('.intro-nav .btn[data-role="next"]');

	// toggle through the intro steps
	function onSwipe(dir) {
		var $next = $active[dir]();

		if($next.length) {
			changeActive($active = $next);
		}
	}

	// enable swipe left/right to walk through the intro steps
	$steps
		.bind("swiperight", onSwipe.bind(0, 'prev'))
		.bind("swipeleft", onSwipe.bind(0, 'next'));

	// same functionality as swipe, but with buttons
	$nextBtn.bind('click', onSwipe.bind(0, 'next'));

	// change current step
	function changeActive($active) {
		$active.addClass('active')
			.siblings()
				.removeClass('active');

		onActiveChange($active);
	}

	// indicate current step with the nav dots
	function onActiveChange($active) {
		var $index = $active.index();

		$dots.eq($index).addClass('active')
			.siblings()
				.removeClass('active');

		$navItems.toggleClass('hidden', $active.is(':last-child'));
		$lastNavItem.toggleClass('hidden', !$active.is(':last-child'));
	}

	// show first step
	changeActive($active);
});