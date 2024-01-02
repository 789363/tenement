/*
  Warnings:

  - You are about to drop the column `isDelete` on the `collection_notice` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `develop_notice` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `market_notice` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `rent_notice` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `sell_notice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `collection_notice` DROP COLUMN `isDelete`;

-- AlterTable
ALTER TABLE `develop_notice` DROP COLUMN `isDelete`;

-- AlterTable
ALTER TABLE `market_notice` DROP COLUMN `isDelete`;

-- AlterTable
ALTER TABLE `rent_notice` DROP COLUMN `isDelete`;

-- AlterTable
ALTER TABLE `sell_notice` DROP COLUMN `isDelete`;
