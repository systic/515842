requirejs.config({
	baseUrl: 'js',

	paths: {
		jquery: '../node_modules/jquery/dist/jquery',
		hammerjs: '../node_modules/hammerjs/hammer',
		jqHammerjs: '../node_modules/jquery-hammerjs/jquery.hammer',
		highcharts: '../node_modules/highcharts/highcharts'
	},

	map: {
	  '*': { 'jquery': 'jquery-private' },
      'jquery-private': { 'jquery': 'jquery' }
	}
});

// add the userRole as a view class on the body
document.body.classList.add(sessionStorage.getItem('userRole')+'-view');
// load the page scripts, always load jquery
requirejs(['jquery', 'page.component']);