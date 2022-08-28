<script lang="ts">
	import Dashboard from '$lib/components/class/Dashboard.svelte';
	import { MemberStatus } from '@prisma/client';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let selectedTab = 'dash';
	const teacher = data.course_data?.students
		.filter((student) => student.status === MemberStatus.TEACHER)
		.at(0);
	// console.log(data)
</script>

<div class="bg-base-200">
	<div class="container mx-auto px-32">
		<div class="card image-full p-8 flex justify-center">
			<figure>
				<img
					src="https://assets.weforum.org/article/image/large_fhmECszKQviVxia50gCOWPGxi-GKqITRk7sYoMHa7hw.jpg"
					alt="classroom"
				/>
			</figure>
			<div class="card-body">
				<h1 class="card-title text-4xl">{data.course_data?.name}</h1>
				<h2 class="card-title text-xl">
					{teacher?.user.name}
				</h2>
			</div>
		</div>
		<div class="tabs my-4 flex items-center justify-center text-lg">
			<a
				class={`tab tab-bordered ${selectedTab === 'dash' ? 'tab-active' : ''}`}
				on:click={() => {
					selectedTab = 'dash';
				}}>Dashboard</a
			>
			<a
				class={`tab tab-bordered ${selectedTab === 'people' ? 'tab-active' : ''}`}
				on:click={() => {
					selectedTab = 'people';
				}}>People</a
			>
			<a
				class={`tab tab-bordered ${selectedTab === 'settings' ? 'tab-active' : ''}`}
				on:click={() => {
					selectedTab = 'settings';
				}}>Settings</a
			>
		</div>
		<div class="bg-base-200 p-2 pb-8 flex justify-center">
			<Dashboard />
		</div>
	</div>
</div>
