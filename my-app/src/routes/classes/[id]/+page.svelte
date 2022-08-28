<script lang="ts">
  import { MemberStatus } from '@prisma/client';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let selectedTab = 'dash';
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
        <h2 class="card-title text-xl">{data.course_data?.students.filter((student) => student.status === MemberStatus.TEACHER).at(0)?.user.name}</h2>
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
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title mb-8">Christopher Ziegler</h2>
					<p>
						Hi all! See 2 documents attached to this announcement: PowerPoint presentation
						(information about the exam, what to bring, etc) and Room assignments. Each room has the
						range of last names starting from 1 last name and ending on some other last name. You
						have to figure out which interval you last name belongs. For example, Michael Smith will
						be taking the exam in room 303. If you would like to practice more, see the link below
						<a
							href="https://jmap.org/JMAPArchives/CurrentVersion/JMAPAII_REGENTS_BOOK_BY_PI_TOPIC.pdf"
							>https://jmap.org/JMAPArchives/CurrentVersion/JMAPAII_REGENTS_BOOK_BY_PI_TOPIC.pdf></a
						>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
