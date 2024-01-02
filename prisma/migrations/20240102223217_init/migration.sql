/*
  Warnings:

  - You are about to drop the column `record` on the `collection_notice` table. All the data in the column will be lost.
  - You are about to drop the column `remind` on the `collection_notice` table. All the data in the column will be lost.
  - You are about to drop the column `record` on the `develop_notice` table. All the data in the column will be lost.
  - You are about to drop the column `remind` on the `develop_notice` table. All the data in the column will be lost.
  - You are about to drop the column `record` on the `sell_notice` table. All the data in the column will be lost.
  - You are about to drop the column `remind` on the `sell_notice` table. All the data in the column will be lost.
  - You are about to drop the column `remindDate` on the `sell_notice` table. All the data in the column will be lost.
  - You are about to drop the column `record` on the `rent_notice` table. All the data in the column will be lost.
  - You are about to drop the column `remind` on the `rent_notice` table. All the data in the column will be lost.
  - You are about to drop the column `remindDate` on the `rent_notice` table. All the data in the column will be lost.
  - Added the required column `collection_record` to the `collection_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collection_remind` to the `collection_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `develop_feedback` to the `develop_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `develop_record` to the `develop_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notice_date` to the `sell_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sell_record` to the `sell_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sell_remind` to the `sell_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notice_date` to the `rent_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent_record` to the `rent_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rent_remind` to the `rent_notice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_collection_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "collection_id" INTEGER NOT NULL,
    "collection_remind" TEXT NOT NULL,
    "collection_record" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "remindDate" DATETIME NOT NULL,
    CONSTRAINT "collection_notice_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection_info" ("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_collection_notice" ("collection_id", "notice_id", "remindDate", "visitDate") SELECT "collection_id", "notice_id", "remindDate", "visitDate" FROM "collection_notice";
DROP TABLE "collection_notice";
ALTER TABLE "new_collection_notice" RENAME TO "collection_notice";
CREATE TABLE "new_develop_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "develop_record" TEXT NOT NULL,
    "develop_feedback" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "remindDate" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "develop_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_develop_notice" ("notice_id", "remindDate", "tenement_id", "visitDate") SELECT "notice_id", "remindDate", "tenement_id", "visitDate" FROM "develop_notice";
DROP TABLE "develop_notice";
ALTER TABLE "new_develop_notice" RENAME TO "develop_notice";
CREATE TABLE "new_sell_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sell_record" TEXT NOT NULL,
    "sell_remind" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "notice_date" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "sell_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sell_notice" ("notice_id", "tenement_id", "visitDate") SELECT "notice_id", "tenement_id", "visitDate" FROM "sell_notice";
DROP TABLE "sell_notice";
ALTER TABLE "new_sell_notice" RENAME TO "sell_notice";
CREATE TABLE "new_rent_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rent_record" TEXT NOT NULL,
    "rent_remind" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "notice_date" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "rent_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rent_notice" ("notice_id", "tenement_id", "visitDate") SELECT "notice_id", "tenement_id", "visitDate" FROM "rent_notice";
DROP TABLE "rent_notice";
ALTER TABLE "new_rent_notice" RENAME TO "rent_notice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
