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
let Clientes = class Clientes extends typeorm_1.BaseEntity {
    static findByEmail(email) {
        return this.createQueryBuilder("usuario")
            .where("usuario.email = :email", { email })
            .getOne();
    }
    static findByTelefono(telefono) {
        return this.createQueryBuilder("usuario")
            .where("usuario.telefono = :telefono", { telefono })
            .getOne();
    }
    static findByTxtPaginated(pageNro, pageSize, attr, txt) {
        const skipRecords = pageNro * pageSize;
        // attr = col nombre, apellido, etc..
        if (txt === '') {
            console.log('Solo paginado');
            return this.createQueryBuilder('usuario')
                .skip(skipRecords)
                .take(pageSize)
                .orderBy('usuario.nombre')
                .getMany();
        }
        else {
            console.log('paginado por txt');
            return this.createQueryBuilder('usuario')
                .where(`LOWER(usuario.${attr}) LIKE LOWER(:txt)`, { txt: '%' + txt + '%' })
                .orderBy('usuario.nombre')
                .skip(skipRecords)
                .take(pageSize)
                .getMany();
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment', { type: 'integer' }),
    __metadata("design:type", Number)
], Clientes.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", String)
], Clientes.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 80, nullable: true }),
    __metadata("design:type", String)
], Clientes.prototype, "apellido", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 80, nullable: true }),
    __metadata("design:type", String)
], Clientes.prototype, "localidad", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], Clientes.prototype, "telefono", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 40, nullable: true }),
    __metadata("design:type", String)
], Clientes.prototype, "domicilio", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 70, nullable: true }),
    __metadata("design:type", String)
], Clientes.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Clientes.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Clientes.prototype, "updated_at", void 0);
Clientes = __decorate([
    typeorm_1.Entity('clientes')
], Clientes);
exports.Clientes = Clientes;
//# sourceMappingURL=clientes.js.map