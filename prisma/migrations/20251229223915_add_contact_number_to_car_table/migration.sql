/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "contactNumber" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneNumber",
ADD COLUMN     "phonNumber" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
