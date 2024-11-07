import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMig1730936242681 implements MigrationInterface {
    name = 'InitialMig1730936242681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."customers_gender_enum" AS ENUM('Male', 'Female', 'Other')`);
        await queryRunner.query(`CREATE TABLE "customers" ("customerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "phoneNumber" character varying(15) NOT NULL, "address" character varying, "profilePicture" character varying, "isLoyalCustomer" boolean NOT NULL DEFAULT false, "gender" "public"."customers_gender_enum" NOT NULL DEFAULT 'Other', "userId" uuid NOT NULL, "notes" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_3e418bff40d3abac5642cd5d398" UNIQUE ("phoneNumber"), CONSTRAINT "PK_0d6a9c16d0c9bacffc0a784a186" PRIMARY KEY ("customerId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TYPE "public"."customers_gender_enum"`);
    }

}
