<script lang="ts">
	export let errors: Record<string, any>;

	let class_name_field: string;

	import type { LayoutServerData } from '.svelte-kit/types/src/routes/$types';
	import { redirect } from '@sveltejs/kit';
	import { BadgeCheck, Icon } from 'svelte-hero-icons';
	export let data: LayoutServerData;
	let submitted = false;

	const create = async (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const class_name = formData.get('class_name');
		const user_id = data.user?.id;
		const response = await fetch('/classes/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				class_name: class_name,
				user_id: user_id
			})
		});
		console.log(response);
		if (response.ok) {
			class_name_field = '';
			submitted = true;
		}
	};
</script>

{#if submitted}
	<div class="m-4">
		<div class="alert alert-success mt-4 mr-4">
			<p><Icon src={BadgeCheck} size="20" class="ml-auto inline" />Successfully created class</p>
		</div>
	</div>
{/if}
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
							bind:value={class_name_field}
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
