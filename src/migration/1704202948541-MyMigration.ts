import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1704202948541 implements MigrationInterface {
    name = 'MyMigration1704202948541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "noUrut" integer NOT NULL, "partaiImg" character varying NOT NULL, "nama" character varying NOT NULL, "ketuaUmum" character varying NOT NULL, "visiMisi" text NOT NULL, "alamat" character varying NOT NULL, CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "gambar" character varying NOT NULL, "articleDate" date NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "author" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "paslonImg" character varying NOT NULL, "noUrut" integer NOT NULL, "visiMisi" text NOT NULL, "koalisi" text NOT NULL, CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "address" character varying NOT NULL, "gender" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "voter" ("id" SERIAL NOT NULL, "namaVoter" character varying NOT NULL, "alamat" character varying NOT NULL, "jenKel" character varying NOT NULL, "paslon" character varying NOT NULL, CONSTRAINT "PK_c1a0d8fd992c199219325d43705" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "voter"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "paslon"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "partai"`);
    }

}
