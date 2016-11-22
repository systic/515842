define(['jquery', 'components/popup'], function($, Popup) {
	// auto-fill the selected user role in previous screen
	!function fillSelectedUserRole() {
		// get user role from hash
		var registerRole = window.location.hash.replace('#', '');

		// redirect to signup page if no role is provided
		if(!registerRole) {
			window.location.pathname = '/signup.html';
		}

		// fill the readonly input
		$('[name="role"]').val(registerRole);
	}();

	// on clicking "signup", first time show an error, second time show the success modal
	var invalid = true, popup = new Popup($('.register-success-popup'));
	$('.register-btn').on('click', function(ev){
		ev.preventDefault();

		$('.form-group.username').toggleClass('invalid', invalid);
		$('.register-form').toggleClass('invalid', invalid);

		if(invalid) {
			return invalid = false;
		}

		popup.show();
	});
});