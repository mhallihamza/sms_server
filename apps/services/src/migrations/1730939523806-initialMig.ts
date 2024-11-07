import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMig1730939523806 implements MigrationInterface {
    name = 'InitialMig1730939523806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("serviceId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "image" character varying, "minDuration" integer, "maxDuration" integer, "startPrice" integer, "userId" uuid NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd9b50de0bd3040ab0debaf36f5" PRIMARY KEY ("serviceId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
