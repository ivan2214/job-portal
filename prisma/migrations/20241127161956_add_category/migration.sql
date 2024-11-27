-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "categoryJobId" TEXT;

-- CreateTable
CREATE TABLE "CategoryJob" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_categoryJobId_fkey" FOREIGN KEY ("categoryJobId") REFERENCES "CategoryJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
