<script lang="ts">
	import type { Post } from '@prisma/client';
  import { PostType } from "@prisma/client";
	export let posts: Post[];

	// Create a post data
	let postTitle: string;
	let postDesc: string;
	let postType: PostType;

	console.log(posts);
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
			<form>
				<div class="mb-4 form-control">
					<label class="label" for="postTitle"><span class="label-text">Title</span></label>
					<input
						type="text"
						placeholder="Homework.."
						class="input input-bordered w-full max-w-xs"
						bind:value={postTitle}
					/>
				</div>

				<div class="mb-4 form-control">
					<label class="label" for="postTitle"><span class="label-text">Description</span></label>
					<textarea
						bind:value={postDesc}
						class="textarea textarea-bordered"
						placeholder="Description"
					/>
				</div>

        <div class="mb-2 form-control">
          <select class="select select-bordered w-full max-w-xs">
            <option disabled selected>Post Type</option>
            <option value={PostType.ANNOUNCEMENT}>Announcement</option>
            <option value={PostType.ASSIGNMENT}>Assignment</option>
          </select>
        </div>

				<div class="modal-action">
					<label for="create-post-modal" class="text-base">
						<button class="btn">CREATE</button>
					</label>
				</div>
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
