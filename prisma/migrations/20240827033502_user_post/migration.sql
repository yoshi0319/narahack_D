-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "create_user_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "mainImage" BYTEA,
    "sub1Image" BYTEA,
    "sub2Image" BYTEA,
    "create_post_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_code_key" ON "User"("code");
