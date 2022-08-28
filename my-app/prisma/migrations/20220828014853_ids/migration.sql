/*
  Warnings:

  - Added the required column `classId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_studentId_fkey";

-- DropIndex
DROP INDEX "ClassMember_userId_key";

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "classId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_studentId_classId_fkey" FOREIGN KEY ("studentId", "classId") REFERENCES "ClassMember"("userId", "classId") ON DELETE RESTRICT ON UPDATE CASCADE;
