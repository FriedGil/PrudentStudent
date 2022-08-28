import type { RequestHandler } from "@sveltejs/kit";
import { prismaClient } from "$lib/prisma";

export const GET: RequestHandler = async ({ request }) => {
  
  return new Response()
}