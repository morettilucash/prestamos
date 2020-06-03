import { Request, Response, NextFunction } from "express";
import { PagosController } from "../controllers/pagos.controller";


export class PagosRouter {

    public controlador: PagosController = new PagosController();

    public routes(app): void {
        app.route('/api/v1/pagos')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            },  this.controlador.getPagos)
            .post(this.controlador.createPago);

        app.route('/api/v1/pago/:id')
            .get( this.controlador.getPago)
            .put(this.controlador.updatePago)
            .delete( this.controlador.deletePago);

        app.route('/api/v1/pagos/paginado')
            .get(this.controlador.findPaginated);

    }

}
