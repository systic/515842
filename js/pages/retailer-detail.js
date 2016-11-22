define(['jquery', 'models/product', 'components/stats-graph', 'components/tabs', 'components/card', 'components/dropdown', 'jqHammerjs'], function($, Product, stats) {
	/* Fetch and render page products  */
	Product.fetch().then(renderProducts);

	/**
	 * Prepare the page tabs
	 */
	var $tab = $('.tab-content[data-name="points"]'),
		$productTmpl = $('.product-card:first');

	// loop through the products list
	// and append the to dom
	function renderProducts(products) {
		$('.product-card:first').remove();

		// append the product list
		products.slice(0, products.length/2)
			.forEach(renderProduct.bind(null, $tab));

		// enable the products dropdowns
		$('.dropdown').dropdown();
	}

	function renderProduct(container, product) {
		var $el = $productTmpl.clone();

		// append each attribute to the product
		$el
			.find('.product-extras span').html(product.get('time')).end()
			.find('.status').removeClass('sync not-sync')
				.toggleClass('sync', product.get('synced'))
				.toggleClass('not-sync', !product.get('synced'))
				.end()
			.find('.product-name').text(product.get('name')).end()
			.find('.product-id').text(product.get('barcode')).end()
			.find('.product-info .qty .val').text(product.get('qty')).end()
			.find('.product-info .stock .val').text(product.get('stock')).end()
			.find('.product-info .sold .val').text(product.get('sold'))
				.attr('data-add', product.get('soldPlus'))
				.end()
			.find('.product-info .scanned .val').text(product.get('scanned')).end()
			.find('.product-info .points .val').text(product.get('points')).end()
			.find('.product-info .updated .val').text(product.get('updated')).end();

		// add the element to dom
		container.append($el.css({display: 'flex'}));
		// enable touch gestures on item
		$el.hammer();
	}

	// fetch data and render the stats graph when we activate the "points" tab
	$('.tab-item[data-name="points"]').on('click', function(ev){
		$.getJSON('/data/stats.json').then(function(response) {
			stats.renderChart({data: response.data});
		});
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

	// enable swipeleft and swiperight on product items
	// show extras when swipe right and hide on swipe left
	$tab
		.hammer()
		.on("swiperight", '.product-card', toggleCardExtras.bind(0, true))
		.on("swipeleft", '.product-card', toggleCardExtras.bind(0, false));

	// show product items extras when clicking on a day on chart
	$('.chart-container').on('click', '.highcharts-axis-labels tspan', function(ev) {
		$('.chart-container .highcharts-axis-labels tspan')
			.not(ev.target)
			.css('fill', '').removeClass('active');

		$(ev.target).css('fill', '#6e8916').toggleClass('active');
		toggleCardExtras($(ev.target).hasClass('active'));
	});

	function toggleCardExtras(toggle) {
		$('.product-card').toggleClass('show-extra', toggle);
	}
});