/**
 * The user model
 * it should be used to fetch data from json and decide what role does the current user hsa
 */
define(['jquery', 'components/reflect'], function($, Reflect) {
	function User() {
		this.data = {
			role: sessionStorage.getItem('userRole')
		};

		this.ch = new Reflect();
		this.fetchData();
	}

	User.prototype.fetchData = function() {
		var user = this, role = user.getRole();

		$.getJSON('/data/users.json').then(function(response) {
			var currentUser = (response.data.filter(function(u) {
				return u.role === role;
			}) || [])[0];

			$.extend(user.data, currentUser);
			user.save();
		});
	};

	User.prototype.save = function() {
		sessionStorage.setItem('userRole', this.data.role);

		this.ch.update();
		return this;
	};

	User.prototype.set = function(prop, value) {
		this.data[prop] = value;
		this.ch.update();
		return this;
	};

	User.prototype.get = function(prop) {
		return this.data[prop];
	};

	User.prototype.setRole = function(role) {
		return this.set('role', role);
	};

	User.prototype.getRole = function() {
		return this.data.role;
	};

	/**
	 * bind a property from user to a dom element
	 * @param  {dom element} el
	 * @param  {string} prop   the property to bind
	 * @param  {string|function} method the method to be used to display the data
	 */
	User.prototype.reflect = function(el, prop, method) {
		this.ch.register(el, method, this, prop);
	};

	return new User;
});
