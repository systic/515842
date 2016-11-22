/**
 * Stats grpah/chart component
 * provide an easy way to render a statistics graph
 */
define(['jquery', 'highcharts'], function($) {
	var colors = {points: '#f4961c', sold: '#b6c023'},
		axis = {
			// axis labels that will be used
			weekly: { y: [], x: ['Sun 1', 'Mon 2', 'Tue 3', 'Wed 4', 'Thu 5', 'Fri 6','Sat 7', 'Sun 8'] },
			monthly: { y: [], x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] }
		}
	;

	// current state of the chart
	var chartData = {
		visible: {
			stat: 'points',
			rate: 'weekly'
		}
	};

	// chart configuration
	var chart, chartConfig = {
		title: {
			text: ''
		},
		xAxis: {
			labels: {
				rotation: 0,
				style: {
					fontSize: '9px',
					lineHeight: '9px',
					color: '#3d3d3d',
					fontFamily: 'Open Sans',
					opacity: 0.5
				}
			},
			lineColor:'#e3e3e3',
			tickLength: 0,
			categories: []
		},
		yAxis: {
			title: {
			    text: ''
			},
			labels: {
				rotation: 0,
				style: {
					fontSize: '9px',
					lineHeight: '9px',
					color: '#3d3d3d',
					fontFamily: 'Open Sans',
					opacity: 0.5
				}
			},
			gridLineColor: '#e3e3e3',
			gridLineDashStyle: 'Dot'
		},
		tooltip: {
			valueSuffix: '',
			borderRadius: '10px',
			borderWidth: 0,
			useHTML: true,
			headerFormat: '',
			pointFormat: '<span class="chart-badge">{point.y}</span>',
			positioner: function (labelWidth, labelHeight, point) {
                return {x: (point.plotX - 5), y: (point.plotY - 40)};
            },
			
		},
		chart: {
			spacingBottom: 0,
			spacingLeft: 0,
			spacingRight: 10,
			spacingTop: 5,
		},
		legend: {
			enabled: 0
		},
		colors: [],
		series: [{
			name: ' ',
			data: [],
			marker: {
				states: {
					hover: {
						enabled: false
					},
					select: {
						enabled: false
					}
				}
			},
			states: {
				hover: {
					enabled: false
				}
			},
			selected: true
		}]
	};

	/**
	 * updateChart update the chart based on current state
	 */
	function updateChart() {
		chart.update({
			xAxis: {categories: axis[chartData.visible.rate].x},
			series: [{data: chartData.data[chartData.visible.stat][chartData.visible.rate]}],
			colors: [colors[chartData.visible.stat]]
		});
	}

	/**
	 * create and append the graph to dom
	 */
	function renderChart(opts) {
		chartData.data = opts.data;

		chartConfig.xAxis.categories = axis[chartData.visible.rate].x;
		chartConfig.series[0].data = chartData.data[chartData.visible.stat][chartData.visible.rate];
		chartConfig.colors = [colors[chartData.visible.stat]];


		exp.chart = chart = Highcharts.chart('chart-container', chartConfig);
	}

	/**
	 * exposed methods
	 */
	var exp = {chart, data: chartData, renderChart, updateChart};
	return exp
});