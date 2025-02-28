<script lang="ts">
	import Chart from 'chart.js/auto';
	import { type ColorKeys, colors } from '../../utils/colors';
	import { browser } from '$app/environment';
	export let data: { value: number; name: string }[];
	export let label: string;

	let canvas: HTMLCanvasElement;

	$: maxValue = Math.max(...data.map((e) => e.value));

	const drawChart = () => {
		if (Chart.getChart(canvas)) {
			Chart.getChart(canvas)?.destroy();
		}

		console.log(data);

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

	$: if (data[0] && browser && canvas) drawChart();
</script>

<canvas bind:this={canvas} class="h-full max-h-96 w-full"></canvas>
