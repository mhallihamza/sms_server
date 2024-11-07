import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMig1730940072444 implements MigrationInterface {
    name = 'InitialMig1730940072444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "treatments" ("treatmentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "image" character varying, "price" numeric(5,2) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "duration" integer NOT NULL, "serviceId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_77b54c29c9bb84836206c5cb721" PRIMARY KEY ("treatmentId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "treatments"`);
    }

}
