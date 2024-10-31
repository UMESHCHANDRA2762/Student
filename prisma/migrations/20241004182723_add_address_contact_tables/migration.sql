/*
  Warnings:

  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `student` table. All the data in the column will be lost.
  - Added the required column `id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    DROP COLUMN `Id`,
    DROP COLUMN `address`,
    DROP COLUMN `city`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_Id` INTEGER NOT NULL,
    `house_no` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_Id` INTEGER NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_student_Id_fkey` FOREIGN KEY (`student_Id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_student_Id_fkey` FOREIGN KEY (`student_Id`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
