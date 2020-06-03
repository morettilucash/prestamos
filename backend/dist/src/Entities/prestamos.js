"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const clientes_1 = require("./clientes");
const pagos_1 = require("./pagos");
let Prestamos = class Prestamos extends typeorm_1.BaseEntity {
    static findPaginaByEstado(pageNro, pageSize, estado, order, ad) {
        const skipRecords = pageNro * pageSize;
        console.log('estado: string, order: string, ad: any');
        console.log(estado, order, ad);
        if (estado === 'Todos') {
            console.log(`Filtrando por todos los estados, y ordenenando por ${order}`);
            return this.createQueryBuilder('prestamos')
                .leftJoinAndSelect('prestamos.clienteId', 'cliente')
                .leftJoinAndSelect('prestamos.pagos', 'pago')
                .orderBy(`prestamos.${order}`, ad)
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        }
        else {
            console.log(`Filtrando por estado: ${estado}, y ordenenando por ${order}`);
            return this.createQueryBuilder('prestamos')
                .leftJoinAndSelect('prestamos.clienteId', 'cliente')
                .leftJoinAndSelect('prestamos.pagos', 'pago')
                .where(`LOWER(prestamos.estado) LIKE LOWER(:estado)`, { estado: '%' + estado + '%' })
                .orderBy(`prestamos.${order}`, ad)
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment', { type: 'integer' }),
    __metadata("design:type", Number)
], Prestamos.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'real', nullable: false }),
    __metadata("design:type", Number)
], Prestamos.prototype, "monto", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Prestamos.prototype, "fecha_hora", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Prestamos.prototype, "vencimiento", void 0);
__decorate([
    typeorm_1.Column({ type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Prestamos.prototype, "tasa_interes", void 0);
__decorate([
    typeorm_1.Column({ type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Prestamos.prototype, "intereses", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Prestamos.prototype, "cantidad_cuotas", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Prestamos.prototype, "cuotas_pagadas", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Prestamos.prototype, "tipo_pago", void 0);
__decorate([
    typeorm_1.Column({ type: 'real', nullable: true }),
    __metadata("design:type", Number)
], Prestamos.prototype, "saldo", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Prestamos.prototype, "estado", void 0);
__decorate([
    typeorm_1.ManyToOne(type => clientes_1.Clientes, cliente => cliente.id),
    __metadata("design:type", clientes_1.Clientes)
], Prestamos.prototype, "clienteId", void 0);
__decorate([
    typeorm_1.OneToMany(type => pagos_1.Pagos, pago => pago.prestamoId),
    __metadata("design:type", Array)
], Prestamos.prototype, "pagos", void 0);
Prestamos = __decorate([
    typeorm_1.Entity('prestamos')
], Prestamos);
exports.Prestamos = Prestamos;
//# sourceMappingURL=prestamos.js.map