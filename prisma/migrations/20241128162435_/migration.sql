/*
  Warnings:

  - You are about to drop the column `dateApplied` on the `Job` table. All the data in the column will be lost.
  - Added the required column `dateApplied` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "dateApplied" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "dateApplied";
