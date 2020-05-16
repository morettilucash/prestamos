import { Prestamos } from '../Entities/prestamos';
import { Request, Response, NextFunction } from 'express';
import * as faker from 'faker';

export class PrestamosController {

    constructor() {
    }

    public async getPrestamos(req: Request, res: Response) {
        await Prestamos.find({
            order: { fecha_hora: "ASC" },
            relations: ['clienteId', 'pagos']
        })
            .then(prestamo => { res.json(prestamo) })
            .catch(err => { res.json(err.message); })
    }

    public async getPrestamo(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Prestamos.findOne(
            { id },
            { relations: ['clienteId', 'pagos'] }
        )
            .then(prestamo => { res.json(prestamo) })
            .catch(err => { res.json(err.message); })
    }

    public async createPrestamo(req: Request, res: Response) {
        let prestamo: Prestamos = new Prestamos();
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
    };

    public async updatePrestamo(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Prestamos.findOne({ id })
            .then(async (prestamo: Prestamos) => {
                console.log('prestamo', prestamo);
                console.log('req.body', req.body);
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

            })
            .catch(err => res.json({ message: 'No se encontró el prestamo' }))
    }

    public deletePrestamo(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Prestamos.findOne({ id })
            .then(prestamo => {
                prestamo.remove()
                    .then(u => {
                        res.json(u)
                    })
                    .catch(err => {
                        res.send(err)
                    });
            })
            .catch(err => { res.json(err.message); });
    };

    public async findByTxtPaginated(req: Request, res: Response) {

        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;
        let filter: any = req.query.filter || '';
        let attr: any = req.query.attr || 'nombre';  // columna por la cual filtrar

        let prestamos = await Prestamos.findByTxtPaginated(pageNro, pageSize, attr, filter);
        res.send({ prestamos });

    }



}