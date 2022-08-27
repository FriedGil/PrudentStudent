<script lang="ts">
	import { Lucia } from 'lucia-sveltekit/client';
	import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<Lucia>
  <Nav />
	<slot />
  <Footer />
</Lucia>
