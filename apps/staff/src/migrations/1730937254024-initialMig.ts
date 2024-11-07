import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMig1730937254024 implements MigrationInterface {
    name = 'InitialMig1730937254024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."staff_gender_enum" AS ENUM('Male', 'Female', 'Other')`);
        await queryRunner.query(`CREATE TABLE "staff" ("staffId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "phoneNumber" character varying(15) NOT NULL, "address" character varying, "profilePicture" character varying, "position" character varying(100) NOT NULL, "gender" "public"."staff_gender_enum" NOT NULL DEFAULT 'Other', "userId" uuid NOT NULL, "isAvailable" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_902985a964245652d5e3a0f5f6a" UNIQUE ("email"), CONSTRAINT "UQ_d58b5a97116316c23a3bf507d37" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a455629d6ffbd1f2953f453f3f9" PRIMARY KEY ("staffId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "staff"`);
        await queryRunner.query(`DROP TYPE "public"."staff_gender_enum"`);
    }

}
