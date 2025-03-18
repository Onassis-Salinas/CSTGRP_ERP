<script lang="ts">
	import { run } from 'svelte/legacy';

	import Chart from 'chart.js/auto';
	import { type ColorKeys, colors } from '../../utils/colors';
	import { browser } from '$app/environment';
	interface Props {
		color: ColorKeys;
		data: { value: number; name: string }[];
		label: any;
		maxValue?: number | undefined;
		stepSize?: number | undefined;
		minValue?: number | undefined;
	}

	let {
		color,
		data,
		label,
		maxValue = $bindable(undefined),
		stepSize = undefined,
		minValue = undefined
	}: Props = $props();
	let canvas: HTMLCanvasElement = $state();

	run(() => {
		if (!maxValue) maxValue = Math.max(...data.map((e) => e.value));
	});

	const drawChart = () => {
		if (Chart.getChart(canvas)) {
			Chart.getChart(canvas)?.destroy();
		}

		new Chart(canvas, {
			type: 'line',

			data: {
				labels: data.map((row) => row.name),
				datasets: [
					{
						label: label,
						data: data.map((row) => row.value),
						borderColor: colors[color].foreground,
						borderWidth: 2,
						backgroundColor: colors[color].DEFAULT,
						tension: 0.3,
						fill: true,
						pointRadius: 0,
						pointHoverRadius: 4,
						pointBackgroundColor: colors[color].foreground
					}
				]
			},

			options: {
				responsive: true,
				maintainAspectRatio: false,
				interaction: {
					intersect: false,
					axis: 'x'
				},
				layout: {},
				plugins: {
					legend: {
						display: false,
						position: 'top'
					},
					tooltip: {
						backgroundColor: '#fff',
						titleColor: '#111',
						bodyColor: '#555',

						bodyAlign: 'center',
						borderColor: '#eee',
						borderWidth: 1,
						mode: 'index',
						displayColors: true
					}
				},
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: '#333',
							display: false,
							font: {
								size: 12
							}
						}
					},
					y: {
						suggestedMax: maxValue ? maxValue + 1 : null,
						suggestedMin: minValue,
						grid: {
							color: '#eee'
						},
						ticks: {
							stepSize: stepSize,
							color: '#6b7280'
						}
					}
				}
			}
		});
	};

	run(() => {
		if (data[0] && browser && canvas) drawChart();
	});
</script>

<canvas bind:this={canvas} class="h-full max-h-96 w-full"></canvas>
