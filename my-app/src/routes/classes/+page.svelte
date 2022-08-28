<script lang="ts">
  	import type { PageServerData } from "./$types"

	interface ClassCard {
		name: string,
		teacher: string,
		route: string
	}

	//Replace with classes query for user
	let classes: ClassCard[] = [];
	export let data: PageServerData;
	console.log(data);
	data.classes?.forEach(clas => {
		classes.push({ name: clas.name, teacher: clas.students[0].user.name!, route: 'abcd'})
	});
</script>

<div class=" bg-base-200">
	<h1 class="text-5xl font-bold bg-base-200 text-center pt-16">Classes</h1>

	<a href="/classes/join"><button class="btn ml-16 mt-12 text-2xl">+</button></a>

	<div class=" min-h-screen">
		<div class="grid grid-cols-4 gap-4 mt-16 px-16">
			{#each classes as school_class}
				<div class="card w-96 bg-base-100 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">{school_class.name}</h2>
						<h2 class="card-subtitle">{school_class.teacher}</h2>
						<div class="card-actions justify-end">
							<a href="/{school_class.route}"><button class="btn btn-primary">Open</button></a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
