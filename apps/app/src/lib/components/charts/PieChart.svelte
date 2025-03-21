<script lang="ts">
	import { run } from 'svelte/legacy';
	import Chart from 'chart.js/auto';
	import { type ColorKeys, colors } from '../../utils/colors';
	import { browser } from '$app/environment';
	interface Props {
		data: { value: number; name: string }[];
		label: string;
	}

	let { data, label }: Props = $props();

	let canvas: HTMLCanvasElement = $state();

	let maxValue = $derived(Math.max(...data.map((e) => e.value)));

	const drawChart = () => {
		if (Chart.getChart(canvas)) {
			Chart.getChart(canvas)?.destroy();
		}

		new Chart(canvas, {
			type: 'doughnut',

			data: {
				labels: data.map((row) => row.name),
				datasets: [
					{
						label: label,
						data: data.map((row) => row.value),
						backgroundColor: Object.keys(colors).map((key) => colors[key].balanced)
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
						display: true,
						position: 'bottom'
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
				}
			}
		});
	};

	run(() => {
		if (data[0] && browser && canvas) drawChart();
	});
</script>

<canvas bind:this={canvas} class="max-h-[calc(100%-1.5rem)] w-full"></canvas>
