import type { RequestHandler } from "@sveltejs/kit";
import { prismaClient } from "$lib/prisma";

export const POST: RequestHandler = async ({ request }) => {
  const { classId } = await request.json();

  const posts = await prismaClient.post.findMany({
    where: { id: classId },
    include: {
      submissions: true
    }
  })

  return new Response(JSON.stringify({ post: posts }), { status: 200 });
}