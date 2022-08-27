<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import type { LayoutServerData } from "./$types";
  export let data: LayoutServerData;

  onMount(async () => {
    if(data.user) goto("/home", { replaceState: true })
  })
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Prudent Student</h1>
      <p class="py-6">A lightweight and easy to use multipurpose educational tool.</p>
      <a href="/signup"><button class="btn btn-primary">Get Started</button></a>
    </div>
  </div>
</div>
