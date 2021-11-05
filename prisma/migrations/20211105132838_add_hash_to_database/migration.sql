/*
  Warnings:

  - Added the required column `hash` to the `Redirect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Redirect" ADD COLUMN     "hash" TEXT NOT NULL;
