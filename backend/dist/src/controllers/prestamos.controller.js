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
const prestamos_1 = require("../Entities/prestamos");
class PrestamosController {
    constructor() {
    }
    getPrestamos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prestamos_1.Prestamos.find({
                order: { fecha_hora: "ASC" },
                relations: ['clienteId', 'pagos']
            })
                .then(prestamo => { res.json(prestamo); })
                .catch(err => { res.json(err.message); });
        });
    }
    getPrestamo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            yield prestamos_1.Prestamos.findOne({ id }, { relations: ['clienteId', 'pagos'] })
                .then(prestamo => { res.json(prestamo); })
                .catch(err => { res.json(err.message); });
        });
    }
    createPrestamo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let prestamo = new prestamos_1.Prestamos();
            prestamo.monto = req.body.monto;
            prestamo.fecha_hora = req.body.fecha_hora;
            prestamo.vencimiento = req.body.vencimiento;
            prestamo.tasa_interes = req.body.tasa_interes;
            prestamo.intereses = req.body.intereses;
            prestamo.cantidad_cuotas = req.body.cantidad_cuotas;
            prestamo.cuotas_pagadas = req.body.cuotas_pagadas;
            prestamo.tipo_pago = req.body.tipo_pago;
            prestamo.saldo = req.body.saldo;
            prestamo.estado = req.body.estado;
            prestamo.clienteId = req.body.clienteId;
            prestamo.pagos = req.body.pagos;
            prestamo.save()
                .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
        });
    }
    ;
    updatePrestamo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            prestamos_1.Prestamos.findOne({ id })
                .then((prestamo) => __awaiter(this, void 0, void 0, function* () {
                prestamo.monto = req.body.monto;
                prestamo.fecha_hora = req.body.fecha_hora;
                prestamo.vencimiento = req.body.vencimiento;
                prestamo.tasa_interes = req.body.tasa_interes;
                prestamo.intereses = req.body.intereses;
                prestamo.cantidad_cuotas = req.body.cantidad_cuotas;
                prestamo.cuotas_pagadas = req.body.cuotas_pagadas;
                prestamo.tipo_pago = req.body.tipo_pago;
                prestamo.saldo = req.body.saldo;
                prestamo.estado = req.body.estado;
                prestamo.clienteId = req.body.clienteId;
                prestamo.pagos = req.body.pagos;
                prestamo.save()
                    .then(u => {
                    res.json(u);
                })
                    .catch(err => {
                    res.json(err);
                });
            }))
                .catch(err => res.json({ message: 'No se encontró el prestamo' }));
        });
    }
    deletePrestamo(req, res) {
        let id = parseInt(req.params.id);
        prestamos_1.Prestamos.findOne({ id })
            .then(prestamo => {
            prestamo.remove()
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
    findPaginaByEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageNro = req.query.pageNro;
            let pageSize = req.query.pageSize;
            let estado = req.query.estado || '';
            let order = req.query.order || 'estado'; // columna por la cual ordenar
            let ad = req.query.ad || 'ASC'; // ascendiente o descendiente
            let prestamos = yield prestamos_1.Prestamos.findPaginaByEstado(pageNro, pageSize, estado, order, ad);
            res.send({ prestamos });
        });
    }
    getPrestamoByIdCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            yield prestamos_1.Prestamos.find({
                where: { clienteId: id },
                order: { fecha_hora: "ASC" },
                relations: ['clienteId', 'pagos']
            })
                .then(producto => { res.json(producto); })
                .catch(err => { res.send(err); });
        });
    }
}
exports.PrestamosController = PrestamosController;
//# sourceMappingURL=prestamos.controller.js.map