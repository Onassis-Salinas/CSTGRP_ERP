<script lang="ts">
    import type { ApexOptions } from "apexcharts";
    import { Chart } from "flowbite-svelte";
    export let name: string;
    export let data: { value: number; name: string }[];

    let options: ApexOptions;

    $: options = {
        chart: {
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        markers: {
            size: 4,
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 4,
        },
        grid: {
            show: true,
            strokeDashArray: 0,
            padding: {
                left: 15,
                right: 0,
                top: 0,
            },
        },
        series: [
            {
                name: name,
                data: data.map((e) => e.value),
                color: "#6e43c2",
            },
        ],
        xaxis: {
            categories: data.map((e) => e.name),
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            labels: {
                formatter: function (value) {
                    return value + "%";
                },
            },
        },
    };
</script>

<Chart {options} />
