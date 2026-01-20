/*
  Warnings:

  - The values [SULAYMANIAH,MOSUL,OTHER] on the enum `Location` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CarType" ADD VALUE 'CONVERTIBLE';
ALTER TYPE "CarType" ADD VALUE 'MINIVAN';
ALTER TYPE "CarType" ADD VALUE 'WAGON';
ALTER TYPE "CarType" ADD VALUE 'CROSSOVER';
ALTER TYPE "CarType" ADD VALUE 'SPORT';

-- AlterEnum
BEGIN;
CREATE TYPE "Location_new" AS ENUM ('ERBIL', 'SULAYMANIYAH', 'DUHOK', 'KIRKUK', 'BAGHDAD', 'BASRA', 'NINEVEH', 'ANBAR', 'NAJAF', 'KARBALA', 'BABYLON', 'DIYALA', 'DHI_QAR', 'MAYSAN', 'MUTHANNA', 'QADISIYAH', 'SALAHALDIN', 'WASIT', 'HALABJA');
ALTER TABLE "Car" ALTER COLUMN "location" TYPE "Location_new" USING ("location"::text::"Location_new");
ALTER TYPE "Location" RENAME TO "Location_old";
ALTER TYPE "Location_new" RENAME TO "Location";
DROP TYPE "public"."Location_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
