/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(255) NOT NULL,
    ALTER COLUMN `password` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Users_name_key` ON `Users`(`name`);
