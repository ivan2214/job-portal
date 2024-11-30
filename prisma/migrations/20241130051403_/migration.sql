/*
  Warnings:

  - The values [EMPLOYER,EMPLOYEE] on the enum `RoleUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleUser_new" AS ENUM ('USER', 'COMPANY', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "RoleUser_new" USING ("role"::text::"RoleUser_new");
ALTER TYPE "RoleUser" RENAME TO "RoleUser_old";
ALTER TYPE "RoleUser_new" RENAME TO "RoleUser";
DROP TYPE "RoleUser_old";
COMMIT;
