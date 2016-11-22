define([
	'jquery',
	'components/stats-graph',
	'components/side-menu',
	'components/dropdown',
	'components/card'
], function($, stats) {
	// enable the page dropdowns
	$('.dropdown').dropdown();

	/**
	 * Functionality to collapse the dashboard sections
	 */
	$('.card.collapsible .card-title').on('click', collapseCard);
	function collapseCard(ev) {
		var $card = $(ev.target).closest('.card');
		$card.toggleClass('collapsed');
	}

	/**
	 * Make the dashboard editable, by pressing the "edit" button
	 */
	var $topBar = $('.top-bar'),
		$editBtn = $topBar.find('.edit-board'),
		$editable = $('.top-bar, .page-content'),
		$pageContent = $('.page-content');

	$editBtn.on('click', editMode);
	function editMode(ev) {
		$editable.toggleClass('edit-mode');

		if(!$pageContent.is('.edit-mode')) {
			$('.card.disabled').hide();
		}
	}

	/**
	 * Toggel a section's visibility
	 */
	$('.check-visible[type=checkbox]').on('change', onCardHidden);
	$('.cards').on('click', '.collapsible.disabled', showCard);
	function showCard(ev) {
		var $card = $(ev.target),
			$input = $card.find('.check-visible');

		$card.toggleClass('disabled');
		$card.show();

		$('.check-visible[name="'+$input.attr('name')+'"]').prop('checked', true);
	}

	// when a card was hidden, mark the rest of the markers correspondingly
	// toggle the item from the header list and hide/show the card
	function onCardHidden(ev) {
		var $target = $(ev.target),
			cardName = $target.attr('name'),
			$input = $('.card .check-visible[name="'+cardName+'"]'),
			$card = $input.closest('.card');

		$card.toggleClass('disabled');
		if(!$card.is('.disabled')) {
			$card.show();
		}

		$('.check-visible[name="'+$input.attr('name')+'"]').prop('checked', $target.prop('checked'));
	}

	/**
	 * Make the cards/dashboard sections sortable/draggable
	 */
	var $cards = window.jQuery('.cards');
	$cards.sortable({
		handle: ".ic-move"
	});
	$cards.disableSelection();

	/**
	 * Fetch stats data and render the stats graph
	 */
	$.getJSON('/data/stats.json').then(function(response) {
		stats.renderChart({data: response.data});
	});

	// toggle through the data views
	$('.chart-action').on('click', function(ev) {
		var $target = $(ev.target);
		$target.addClass('active').siblings().removeClass('active');

		stats.data.visible.rate = $target.text().toLowerCase().trim();
		stats.updateChart();
	});

	// toggle through the data views
	$('[name=statsType]').on('change', function(ev) {
		$(stats.chart.container).attr('data-type', ev.target.value);

		stats.data.visible.stat = ev.target.value;
		stats.updateChart();
	});
});