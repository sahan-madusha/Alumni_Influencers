/*
  Warnings:

  - Added the required column `startDate` to the `Degree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Employment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "untilValide" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Degree" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Employment" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "License" ADD COLUMN     "untilValide" TIMESTAMP(3);
