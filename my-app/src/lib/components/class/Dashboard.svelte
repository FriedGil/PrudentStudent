<script lang="ts">
	import type { Post, PostType } from '@prisma/client';
	export let posts: Post[];
  export let classId: string;

	// Create a post data
	let postTitle: string;
	let postDesc: string;
	let postType: PostType;
  let error: string;

	const createPost = async (e: SubmitEvent) => {
    e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const formPostTitle = formData.get('postTitle');
    const formPostDesc = formData.get('postDesc');
    const formPostType = formData.get('postType');

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        classId,
        formPostTitle,
        formPostDesc,
        formPostType
      })
    })
    
    const data = await response.json();
    if(data.error) {
      error = data.error 
    }

	};
</script>

<div class="flex flex-col">
	<div class="inline-block mb-4">
		<label for="create-post-modal" class="btn mx-2 primary-btn">+</label>
	</div>
	<input type="checkbox" id="create-post-modal" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box relative">
			<label for="create-post-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
			<h3 class="font-bold text-lg mb-6">Create a post</h3>
				<form on:submit|preventDefault={createPost} method="post">
				<div class="mb-4 form-control">
					<label class="label" for="postTitle"><span class="label-text">Title</span></label>
					<input
						type="text"
						placeholder="Homework.."
						id="postTitle"
						name="postTitle"
						class="input input-bordered w-full max-w-xs"
            autocomplete="off"
						bind:value={postTitle}
					/>
				</div>

				<div class="mb-4 form-control">
					<label class="label" for="postDesc"><span class="label-text">Description</span></label>
					<textarea
						bind:value={postDesc}
						id="postDesc"
						name="postDesc"
						class="textarea textarea-bordered"
						placeholder="Description"
					/>
				</div>

				<div class="mb-2 form-control">
					<select
						bind:value={postType}
						id="postType"
						name="postType"
						class="select select-bordered w-full max-w-xs"
					>
						<option disabled selected>Post Type</option>
						<option value="announcement">Announcement</option>
						<option value="assignment">Assignment</option>
					</select>
				</div>

				<div class="modal-action">
					<label for="create-post-modal" class="text-base">
						<button type="submit" class="btn">CREATE</button>
					</label>
				</div>
        <p class="my-3 text-red-500">{error || ''}</p>
			</form>
		</div>
	</div>

	<!-- 
<button on:click={async () => {
const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        classId: "classId"
      })
    });
}}></button> -->
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title mb-8">Christopher Ziegler</h2>
			<p>
				Hi all! See 2 documents attached to this announcement: PowerPoint presentation (information
				about the exam, what to bring, etc) and Room assignments. Each room has the range of last
				names starting from 1 last name and ending on some other last name. You have to figure out
				which interval you last name belongs. For example, Michael Smith will be taking the exam in
				room 303. If you would like to practice more, see the link below
				<a href="https://jmap.org/JMAPArchives/CurrentVersion/JMAPAII_REGENTS_BOOK_BY_PI_TOPIC.pdf"
					>https://jmap.org/JMAPArchives/CurrentVersion/JMAPAII_REGENTS_BOOK_BY_PI_TOPIC.pdf></a
				>
			</p>
		</div>
	</div>
</div>
