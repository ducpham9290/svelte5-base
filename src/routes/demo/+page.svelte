<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import type { EChartsOption } from 'echarts';

	// Line Chart Data
	const lineChartOption: EChartsOption = {
		title: {
			text: 'Sales Trend',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['Sales', 'Profit'],
			top: 'bottom'
		},
		xAxis: {
			type: 'category',
			data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: 'Sales',
				type: 'line',
				data: [120, 200, 150, 80, 70, 110],
				smooth: true
			},
			{
				name: 'Profit',
				type: 'line',
				data: [60, 100, 75, 40, 35, 55],
				smooth: true
			}
		]
	};

	// Bar Chart Data
	const barChartOption: EChartsOption = {
		title: {
			text: 'Monthly Revenue',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: 'Revenue',
				type: 'bar',
				data: [120, 200, 150, 80, 70, 110, 130],
				itemStyle: {
					color: '#5470c6'
				}
			}
		]
	};

	// Pie Chart Data
	const pieChartOption: EChartsOption = {
		title: {
			text: 'Market Share',
			left: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b}: {c} ({d}%)'
		},
		legend: {
			orient: 'vertical',
			left: 'left'
		},
		series: [
			{
				name: 'Market Share',
				type: 'pie',
				radius: '50%',
				data: [
					{ value: 1048, name: 'Product A' },
					{ value: 735, name: 'Product B' },
					{ value: 580, name: 'Product C' },
					{ value: 484, name: 'Product D' },
					{ value: 300, name: 'Product E' }
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};

	// Area Chart Data
	const areaChartOption: EChartsOption = {
		title: {
			text: 'Website Traffic',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross'
			}
		},
		legend: {
			data: ['Visitors', 'Page Views'],
			top: 'bottom'
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: 'Visitors',
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: 'Page Views',
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				data: [220, 182, 191, 234, 290, 330, 310]
			}
		]
	};
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-8 text-center text-3xl font-bold">ECharts Demo</h1>

	<div class="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Line Chart</h2>
			<Chart option={lineChartOption} height="300px" />
		</div>

		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Bar Chart</h2>
			<Chart option={barChartOption} height="300px" />
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Pie Chart</h2>
			<Chart option={pieChartOption} height="400px" />
		</div>

		<div class="rounded-lg bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Area Chart</h2>
			<Chart option={areaChartOption} height="400px" />
		</div>
	</div>

	<div class="mt-8 text-center">
		<h2 class="mb-4 text-2xl font-semibold">Other Demos</h2>
		<div class="space-x-4">
			<a
				href="/demo/paraglide"
				class="inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
			>
				Paraglide Demo
			</a>
			<a
				href="/demo/lucia"
				class="inline-block rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
			>
				Lucia Auth Demo
			</a>
			<a
				href="/cyclone"
				class="inline-block rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600"
			>
				Cyclone Animation Demo
			</a>
		</div>
	</div>
</div>
