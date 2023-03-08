import { MigrationInterface, QueryRunner } from "typeorm";

export class $1678250888766 implements MigrationInterface {
    name = '$1678250888766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people-tracing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status_update_date" date, "contact_type" character varying, "person_1" uuid NOT NULL, "person_2" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a53a2578c73fe2d660e0d5f4182" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "mobile" character varying(20), "status_update_date" date, "health_status" character varying, "location_id" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50), "address" character varying(30), "pincode" character varying(20), "red_score" integer, "status_update_date" date, "status" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations-tracing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location_id" uuid, "visit_date" date, "person_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_edf65e7e2608863d560700665eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "people-tracing" ADD CONSTRAINT "FK_9db219f0ce2b0d0b0c6d4128209" FOREIGN KEY ("person_1") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "people-tracing" ADD CONSTRAINT "FK_c9ffe5df09a6ae825b76593ff09" FOREIGN KEY ("person_2") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "locations-tracing" ADD CONSTRAINT "FK_b7832346b10f3e365f3ad10c9ea" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "locations-tracing" ADD CONSTRAINT "FK_476a55c0ad5f23714ed253ec032" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations-tracing" DROP CONSTRAINT "FK_476a55c0ad5f23714ed253ec032"`);
        await queryRunner.query(`ALTER TABLE "locations-tracing" DROP CONSTRAINT "FK_b7832346b10f3e365f3ad10c9ea"`);
        await queryRunner.query(`ALTER TABLE "people-tracing" DROP CONSTRAINT "FK_c9ffe5df09a6ae825b76593ff09"`);
        await queryRunner.query(`ALTER TABLE "people-tracing" DROP CONSTRAINT "FK_9db219f0ce2b0d0b0c6d4128209"`);
        await queryRunner.query(`DROP TABLE "locations-tracing"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "people-tracing"`);
    }

}
