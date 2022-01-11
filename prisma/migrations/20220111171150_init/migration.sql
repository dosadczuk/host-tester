-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "host" TEXT NOT NULL,
    "hostIp" TEXT
);

-- CreateTable
CREATE TABLE "SessionPing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "requestId" INTEGER NOT NULL,
    "alive" BOOLEAN NOT NULL,
    "min" TEXT,
    "max" TEXT,
    "avg" TEXT,
    "stddev" TEXT,
    "packetLoss" TEXT,
    CONSTRAINT "SessionPing_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
