import type { RequestHandler } from '@sveltejs/kit';
import { prismaClient } from '$lib/prisma';
import { PostType } from '@prisma/client';

export const POST: RequestHandler = async ({ request }) => {
  const { classId, formPostTitle, formPostDesc, formPostType } = await request.json();
  if (!formPostTitle || !formPostDesc || !formPostType) return new Response(JSON.stringify({ error: "Invalid input" }), { status: 500 })

  const post = await prismaClient.post.create({
    data: {
      classId: classId,
      title: formPostTitle,
      desc: formPostDesc,
      postType: formPostType === "announcement" ? PostType.ANNOUNCEMENT : PostType.ASSIGNMENT
    }
  });

  return new Response(JSON.stringify({ post }), { status: 200 });
};
