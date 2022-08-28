<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
    console.log(data);
</script>
<h1 class="text-6xl">{data.post.title}</h1>
<p>{data.post.desc}</p>