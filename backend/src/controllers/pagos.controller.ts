import { Pagos } from '../Entities/pagos';
import { Request, Response, NextFunction } from 'express';
import * as faker from 'faker';

export class PagosController {

    constructor() {
    }

    public async getPagos(req: Request, res: Response) {
        await Pagos.find({
            order: { vencimiento: "ASC" }
        })
            .then(pago => { res.json(pago) })
            .catch(err => { res.json(err.message); })
    }

    public async getPago(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        await Pagos.findOne(
            { id },
            { relations: ['comercios'] }
        )
            .then(pago => { res.json(pago) })
            .catch(err => { res.json(err.message); })
    }

    public async createPago(req: Request, res: Response) {
        let pago: Pagos = new Pagos();

        pago.monto = req.body.monto;
        pago.vencimiento = req.body.vencimiento;
        pago.nro_cuota = req.body.nro_cuota;
        pago.prestamoId = req.body.prestamoId;

        pago.save()
            .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
    };

    public async updatePago(req: Request, res: Response) {
        let id = parseInt(req.params.id);

        Pagos.findOne({ id })
            .then(async (pago: Pagos) => {
                console.log('pago', pago);
                console.log('req.body', req.body);
                pago.monto = req.body.monto;
                pago.vencimiento = req.body.vencimiento;
                pago.nro_cuota = req.body.nro_cuota;
                pago.prestamoId = req.body.prestamoId;


                pago.save()
                    .then(u => {
                        res.json(u);
                    })
                    .catch(err => {
                        res.json(err);
                    });
            })
            .catch(err => res.json({ message: 'No se encontró el pago' }))
    }

    public deletePago(req: Request, res: Response) {
        let id = parseInt(req.params.id);
        Pagos.findOne({ id })
            .then(pago => {
                pago.remove()
                    .then(u => {
                        res.json(u)
                    })
                    .catch(err => {
                        res.send(err)
                    });
            })
            .catch(err => { res.json(err.message); });
    };

    public async findPaginated(req: Request, res: Response) {

        let pageNro: any = req.query.pageNro;
        let pageSize: any = req.query.pageSize;

        let pagos = await Pagos.findPaginated(pageNro, pageSize);
        res.send({ pagos });

    }



}