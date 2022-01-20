-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "hostIp" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionPing" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "requestId" INTEGER NOT NULL,
    "alive" BOOLEAN NOT NULL,
    "min" TEXT,
    "max" TEXT,
    "avg" TEXT,
    "stddev" TEXT,
    "packetLoss" TEXT,

    CONSTRAINT "SessionPing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionPing" ADD CONSTRAINT "SessionPing_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
