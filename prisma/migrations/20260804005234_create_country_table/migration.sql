-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "countryCode" VARCHAR(8) NOT NULL,
    "countryName" VARCHAR(100) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);
