/*
  Warnings:

  - Added the required column `invite_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "invite_id" TEXT NOT NULL;
