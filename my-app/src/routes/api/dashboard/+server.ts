import type { RequestHandler } from "@sveltejs/kit";
import { prismaClient } from "$lib/prisma";

export const GET: RequestHandler = async ({ request }) => {
  const { classId } = await request.json();

  const posts = await prismaClient.class.findUnique({
    where: { id: classId },
    include: {
      posts: {
        include: {
          submissions: true
        }
      }
    }
  })

  return new Response()
}