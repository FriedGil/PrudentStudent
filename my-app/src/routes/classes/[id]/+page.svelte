<script lang="ts">
	import Dashboard from '$lib/components/class/Dashboard.svelte';
	import { MemberStatus } from '@prisma/client';
	import type { ClassMember, Post } from '@prisma/client';

	import type { PageServerData } from './$types';
	import { softmax } from '@tensorflow/tfjs-core';

	export let data: PageServerData;
	let selectedTab = 'dash';
	const teacher = data.course_data?.students
		.filter((student) => student.status === MemberStatus.TEACHER)
		.at(0);

	const posts = data?.course_data?.posts as Post[];
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
		<label for="create-post-modal" class="btn mx-2 primary-btn">+</label>
		<input type="checkbox" id="create-post-modal" class="modal-toggle" />
		<div class="modal">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Create a post</h3>
				<p class="py-4">
					You've been selected for a chance to get one year of subscription to use Wikipedia for
					free!
				</p>
				<div class="modal-action">
					<label for="create-post-modal" class="btn">Yay!</label>
				</div>
			</div>
		</div>

		<div class="bg-base-200 p-2 pb-8 flex justify-center">
			<Dashboard {posts} />
		</div>
	</div>
</div>
