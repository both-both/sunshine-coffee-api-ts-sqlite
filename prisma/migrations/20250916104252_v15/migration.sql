-- AddForeignKey
ALTER TABLE `testemonies` ADD CONSTRAINT `testemonies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
