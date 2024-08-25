-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "link_User_id" INTEGER NOT NULL,
    "main_image" BYTEA,
    "sub1_image" BYTEA,
    "sub2_image" BYTEA,
    "title" TEXT NOT NULL,
    "categori" TEXT NOT NULL,
    "explain" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_password_key" ON "Users"("password");
