define(['jquery'], function($) {
	$.fn.dropdown = function() {
		$(this).each(function(_, dropdown){
			var $dropdown = $(dropdown),
				$label = $dropdown.find('.dropdown-label .label'),
				$items = $dropdown.find('.select-item'),
				toggle = function(toggle, ev) {
					if(ev && ev.preventDefault && !$(ev.target).closest('label').length) {
						ev.preventDefault();
					}

					$dropdown.toggleClass.call($dropdown, 'active', toggle);
					$dropdown.trigger('dropdown:toggle', {active: $dropdown.is('.active')});
				},
				toggleOff = toggle.bind(0, false),

				hideOnClick = function() {
					$(document).one('click', toggleOff);
				};

			// on dropdown click decide if the list will be shown or hidden
			$dropdown.on('click', function(ev) {
				if(!$(ev.target).closest('label').length){
					ev.preventDefault();
				}

				if($(ev.target).is('[type=radio]')) {
					// on radio-type dropdowns, display the selected value
					if($label.length) {
						$label.text($(ev.target).closest('.select-item').text().trim());
					}

					return;
				}

				toggle();
				if($dropdown.is('.active')) {
					setTimeout(hideOnClick);
				}
			});
		});
	}
});