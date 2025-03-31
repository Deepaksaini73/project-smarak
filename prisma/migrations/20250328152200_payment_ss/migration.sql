/*
  Warnings:

  - You are about to drop the column `merchantId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `merchantTransactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `paymentScreenshot` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "merchantId",
DROP COLUMN "merchantTransactionId",
DROP COLUMN "transactionId",
ADD COLUMN     "paymentScreenshot" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';
