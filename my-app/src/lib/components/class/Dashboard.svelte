<script lang="ts">
	import type { Post } from '@prisma/client';
  export let posts: Post[];

  console.log(posts)
</script>

<button on:click={async () => {
const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        classId: "classId"
      })
    });
}}></button>
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
