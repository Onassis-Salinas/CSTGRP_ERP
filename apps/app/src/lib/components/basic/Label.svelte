<script lang="ts">
	import { cn } from '$lib/utils';

	let className = '';
	export let name: string;
	export { className as class };
</script>

<div class={cn('flex flex-col gap-1', className)}>
	<span class="pl-0.5 text-xs text-[#5c5e63]">
		{name}
	</span>
	<slot />
</div>
