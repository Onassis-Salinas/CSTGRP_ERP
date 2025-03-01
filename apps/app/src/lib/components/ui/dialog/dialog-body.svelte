<script lang="ts">
	import { cn } from '$lib/utils.js';
	let className = '';
	export { className as class };
</script>

<div class={cn('max-h-[85lvh] overflow-auto scroll-auto border-t p-6', className)}>
	<slot></slot>
</div>
