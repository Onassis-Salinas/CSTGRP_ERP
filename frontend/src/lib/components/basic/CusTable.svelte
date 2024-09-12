<script>
	import { Card } from '../ui/card';
	import { Table } from '../ui/table';
</script>

<Card>
	<Table class="block max-h-[82lvh] overflow-auto">
		<slot><!-- optional fallback --></slot>
	</Table>
</Card>
