<script lang="ts">
  import { Icon, Home, ViewList, Logout, AcademicCap } from "svelte-hero-icons";
  import { signOut } from "lucia-sveltekit/client";
  import type { LayoutServerData } from ".svelte-kit/types/src/routes/$types"

  export let userData: LayoutServerData;

  const signOutUser = () => {
    try {
      signOut().then(() => {
        window.location.replace("/"); // lucia moment
      })
    } catch (e) {
      console.log(e)
    }
  }


</script>

<div class="navbar bg-primary text-primary-content">
  <div class="dropdown">
    <div tabindex="0" class="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h7"
        /></svg
      >
    </div>
    <ul
      tabindex="0"
      class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary  rounded-box w-52"
    >
      <li><a href="/">Home <Icon src="{Home}" size="20" class="ml-auto inline" /> </a> </li>
      <li><a href="/about">About <Icon src="{ViewList}" size="20" class="ml-auto inline" /></a></li>
      {#if userData.user !== null}
        <li><a href="/classes">Classes <Icon src="{AcademicCap}" size="20" class="ml-auto linline" /></a></li>
        <li><a on:click={signOutUser}>Log out <Icon src="{Logout}" size="20" class="ml-auto inline" /></a></li>
      {/if}
    </ul>
  </div>
</div>
