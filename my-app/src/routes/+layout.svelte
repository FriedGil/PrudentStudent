<script lang="ts">
	import { Lucia } from 'lucia-sveltekit/client';
	import '../app.css';
  import Nav from '$lib/components/nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  import type { LayoutServerData } from "./$types"
  export let data: LayoutServerData

</script>

<Lucia>
  <Nav userData={data} />
	<slot />
  <Footer />
</Lucia>
