-- AlterTable
ALTER TABLE "Country" ADD CONSTRAINT "Country_countryCode_key" UNIQUE ("countryCode");

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamName" VARCHAR(100) NOT NULL,
    "teamCode" VARCHAR(10) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "clientName" VARCHAR(100) NOT NULL,
    "clientCode" VARCHAR(10) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "team" VARCHAR(100) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Active',
    "password" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "ticketNo" VARCHAR(30) NOT NULL,
    "client" VARCHAR(100) NOT NULL,
    "ticketDate" VARCHAR(20) NOT NULL,
    "deliveryDate" VARCHAR(20) NOT NULL,
    "team" VARCHAR(100) NOT NULL,
    "requestedBy" VARCHAR(100) NOT NULL,
    "assignTo" VARCHAR(100) NOT NULL,
    "sprint" VARCHAR(50) NOT NULL,
    "ticketStatus" VARCHAR(30) NOT NULL DEFAULT 'Open',
    "description" VARCHAR(500) NOT NULL,
    "owner" VARCHAR(100) NOT NULL,
    "ownerHrs" DOUBLE PRECISION NOT NULL,
    "developer" VARCHAR(100) NOT NULL,
    "developerHrs" DOUBLE PRECISION NOT NULL,
    "tester" VARCHAR(100) NOT NULL,
    "testerHrs" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketUpdate" (
    "id" SERIAL NOT NULL,
    "ticketNo" VARCHAR(30) NOT NULL,
    "updateStatus" VARCHAR(30) NOT NULL DEFAULT 'Development',
    "assignTo" VARCHAR(100) NOT NULL,
    "assignedOn" VARCHAR(20) NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "comments" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamCode_key" ON "Team"("teamCode");

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientCode_key" ON "Client"("clientCode");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketNo_key" ON "Ticket"("ticketNo");
