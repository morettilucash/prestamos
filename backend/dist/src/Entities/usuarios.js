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
let Usuarios = class Usuarios extends typeorm_1.BaseEntity {
    static findByUsername(username) {
        console.log('findByUsername');
        return this.createQueryBuilder("usuarios")
            .where("usuarios.username = :username", { username })
            .getOne();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment', { type: 'integer' }),
    __metadata("design:type", Number)
], Usuarios.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Usuarios.prototype, "rol", void 0);
Usuarios = __decorate([
    typeorm_1.Entity('usuarios')
], Usuarios);
exports.Usuarios = Usuarios;
//# sourceMappingURL=usuarios.js.map