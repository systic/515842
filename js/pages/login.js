define(['jquery', 'user'], function($, user) {
	$('.login-btn').on('click', logUserIn);

	function logUserIn(ev) {
		ev.preventDefault();

		/////////////////////////////////////////////////
		// accepted "users" are "agent" and "retailer" //
		//            no password needed               //
		/////////////////////////////////////////////////
		var username = $('.login-form [name="username"]').val(),
			userRole = username === 'retailer' ? 'retailer' : (username === 'agent' ? 'agent' : null);
		;

		if(userRole === null) {
			return;
		}

		// save user role
		user.setRole(userRole).save();
		// redirect agent to agent dashboard, the other users to normal dashboard
		window.location.pathname = userRole === 'agent' ? '/dashboard-agent.html' : '/dashboard.html';
	}
});