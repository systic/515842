/**
 * Reflect component
 * provide a way to keep the dom values syncronized with the json data
 * This component wants to be a simple/super light weight 2way data binding
 */
define(['jquery'], function($) {
	function Reflect() {
		var $pubsub = $({});

		/**
		 * register
		 * @param  {dom element} el
		 * @param  {string|function} method - the method to use be used to update and get the element's value
		 * @param  {object} obj      the object which will be bound to dom
		 * @param  {string} prop     the object property to be bound to dom
		 * @param  {function} onChange callback
		 */
		this.register = function(el, method, obj, prop, onChange) {
			var elVal;

			if(method === 'prop') {
				elVal = el[method].bind(el, prop);
			} else if(typeof method === 'function') {
				elVal = method;
			} else {
				elVal = el[method].bind(el);
			}

			// listen to object updates/changes
			$pubsub.on('update', function() {
				var newVal = obj.get(prop), oldVal = elVal();

				if(onChange && typeof onChange === 'function')  {
					onChange(newVal, oldVal);
				}

				if(newVal !== oldVal) {
					elVal(newVal);
				}
			});

			/**
			 * listen to dom changes/updates
			 */
			el.on('change input', function() { 
				obj.set(prop, elVal());
			});
		};

		this.update = function() {
			$pubsub.trigger('update');
		};
	}

	return Reflect;
});