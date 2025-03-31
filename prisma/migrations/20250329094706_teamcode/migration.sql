/*
  Warnings:

  - A unique constraint covering the columns `[teamCode]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "teamCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Registration_teamCode_key" ON "Registration"("teamCode");
