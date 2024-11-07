import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMig1730934694130 implements MigrationInterface {
    name = 'InitialMig1730934694130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("appointmentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "customerId" uuid NOT NULL, "serviceId" uuid NOT NULL, "userId" uuid NOT NULL, "staffId" uuid NOT NULL, "treatmentId" uuid NOT NULL, "appointmentDate" date NOT NULL, "startTime" TIME NOT NULL, "notes" character varying(500), "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16345caffd6ea5e1a799639b012" PRIMARY KEY ("appointmentId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
