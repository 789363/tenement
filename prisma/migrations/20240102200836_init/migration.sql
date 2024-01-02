/*
  Warnings:

  - You are about to drop the column `collection_notice` on the `collection_notice` table. All the data in the column will be lost.
  - You are about to drop the column `collection_record` on the `collection_notice` table. All the data in the column will be lost.
  - Added the required column `record` to the `collection_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remind` to the `collection_notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collection_notice` DROP COLUMN `collection_notice`,
    DROP COLUMN `collection_record`,
    ADD COLUMN `record` VARCHAR(191) NOT NULL,
    ADD COLUMN `remind` VARCHAR(191) NOT NULL;
