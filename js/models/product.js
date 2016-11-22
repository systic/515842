define(['jquery'], function($) {
	function Product(data) {
		this.data = data || {};
	}

	Product.fetch = function() {
		var $def = new $.Deferred;

		$.getJSON('/data/products.json').then(function(response) {
			$def.resolve(response.data.map(function(product) {
				return new Product(product);
			}));
		});

		return $def.promise().then(function(products){
			Product.items = products;
			return products;
		});
	};

	Product.prototype.set = function(prop, value) {
		this.data[prop] = value;
		return this;
	};

	Product.prototype.get = function(prop) {
		return this.data[prop];
	};

	return Product;
});
