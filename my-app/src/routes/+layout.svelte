<script lang="ts">
	import { Lucia } from 'lucia-sveltekit/client';
	import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Pru from '$lib/components/Pru.svelte';

  import type { LayoutServerData } from "./$types"
  export let data: LayoutServerData

</script>

<Lucia>
  <Nav userData={data} />
	<slot />
  <Footer />
  <Pru />
  
</Lucia>


