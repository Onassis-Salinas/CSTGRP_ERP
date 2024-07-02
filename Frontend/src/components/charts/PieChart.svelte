<script lang="ts">
    import { Chart } from "flowbite-svelte";
    import type { ApexOptions } from "apexcharts";

    export let data: any[];
    let options: ApexOptions;
    $: {
        options = {
            series: data.map((e) => parseInt(e.value)),
            labels: data.map((e) => e.name),

            // colors: ["#e3cdf5", "#c7d4f8", "#e16540", "#fbc766", "#e2e1de"],

            chart: {
                height: "100%",
                width: "100%",

                type: "pie",
            },
            stroke: {
                colors: ["primary"],
                lineCap: "round",
            },

            dataLabels: {
                enabled: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                },
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },

            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        };
    }
</script>

<Chart {options} />
