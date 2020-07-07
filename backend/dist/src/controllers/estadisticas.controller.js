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
const pagos_1 = require("../Entities/pagos");
const prestamos_1 = require("../Entities/prestamos");
class EstadisticasController {
    constructor() {
    }
    getGanancias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desde = req.params.desde;
            const hasta = req.params.hasta;
            let est = yield pagos_1.Pagos.createQueryBuilder('pagos')
                .select("SUM(ganancia)", "suma")
                .where(`pagos.fecha_hora >= :desde`, { desde })
                .andWhere(`pagos.fecha_hora <= :hasta`, { hasta })
                .getRawOne();
            res.send(est);
        });
    }
    getCantPrestamos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desde = req.params.desde;
            const hasta = req.params.hasta;
            let est = yield prestamos_1.Prestamos.createQueryBuilder('prestamos')
                .select("COUNT(*)", "count")
                .where(`prestamos.fecha_hora >= :desde`, { desde })
                .andWhere(`prestamos.fecha_hora <= :hasta`, { hasta })
                .getRawOne();
            res.send(est);
        });
    }
    getCantPagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desde = req.params.desde;
            const hasta = req.params.hasta;
            let est = yield pagos_1.Pagos.createQueryBuilder('pagos')
                .select("COUNT(*)", "count")
                .where(`pagos.fecha_hora >= :desde`, { desde })
                .andWhere(`pagos.fecha_hora <= :hasta`, { hasta })
                .getRawOne();
            res.send(est);
        });
    }
    getPrestado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desde = req.params.desde;
            const hasta = req.params.hasta;
            let est = yield prestamos_1.Prestamos.createQueryBuilder('prestamos')
                .select("SUM(monto)", "suma")
                .where(`prestamos.fecha_hora >= :desde`, { desde })
                .andWhere(`prestamos.fecha_hora <= :hasta`, { hasta })
                .getRawOne();
            res.send(est);
        });
    }
    getIngresado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desde = req.params.desde;
            const hasta = req.params.hasta;
            let est = yield pagos_1.Pagos.createQueryBuilder('pagos')
                .select("SUM(monto)", "suma")
                .where(`pagos.fecha_hora >= :desde`, { desde })
                .andWhere(`pagos.fecha_hora <= :hasta`, { hasta })
                .getRawOne();
            res.send(est);
        });
    }
}
exports.EstadisticasController = EstadisticasController;
//# sourceMappingURL=estadisticas.controller.js.map