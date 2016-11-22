define([
	'jquery',
	'models/product',
	'jqHammerjs',
	'components/tabs',
	'components/side-menu',
	'components/dropdown',
	'components/floating-menu',
	'components/card'
], function($, Product) {
	// add the floating menu interactions
	$('.floating-menu').floatingMenu();

	/* Fetch and render page products  */
	Product.fetch().then(renderProducts);

	/**
	 * Prepare the page tabs
	 */
	var $tabs = $('.tab-content'),
		$productTmpl = $('.product-card:first');

	// loop through the products list
	// and append the to dom
	function renderProducts(products) {
		$('.product-card:first').remove();

		// append the product list to each page tab
		// only append some items to last tabs
		$tabs.each(function(i, tab) {
			products.slice(0, i===0?-1:products.length/2)
				.forEach(renderProduct.bind(null, $(tab)));
		});

		// enable the products dropdowns
		$('.dropdown').dropdown();
	}

	function renderProduct(container, product) {
		var $el = $productTmpl.clone();

		// append each attribute to the product
		$el
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
	}

	/* Toggle between list and summary view */
	var $toggleViewBtns = $('.toggle-tile-view');
	$toggleViewBtns.on('click', toggleTileView);

	function toggleTileView(ev) {
		$toggleViewBtns.toggle();

		$('.product-card').toggleClass('summary-view');
	}

	/* swipe down to reveal search bar */
	var $pageContent = $('.page-content').hammer(),
		$searchBar = $('.search-bar').hammer();

	// enable "swipedown" gesture on pageContent and searchbar
	if($pageContent.data('hammer')) {
		$pageContent.data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	}

	if($searchBar.data('hammer')) {
		$searchBar.data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	}

	// listen for swipedown, if scrollTop is 0 on active tab, show the search input
	$pageContent.bind('swipedown', function(e) {
		if($('.tab-content.active').scrollTop() === 0) {
			$searchBar.addClass('visible');
			e.preventDefault();
		}
	});

	// listen for swipeup on the searchbar to hide it
	$searchBar.bind('swipeup', function(e) {
		$searchBar.removeClass('visible');
	});
});