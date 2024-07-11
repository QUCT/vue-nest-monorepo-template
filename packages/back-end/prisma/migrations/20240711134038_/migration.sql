/*
  Warnings:

  - You are about to drop the column `status` on the `role_permission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permissions` ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE') NULL DEFAULT 'INACTIVE';

-- AlterTable
ALTER TABLE `role_permission` DROP COLUMN `status`;
