<script lang="ts">
  export let errors: Record<string, any>;

  import type { LayoutServerData } from ".svelte-kit/types/src/routes/$types"
  export let data: LayoutServerData

  const create = async (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form)
		const class_name = formData.get("class_name")
		const user_id = data.user?.id;
		await fetch("/classes/create", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			redirect: "follow",
			body: JSON.stringify({
				class_name: class_name,
				user_id: user_id
			})
		})
	};
</script>

<div class="hero min-h-screen bg-base-200 flex justify-center px-20">
	<div class="hero-content flex-col lg:flex-row">
		<div class="ml-6 text-center lg:text-left">
			<h1 class="text-5xl font-bold">Create your own class!</h1>
			<p class="py-6">Lead your own merry band of students to enlightenment.</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form on:submit|preventDefault={create} action="/classes/create" method="post">
					<div class="form-control mb-4">
						<label class="label" for="class_name">
							<span class="label-text">Class Name</span>
						</label>
						<input
							type="text"
							id="class_name"
							name="class_name"
							autocomplete="off"
							placeholder="Class"
							class="input input-bordered input-primary w-full max-w-xs"
						/>
					</div>
					<div class="form-control mt-6 mb-4">
						<button type="submit" class="btn btn-primary">Create</button>
					</div>
				</form>
				<p class="text-red-600">{errors?.message || ''}</p>
			</div>
		</div>
	</div>
</div>
