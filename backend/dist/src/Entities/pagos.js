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
const prestamos_1 = require("./prestamos");
let Pagos = class Pagos extends typeorm_1.BaseEntity {
    static findPaginated(pageNro, pageSize) {
        const skipRecords = pageNro * pageSize;
        // attr = col nombre, apellido, etc..
        console.log('Filtrando por txt');
        return this.createQueryBuilder('pago')
            .orderBy('pago.vencimiento', 'ASC')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment', { type: 'integer' }),
    __metadata("design:type", Number)
], Pagos.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'real', nullable: false }),
    __metadata("design:type", Number)
], Pagos.prototype, "monto", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], Pagos.prototype, "vencimiento", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Pagos.prototype, "nro_cuota", void 0);
__decorate([
    typeorm_1.ManyToOne(type => prestamos_1.Prestamos, pres => pres.pagos),
    __metadata("design:type", prestamos_1.Prestamos)
], Pagos.prototype, "prestamoId", void 0);
Pagos = __decorate([
    typeorm_1.Entity('pagos')
], Pagos);
exports.Pagos = Pagos;
//# sourceMappingURL=pagos.js.map