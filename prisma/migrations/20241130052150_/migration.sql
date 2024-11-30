/*
  Warnings:

  - Made the column `companyUserId` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_companyUserId_fkey";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "companyUserId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyUserId_fkey" FOREIGN KEY ("companyUserId") REFERENCES "Company"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
