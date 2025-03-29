/*
  Warnings:

  - Added the required column `merchantId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantTransactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "merchantId" TEXT NOT NULL,
ADD COLUMN     "merchantTransactionId" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL;
