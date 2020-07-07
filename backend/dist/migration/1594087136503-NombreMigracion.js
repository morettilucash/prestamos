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
class NombreMigracion1594087136503 {
    constructor() {
        this.name = 'NombreMigracion1594087136503';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `clientes` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(40) NULL, `apellido` varchar(80) NULL, `localidad` varchar(80) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(40) NULL, `email` varchar(70) NULL, `created_at` timestamp NULL, `updated_at` timestamp NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
            yield queryRunner.query("CREATE TABLE `prestamos` (`id` int NOT NULL AUTO_INCREMENT, `monto` double NOT NULL, `valor_cuota` double NOT NULL, `fecha_hora` timestamp NULL, `vencimiento` timestamp NULL, `tasa_interes` double NULL, `intereses` double NULL, `cantidad_cuotas` int NULL, `cuotas_pagadas` int NULL, `tipo_pago` varchar(255) NULL, `saldo` double NULL, `estado` varchar(255) NULL, `clienteIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
            yield queryRunner.query("CREATE TABLE `pagos` (`id` int NOT NULL AUTO_INCREMENT, `monto` double NOT NULL, `ganancia` double NOT NULL, `interes` tinyint NOT NULL, `tasa_interes` int NULL, `fecha_hora` timestamp NOT NULL, `nro_cuota` int NOT NULL, `prestamoIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
            yield queryRunner.query("CREATE TABLE `usuarios` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(20) NOT NULL, `password` varchar(255) NOT NULL, `rol` varchar(20) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
            yield queryRunner.query("ALTER TABLE `prestamos` ADD CONSTRAINT `FK_5993feba1539b1dfa249541beb0` FOREIGN KEY (`clienteIdId`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
            yield queryRunner.query("ALTER TABLE `pagos` ADD CONSTRAINT `FK_24c4d5da7d8eaca755fb1a22600` FOREIGN KEY (`prestamoIdId`) REFERENCES `prestamos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE `pagos` DROP FOREIGN KEY `FK_24c4d5da7d8eaca755fb1a22600`", undefined);
            yield queryRunner.query("ALTER TABLE `prestamos` DROP FOREIGN KEY `FK_5993feba1539b1dfa249541beb0`", undefined);
            yield queryRunner.query("DROP TABLE `usuarios`", undefined);
            yield queryRunner.query("DROP TABLE `pagos`", undefined);
            yield queryRunner.query("DROP TABLE `prestamos`", undefined);
            yield queryRunner.query("DROP TABLE `clientes`", undefined);
        });
    }
}
exports.NombreMigracion1594087136503 = NombreMigracion1594087136503;
//# sourceMappingURL=1594087136503-NombreMigracion.js.map