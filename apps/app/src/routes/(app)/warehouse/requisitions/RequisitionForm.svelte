<script lang="ts">
	import Label from '$lib/components/basic/Label.svelte';
	import Select from '$lib/components/basic/Select.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		Dialog,
		DialogBody,
		DialogContent,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { formatDate } from '$lib/utils/functions';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';

	export let show = false;
	export let selectedMovement: any;
	let areas: any[] = [];
	let formData: any;
	let jobs: any[] = [];

	$: if (show || true) setFormData();
	function setFormData() {
		formData = { ...selectedMovement };
		formData.petitioner = Cookies.get('username');
	}

	async function getJobs() {
		jobs = [];
		jobs = (
			await api.get('requisitions/jobs', {
				params: {
					code: selectedMovement.code
				}
			})
		).data;
	}

	$: if (selectedMovement?.code) getJobs();
	$: formData.necessary = jobs.reduce(
		(prev, v) => (v.selected ? prev + Number(v.amount) : prev),
		0
	);

	async function fetchOptions() {
		areas = (await api.get('/hrvarious/areas')).data;
	}

	async function handleSubmit() {
		await api.post('requisitions', {
			...formData,
			petitioner: Cookies.get('username'),
			jobIds: jobs.filter((v) => v.selected).map((v) => v.id)
		});
		showSuccess('Requisicion registrado');

		show = false;
	}

	const motives = [
		{ name: 'Producción', value: 'Producción' },
		{ name: 'Empaque', value: 'Empaque' },
		{ name: 'Corte de tela', value: 'Corte de tela' },
		{ name: 'Cortes varios', value: 'Cortes varios' }
	];

	onMount(() => {
		fetchOptions();
	});
</script>

<Dialog bind:open={show}>
	<DialogContent class="max-w-4xl">
		<DialogHeader>
			<DialogTitle>Requerir {selectedMovement?.code}</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<div class="mb-4 grid w-full grid-cols-3 gap-4">
				<Label name="Solicitante:">
					<Input bind:value={formData.petitioner} />
				</Label>
				<Label name="Motivo:">
					<Select items={motives} bind:value={formData.motive} />
				</Label>
				<Label name="Area:">
					<Select items={areas} bind:value={formData.areaId} />
				</Label>
				<Label name="Material necesario total:">
					<Input
						disabled
						value={formData.necessary + ' ' + formData.measurement}
						class="disabled:opacity-100"
					/>
				</Label>
				<Label name="Material requerido:" class="col-span-2">
					<Input bind:value={formData.requested} />
				</Label>
			</div>

			<Table>
				<TableHeader class="sticky top-0 border-t">
					<TableHead class="border-l">Programacion</TableHead>
					<TableHead>Job</TableHead>
					<TableHead>Due</TableHead>
					<TableHead>Cantidad</TableHead>
					<TableHead class="w-min max-w-2"></TableHead>
				</TableHeader>
				<TableBody>
					{#each jobs as row, i}
						<TableRow>
							<TableCell class="border-l">{row.programation}</TableCell>
							<TableCell>{row.jobpo}</TableCell>
							<TableCell>{formatDate(row.due)}</TableCell>
							<TableCell>{row.amount}</TableCell>
							<TableCell class="w-min max-w-2">
								<Checkbox bind:checked={jobs[i].selected} />
							</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>

			<Button on:click={handleSubmit} class="mt-4 w-full">Guardar cambios</Button>
		</DialogBody>
	</DialogContent>
</Dialog>
