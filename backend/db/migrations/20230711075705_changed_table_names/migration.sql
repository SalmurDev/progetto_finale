-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `Card_authorId_fkey`;

-- AddForeignKey
ALTER TABLE `Cards` ADD CONSTRAINT `Cards_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `User_email_key` TO `Users_email_key`;
