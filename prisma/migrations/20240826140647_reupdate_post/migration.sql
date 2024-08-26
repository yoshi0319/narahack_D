/*
  Warnings:

  - You are about to drop the column `mainImage` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `sub1Image` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `sub2Image` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "mainImage",
DROP COLUMN "sub1Image",
DROP COLUMN "sub2Image";
