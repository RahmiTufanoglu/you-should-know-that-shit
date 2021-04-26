import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1619466826006 implements MigrationInterface {
    name = 'UserMigration1619466826006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `facts` (`id` varchar(36) NOT NULL, `fact` varchar(255) NOT NULL, `isTrue` tinyint NOT NULL, `image` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `categoryId` varchar(36) NULL, UNIQUE INDEX `IDX_90e7090ffb303d799ed55b2f1f` (`fact`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categories` (`id` varchar(36) NOT NULL, `category` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_bcd0361927be4baf8a1f401590` (`category`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `claims` (`id` varchar(36) NOT NULL, `claim` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_4fd670779d0c41ba6aeb7b34ec` (`claim`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `email` varchar(300) NOT NULL, `password` varchar(255) NOT NULL, `username` varchar(255) NULL, `firstname` varchar(255) NULL, `lastname` varchar(255) NULL, `highscore` int NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `facts` ADD CONSTRAINT `FK_d2fcbbee2cc201b8a4d4d22eebd` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facts` DROP FOREIGN KEY `FK_d2fcbbee2cc201b8a4d4d22eebd`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_4fd670779d0c41ba6aeb7b34ec` ON `claims`");
        await queryRunner.query("DROP TABLE `claims`");
        await queryRunner.query("DROP INDEX `IDX_bcd0361927be4baf8a1f401590` ON `categories`");
        await queryRunner.query("DROP TABLE `categories`");
        await queryRunner.query("DROP INDEX `IDX_90e7090ffb303d799ed55b2f1f` ON `facts`");
        await queryRunner.query("DROP TABLE `facts`");
    }

}
