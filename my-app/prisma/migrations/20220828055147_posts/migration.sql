/*
  Warnings:

  - You are about to drop the column `classId` on the `Assignment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId]` on the table `Announcement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_classId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_classId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "postId" TEXT NOT NULL,
ALTER COLUMN "classId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "classId",
ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "classId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_classId_key" ON "Post"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Announcement_postId_key" ON "Announcement"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_postId_key" ON "Assignment"("postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
