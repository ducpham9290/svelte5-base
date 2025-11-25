declare module 'echarts-for-svelte' {
	import type { EChartsOption } from 'echarts';

	export class ECharts {
		option: EChartsOption;
		theme?: string | object;
		style?: string;
		chart?: any;
	}
}
