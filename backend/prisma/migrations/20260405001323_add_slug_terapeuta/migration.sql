/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Terapeuta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Terapeuta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Terapeuta" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Terapeuta_slug_key" ON "Terapeuta"("slug");
