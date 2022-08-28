/*
  Warnings:

  - A unique constraint covering the columns `[invite_id]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_invite_id_key" ON "Class"("invite_id");
