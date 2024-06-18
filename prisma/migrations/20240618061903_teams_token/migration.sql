/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `teams` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "token" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "teams_token_key" ON "teams"("token");
