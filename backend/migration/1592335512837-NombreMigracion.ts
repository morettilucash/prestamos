import {MigrationInterface, QueryRunner} from "typeorm";

export class NombreMigracion1592335512837 implements MigrationInterface {
    name = 'NombreMigracion1592335512837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nombre" varchar(40), "apellido" varchar(80), "localidad" varchar(80), "telefono" varchar(30), "domicilio" varchar(40), "email" varchar(70), "created_at" datetime, "updated_at" datetime)`, undefined);
        await queryRunner.query(`CREATE TABLE "prestamos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "monto" real NOT NULL, "fecha_hora" datetime, "vencimiento" datetime, "tasa_interes" real, "intereses" real, "cantidad_cuotas" integer, "cuotas_pagadas" integer, "tipo_pago" varchar, "saldo" real, "estado" varchar, "clienteIdId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "pagos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "monto" real NOT NULL, "vencimiento" datetime NOT NULL, "nro_cuota" integer NOT NULL, "prestamoIdId" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_prestamos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "monto" real NOT NULL, "fecha_hora" datetime, "vencimiento" datetime, "tasa_interes" real, "intereses" real, "cantidad_cuotas" integer, "cuotas_pagadas" integer, "tipo_pago" varchar, "saldo" real, "estado" varchar, "clienteIdId" integer, CONSTRAINT "FK_5993feba1539b1dfa249541beb0" FOREIGN KEY ("clienteIdId") REFERENCES "clientes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_prestamos"("id", "monto", "fecha_hora", "vencimiento", "tasa_interes", "intereses", "cantidad_cuotas", "cuotas_pagadas", "tipo_pago", "saldo", "estado", "clienteIdId") SELECT "id", "monto", "fecha_hora", "vencimiento", "tasa_interes", "intereses", "cantidad_cuotas", "cuotas_pagadas", "tipo_pago", "saldo", "estado", "clienteIdId" FROM "prestamos"`, undefined);
        await queryRunner.query(`DROP TABLE "prestamos"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_prestamos" RENAME TO "prestamos"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_pagos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "monto" real NOT NULL, "vencimiento" datetime NOT NULL, "nro_cuota" integer NOT NULL, "prestamoIdId" integer, CONSTRAINT "FK_24c4d5da7d8eaca755fb1a22600" FOREIGN KEY ("prestamoIdId") REFERENCES "prestamos" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_pagos"("id", "monto", "vencimiento", "nro_cuota", "prestamoIdId") SELECT "id", "monto", "vencimiento", "nro_cuota", "prestamoIdId" FROM "pagos"`, undefined);
        await queryRunner.query(`DROP TABLE "pagos"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_pagos" RENAME TO "pagos"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagos" RENAME TO "temporary_pagos"`, undefined);
        await queryRunner.query(`CREATE TABLE "pagos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "monto" real NOT NULL, "vencimiento" datetime NOT NULL, "nro_cuota" integer NOT NULL, "prestamoIdId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "pagos"("id", "monto", "vencimiento", "nro_cuota", "prestamoIdId") SELECT "id", "monto", "vencimiento", "nro_cuota", "prestamoIdId" FROM "temporary_pagos"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_pagos"`, undefined);
        await queryRunner.query(`ALTER TABLE "prestamos" RENAME TO "temporary_prestamos"`, undefined);
        await queryRunner.query(`CREATE TABLE "prestamos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "monto" real NOT NULL, "fecha_hora" datetime, "vencimiento" datetime, "tasa_interes" real, "intereses" real, "cantidad_cuotas" integer, "cuotas_pagadas" integer, "tipo_pago" varchar, "saldo" real, "estado" varchar, "clienteIdId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "prestamos"("id", "monto", "fecha_hora", "vencimiento", "tasa_interes", "intereses", "cantidad_cuotas", "cuotas_pagadas", "tipo_pago", "saldo", "estado", "clienteIdId") SELECT "id", "monto", "fecha_hora", "vencimiento", "tasa_interes", "intereses", "cantidad_cuotas", "cuotas_pagadas", "tipo_pago", "saldo", "estado", "clienteIdId" FROM "temporary_prestamos"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_prestamos"`, undefined);
        await queryRunner.query(`DROP TABLE "pagos"`, undefined);
        await queryRunner.query(`DROP TABLE "prestamos"`, undefined);
        await queryRunner.query(`DROP TABLE "clientes"`, undefined);
    }

}
