/*
  Warnings:

  - You are about to drop the column `notice_date` on the `collection_notice` table. All the data in the column will be lost.
  - You are about to drop the column `visit_date` on the `collection_notice` table. All the data in the column will be lost.
  - Added the required column `remindDate` to the `collection_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitDate` to the `collection_notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collection_notice` DROP COLUMN `notice_date`,
    DROP COLUMN `visit_date`,
    ADD COLUMN `remindDate` DATETIME(3) NOT NULL,
    ADD COLUMN `visitDate` DATETIME(3) NOT NULL;
