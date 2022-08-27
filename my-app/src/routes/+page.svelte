<script lang="ts">
  import { getSession } from "lucia-sveltekit/client";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  const lucia = getSession();
  onMount(async () => {
    if(lucia) goto("/home", { replaceState: true })
  })
</script>

