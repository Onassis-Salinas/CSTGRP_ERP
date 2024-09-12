<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { location } from './../../utils/location';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	function capitalize(string: string) {
		if (!string) return;
		if (string.length < 4) return string.toUpperCase();
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	afterNavigate(() => {
		if (browser) {
			location.set(window?.location?.pathname);
		}
	});
</script>

<header class="py-8">
	<div class="flex flex-col gap-2 ">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>Inicio</Breadcrumb.Item>
				{#if $location.split('/')[1]}
					<Breadcrumb.Separator></Breadcrumb.Separator>
					<Breadcrumb.Item>{capitalize($location.split('/')[1])}</Breadcrumb.Item>
				{/if}
				{#if $location.split('/')[2]}
					<Breadcrumb.Separator></Breadcrumb.Separator>
					<Breadcrumb.Item>{capitalize($location.split('/')[2])}</Breadcrumb.Item>
				{/if}
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<h3 class="text-xl font-semibold">
			{capitalize($location.split('/')[2]) || capitalize($location.split('/')[1]) || 'Inicio'}
		</h3>
	</div>
</header>
