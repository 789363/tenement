/*
  Warnings:

  - You are about to drop the column `notice_date` on the `rent_notice` table. All the data in the column will be lost.
  - You are about to drop the column `rent_notice` on the `rent_notice` table. All the data in the column will be lost.
  - You are about to drop the column `rent_record` on the `rent_notice` table. All the data in the column will be lost.
  - You are about to drop the column `visit_date` on the `rent_notice` table. All the data in the column will be lost.
  - You are about to drop the column `notice_date` on the `sell_notice` table. All the data in the column will be lost.
  - You are about to drop the column `sell_notice` on the `sell_notice` table. All the data in the column will be lost.
  - You are about to drop the column `sell_record` on the `sell_notice` table. All the data in the column will be lost.
  - You are about to drop the column `visit_date` on the `sell_notice` table. All the data in the column will be lost.
  - You are about to drop the column `visit_date` on the `market_notice` table. All the data in the column will be lost.
  - You are about to drop the column `develop_feedback` on the `develop_notice` table. All the data in the column will be lost.
  - You are about to drop the column `develop_record` on the `develop_notice` table. All the data in the column will be lost.
  - You are about to drop the column `notice_date` on the `develop_notice` table. All the data in the column will be lost.
  - You are about to drop the column `visit_date` on the `develop_notice` table. All the data in the column will be lost.
  - Added the required column `record` to the `rent_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remind` to the `rent_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remindDate` to the `rent_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitDate` to the `rent_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `record` to the `sell_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remind` to the `sell_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remindDate` to the `sell_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitDate` to the `sell_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitDate` to the `market_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `record` to the `develop_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remind` to the `develop_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remindDate` to the `develop_notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitDate` to the `develop_notice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rent_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record" TEXT NOT NULL,
    "remind" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "remindDate" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "rent_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rent_notice" ("notice_id", "tenement_id") SELECT "notice_id", "tenement_id" FROM "rent_notice";
DROP TABLE "rent_notice";
ALTER TABLE "new_rent_notice" RENAME TO "rent_notice";
CREATE TABLE "new_sell_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record" TEXT NOT NULL,
    "remind" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "remindDate" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "sell_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sell_notice" ("notice_id", "tenement_id") SELECT "notice_id", "tenement_id" FROM "sell_notice";
DROP TABLE "sell_notice";
ALTER TABLE "new_sell_notice" RENAME TO "sell_notice";
CREATE TABLE "new_market_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "market_hint" TEXT NOT NULL,
    "market_remark" TEXT NOT NULL,
    "market_content" TEXT NOT NULL,
    "market_responses" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "market_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_market_notice" ("market_content", "market_hint", "market_remark", "market_responses", "notice_id", "tenement_id") SELECT "market_content", "market_hint", "market_remark", "market_responses", "notice_id", "tenement_id" FROM "market_notice";
DROP TABLE "market_notice";
ALTER TABLE "new_market_notice" RENAME TO "market_notice";
CREATE TABLE "new_develop_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "record" TEXT NOT NULL,
    "remind" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "remindDate" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "develop_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_develop_notice" ("notice_id", "tenement_id") SELECT "notice_id", "tenement_id" FROM "develop_notice";
DROP TABLE "develop_notice";
ALTER TABLE "new_develop_notice" RENAME TO "develop_notice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
