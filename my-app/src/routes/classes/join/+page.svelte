<script lang="ts">
	export let errors: Record<string, any>;

	let invite_field: string;

	import type { LayoutServerData } from '.svelte-kit/types/src/routes/$types';
	import { BadgeCheck, Icon, ArrowLeft } from 'svelte-hero-icons';
	export let data: LayoutServerData;
	let submitted = false;

	const create = async (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const invite = formData.get('invite');
		const user_id = data.user?.id;
		const response = await fetch('/classes/join', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				invite: invite,
				user_id: user_id
			})
		});

		if (response.ok) {
			invite_field = '';
			submitted = true;
		}
	};
</script>

{#if submitted}
	<div class="m-4">
		<div class="alert alert-success mt-4 mr-4">
			<p><Icon src={BadgeCheck} size="20" class="ml-auto inline" />Successfully joined a class!</p>
		</div>
	</div>
{/if}
<div class="hero min-h-screen bg-base-200 flex justify-center px-20">
	<div class="p-4 mr-4 inline-block">
		<a href="/classes">
			<Icon src={ArrowLeft} size="25" />
		</a>
	</div>
	<div class="hero-content flex-col lg:flex-row">
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form on:submit|preventDefault={create} action="/classes/create" method="post">
					<div class="form-control mb-4">
						<label class="label" for="invite">
							<span class="label-text">Invite code</span>
						</label>
						<input
							type="text"
							id="invite"
							name="invite"
							autocomplete="off"
							placeholder="Invite ID"
							class="input input-bordered input-primary w-full max-w-xs"
							bind:value={invite_field}
						/>
					</div>
					<div class="form-control mt-6 mb-4">
						<button type="submit" class="btn btn-primary">Join</button>
					</div>
				</form>
				<p class="text-red-600">{errors?.message || ''}</p>
			</div>
		</div>
		<div class="ml-6 text-center lg:text-left">
			<h1 class="text-5xl font-bold">Join a class!</h1>
			<p class="py-6 mb-2">Join a class with your fellow peers and collaborate together!</p>
			<p class="text-sm">
				Want to create a class? Click <a class="text-purple-500" href="/classes/create">here!</a>
			</p>
		</div>
	</div>
</div>
