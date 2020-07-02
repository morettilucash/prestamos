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
class PagosController {
    constructor() {
    }
    getPagos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pagos_1.Pagos.find({
                order: { fecha_hora: "ASC" }
            })
                .then(pago => { res.json(pago); })
                .catch(err => { res.json(err.message); });
        });
    }
    getPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            yield pagos_1.Pagos.findOne({ id })
                .then(pago => { res.json(pago); })
                .catch(err => { res.json(err.message); });
        });
    }
    createPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pago = new pagos_1.Pagos();
            pago.monto = req.body.monto;
            pago.interes = req.body.interes;
            pago.tasa_interes = req.body.tasa_interes;
            pago.fecha_hora = req.body.fecha_hora;
            pago.nro_cuota = req.body.nro_cuota;
            pago.ganancia = req.body.ganancia;
            pago.prestamoId = req.body.prestamoId;
            pago.save()
                .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
        });
    }
    ;
    updatePago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            pagos_1.Pagos.findOne({ id })
                .then((pago) => __awaiter(this, void 0, void 0, function* () {
                pago.monto = req.body.monto;
                pago.interes = req.body.interes;
                pago.tasa_interes = req.body.tasa_interes;
                pago.fecha_hora = req.body.fecha_hora;
                pago.nro_cuota = req.body.nro_cuota;
                pago.ganancia = req.body.ganancia;
                pago.prestamoId = req.body.prestamoId;
                pago.save()
                    .then(u => {
                    res.json(u);
                })
                    .catch(err => {
                    res.json(err);
                });
            }))
                .catch(err => res.json({ message: 'No se encontró el pago' }));
        });
    }
    deletePago(req, res) {
        let id = parseInt(req.params.id);
        pagos_1.Pagos.findOne({ id })
            .then(pago => {
            pago.remove()
                .then(u => {
                res.json(u);
            })
                .catch(err => {
                res.send(err);
            });
        })
            .catch(err => { res.json(err.message); });
    }
    ;
    findPaginated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageNro = req.query.pageNro;
            let pageSize = req.query.pageSize;
            let pagos = yield pagos_1.Pagos.findPaginated(pageNro, pageSize);
            res.send({ pagos });
        });
    }
}
exports.PagosController = PagosController;
//# sourceMappingURL=pagos.controller.js.map