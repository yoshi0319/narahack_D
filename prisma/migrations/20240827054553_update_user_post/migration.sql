/*
  Warnings:

  - You are about to drop the column `post_User` on the `Post` table. All the data in the column will be lost.
  - Added the required column `post_user` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_User",
ADD COLUMN     "post_user" INTEGER NOT NULL;
