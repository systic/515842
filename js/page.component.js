define(['jquery', 'user'], function($, user) {
	// listen for click on data-href and redirect to specific page
	$(document).on('click', '[data-href]', function(ev) {
		setTimeout(redr.bind(null, ev), 29);
	});

	// page redirect function
	function redr(ev) {
		if(ev.isDefaultPrevented()) {
			return;
		}

		window.location.href = $(ev.currentTarget).attr('data-href');
	}

	// load page scripts from meta attributes
	// this allows as to desync the load events, giving the user a better experience
	var page = $('meta[name=page]').attr('content');
	if(!page) {
		// ('No js loaded for this page,')
		// ('Please add \'<meta name="page" content="the-page-name">\' meta for this page!')
		return;
	}

	// listen for elements that need to show user attributes and bind user props to them
	$('[data-reflect-user]').each(function(i, input) {
		var $input = $(input),
			prop = $input.attr('data-reflect-user'),
			attr = $input.attr('data-reflect-attr'),
			fn = $.fn.val.bind($input)
		;

		if(attr) {
			fn = $.fn.attr.bind($input, attr);
		}  else if(!$input.is('input')) {
			fn = $.fn.html.bind($input);
		}

		user.reflect($input, prop, fn);
	});

	// finally load the page scripts
	requirejs(['pages/'+page]);
});