<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';
	import type { EChartsOption } from 'echarts';

	export let option: EChartsOption;
	export let width: string = '100%';
	export let height: string = '400px';
	export let theme: string | object = 'default';

	let chartContainer: HTMLDivElement;
	let chartInstance: echarts.ECharts | null = null;

	onMount(() => {
		if (chartContainer) {
			chartInstance = echarts.init(chartContainer, theme);
			chartInstance.setOption(option);

			// Handle window resize
			const handleResize = () => {
				if (chartInstance) {
					chartInstance.resize();
				}
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	onDestroy(() => {
		if (chartInstance) {
			chartInstance.dispose();
		}
	});

	// Update chart when option changes
	$: if (chartInstance && option) {
		chartInstance.setOption(option, true);
	}

	// Expose methods for external control
	export function getChartInstance() {
		return chartInstance;
	}

	export function resize() {
		if (chartInstance) {
			chartInstance.resize();
		}
	}
</script>

<div bind:this={chartContainer} style="width: {width}; height: {height};"></div>
