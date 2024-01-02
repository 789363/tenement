-- CreateTable
CREATE TABLE "tenement_info" (
    "tenement_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "tenement_no" INTEGER NOT NULL,
    "tenement_face" TEXT NOT NULL,
    "Total_rating" INTEGER NOT NULL,
    "main_building" INTEGER NOT NULL,
    "affiliated_building" INTEGER NOT NULL,
    "public_buliding" INTEGER NOT NULL,
    "management_fee" INTEGER NOT NULL,
    "tenement_status" INTEGER NOT NULL,
    "tenement_type" INTEGER NOT NULL,
    "tenement_photo" TEXT NOT NULL,
    "tenement_floor" INTEGER NOT NULL,
    "tenement_style" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "tenement_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rent_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rent_record" TEXT NOT NULL,
    "rent_notice" TEXT NOT NULL,
    "visit_date" DATETIME NOT NULL,
    "notice_date" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "rent_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sell_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sell_record" TEXT NOT NULL,
    "sell_notice" TEXT NOT NULL,
    "visit_date" DATETIME NOT NULL,
    "notice_date" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "sell_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "develop_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "develop_record" TEXT NOT NULL,
    "develop_feedback" TEXT NOT NULL,
    "visit_date" DATETIME NOT NULL,
    "notice_date" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "develop_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "market_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "market_hint" TEXT NOT NULL,
    "market_remark" TEXT NOT NULL,
    "market_content" TEXT NOT NULL,
    "market_responses" TEXT NOT NULL,
    "visit_date" DATETIME NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    CONSTRAINT "market_notice_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "collection_notice" (
    "notice_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "collection_id" INTEGER NOT NULL,
    "remind" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "visitDate" DATETIME NOT NULL,
    "remindDate" DATETIME NOT NULL,
    CONSTRAINT "collection_notice_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection_info" ("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rent_info" (
    "rent_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner_name" TEXT NOT NULL,
    "owner_phone" TEXT NOT NULL,
    "owner_telephone" TEXT NOT NULL,
    "owner_line" TEXT NOT NULL,
    "owner_remittance" TEXT NOT NULL,
    "rental" INTEGER NOT NULL,
    "deposit" INTEGER NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "rent_info_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sell_info" (
    "sell_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner_name" TEXT NOT NULL,
    "owner_phone" TEXT NOT NULL,
    "owner_telephone" TEXT NOT NULL,
    "owner_line" TEXT NOT NULL,
    "owner_remittance" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "sell_info_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "develop_info" (
    "develop_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner_name" TEXT NOT NULL,
    "owner_phone" TEXT NOT NULL,
    "owner_telephone" TEXT NOT NULL,
    "owner_line" TEXT NOT NULL,
    "owner_remittance" TEXT NOT NULL,
    "rental" INTEGER NOT NULL,
    "deposit" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "develop_info_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "market_info" (
    "market_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "owner_name" TEXT NOT NULL,
    "owner_phone" TEXT NOT NULL,
    "owner_telephone" TEXT NOT NULL,
    "owner_line" TEXT NOT NULL,
    "owner_demand" TEXT NOT NULL,
    "owner_want" TEXT NOT NULL,
    "min_budget" INTEGER NOT NULL,
    "max_budget" INTEGER NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "market_info_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "buyer_info" (
    "buyer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_date" TEXT NOT NULL,
    "delivery_date" TEXT NOT NULL,
    "buyer_name" TEXT NOT NULL,
    "buyer_phone" TEXT NOT NULL,
    "buyer_jobtitle" TEXT NOT NULL,
    "buyer_idcard_image" TEXT NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "buyer_info_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "renter_info" (
    "renter_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "renter_name" TEXT NOT NULL,
    "renter_phone" TEXT NOT NULL,
    "renter_jobtitle" TEXT NOT NULL,
    "guarantor_name" TEXT NOT NULL,
    "guarantor_phone" TEXT NOT NULL,
    "renter_idcard_image" TEXT NOT NULL,
    "renter_agreement" TEXT NOT NULL,
    "tenement_id" INTEGER NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "renter_info_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "collection_info" (
    "collection_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenement_id" INTEGER NOT NULL,
    "collection_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "payment" TEXT NOT NULL,
    "collection_remark" TEXT NOT NULL,
    "remittance_bank" TEXT NOT NULL,
    "remittance_account" TEXT NOT NULL,
    "isDelete" BOOLEAN NOT NULL,
    CONSTRAINT "collection_info_tenement_id_fkey" FOREIGN KEY ("tenement_id") REFERENCES "tenement_info" ("tenement_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "isadmin" BOOLEAN NOT NULL,
    "isDelete" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_email_key" ON "user"("user_email");
