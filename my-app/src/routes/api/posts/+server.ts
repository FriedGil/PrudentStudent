import type { RequestHandler } from "@sveltejs/kit";
import { prismaClient } from "$lib/prisma";
import { PostType } from "@prisma/client";

export const POST: RequestHandler = async ({ request }) => {
  const { classId } = await request.json();

  const posts = await prismaClient.post.create({
    data: {
      title: 'bee',
      desc: 'balls',
      classId: classId,
      postType: PostType.ANNOUNCEMENT
    }
  })

  return new Response(JSON.stringify({ post: posts }), { status: 200 });
}