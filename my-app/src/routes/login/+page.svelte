<script lang="ts">
	export let errors: { message: string };
	let email: string, password: string;
	const login = async (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;
		form.submit();
	};
  import type { LayoutServerData } from "../$types"

  export let data: LayoutServerData
  console.log(data)

</script>

<div class="hero min-h-screen bg-base-200 flex justify-center px-20">
	<div class="hero-content flex-col lg:flex-row-reverse">

		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form on:submit|preventDefault={login} action="/login" method="post">
					<div class="form-control mb-4">
						<label class="label" for="email">
							<span class="label-text">Email</span>
						</label>
						<input
							type="text"
							id="email"
							name="email"
              autocomplete="off"
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
						<button type="submit" class="btn btn-primary">Log in</button>
					</div>
				</form>
				<p class="text-red-600">{errors?.message || ''}</p>
			</div>

		</div>
    <div class="ml-6 text-center lg:text-left">
			<h1 class="text-5xl font-bold">Log in!</h1>
			<p class="py-6">Log in now to join our revolution against the edutech establishment.</p>
			<p class="text-md">Don&apos;t have an account? Sign up <a href="/signup" class="text-purple-500">here!</a></p>
		</div>
	</div>
</div>
