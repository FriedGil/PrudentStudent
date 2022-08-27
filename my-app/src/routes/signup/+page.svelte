<script lang="ts">
  export let errors: { username: string, message: string };
  let username: string, password: string;
  const signin = async (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement
    form.submit();
  }

</script>

<div>

</div>
