"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class NombreMigracion1590764048901 {
    constructor() {
        this.name = 'NombreMigracion1590764048901';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nombre" character varying(40), "apellido" character varying(80), "localidad" character varying(80), "telefono" character varying(30), "domicilio" character varying(40), "email" character varying(70), "created_at" TIMESTAMP, "updated_at" TIMESTAMP, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`, undefined);
            yield queryRunner.query(`CREATE TABLE "prestamos" ("id" SERIAL NOT NULL, "monto" real NOT NULL, "fecha_hora" TIMESTAMP, "vencimiento" TIMESTAMP, "tasa_interes" real, "intereses" real, "cantidad_cuotas" integer, "cuotas_pagadas" integer, "tipo_pago" character varying, "saldo" real, "estado" character varying, "clienteIdId" integer, CONSTRAINT "PK_3a2a5a8ed68438a02780b16c5b4" PRIMARY KEY ("id"))`, undefined);
            yield queryRunner.query(`CREATE TABLE "pagos" ("id" SERIAL NOT NULL, "monto" real NOT NULL, "vencimiento" TIMESTAMP NOT NULL, "nro_cuota" integer NOT NULL, "prestamoIdId" integer, CONSTRAINT "PK_37321ca70a2ed50885dc205beb2" PRIMARY KEY ("id"))`, undefined);
            yield queryRunner.query(`ALTER TABLE "prestamos" ADD CONSTRAINT "FK_5993feba1539b1dfa249541beb0" FOREIGN KEY ("clienteIdId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
            yield queryRunner.query(`ALTER TABLE "pagos" ADD CONSTRAINT "FK_24c4d5da7d8eaca755fb1a22600" FOREIGN KEY ("prestamoIdId") REFERENCES "prestamos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "pagos" DROP CONSTRAINT "FK_24c4d5da7d8eaca755fb1a22600"`, undefined);
            yield queryRunner.query(`ALTER TABLE "prestamos" DROP CONSTRAINT "FK_5993feba1539b1dfa249541beb0"`, undefined);
            yield queryRunner.query(`DROP TABLE "pagos"`, undefined);
            yield queryRunner.query(`DROP TABLE "prestamos"`, undefined);
            yield queryRunner.query(`DROP TABLE "clientes"`, undefined);
        });
    }
}
exports.NombreMigracion1590764048901 = NombreMigracion1590764048901;
//# sourceMappingURL=1590764048901-NombreMigracion.js.map