<script lang="ts">
	export let errors: { email: string; message: string };
	let email: string, password: string;
	const signup = async (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;
		form.submit();
	};
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Sign Up!</h1>
			<p class="py-6">Sign up now to join our revolution against the edutech establishment.</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form on:submit|preventDefault={signup} action="/signup" method="post">
          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Type here"
              class="input input-ghost w-full max-w-xs"
              bind:value={email}
            />
          </div>
          <div class="form-control">
            <label class="label" for="password">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type here"
              class="input input-ghost w-full max-w-xs"
              bind:value={password}
            />
          </div>
          <div class="form-control mt-6 mb-4">
            <button type="submit" class="btn btn-primary">Sign up</button>
          </div>
        </form>
				<p class="text-red-600">{errors?.message || ""}</p>
			</div>
		</div>
	</div>
</div>
