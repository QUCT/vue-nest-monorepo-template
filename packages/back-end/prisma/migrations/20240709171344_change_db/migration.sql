/*
  Warnings:

  - You are about to alter the column `name` on the `menus` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `operations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `code` on the `operations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `method` on the `operations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `url` on the `operations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `description` on the `operations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `description` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE `menus` MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `operations` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `code` VARCHAR(20) NOT NULL,
    MODIFY `method` VARCHAR(20) NULL,
    MODIFY `url` VARCHAR(50) NULL,
    MODIFY `description` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `permissions` MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `roles` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(20) NOT NULL,
    MODIFY `password` VARCHAR(20) NOT NULL;
