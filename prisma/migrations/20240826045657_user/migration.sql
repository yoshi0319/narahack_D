-- CreateTable
CREATE TABLE "Posts" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);
