/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CategoryJob` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CategoryJob_name_key" ON "CategoryJob"("name");
