/*
  Warnings:

  - Added the required column `isDelete` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `isDelete` BOOLEAN NOT NULL;
