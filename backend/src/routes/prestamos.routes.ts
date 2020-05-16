import { Request, Response, NextFunction } from "express";
import { PrestamosController } from "../controllers/prestamos.controller";


export class PrestamosRouter {

    public controlador: PrestamosController = new PrestamosController();

    public routes(app): void {
        app.route('/api/v1/prestamos')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            },  this.controlador.getPrestamos)
            .post(this.controlador.createPrestamo);

        app.route('/api/v1/prestamo/:id')
            .get( this.controlador.getPrestamo)
            .put(this.controlador.updatePrestamo)
            .delete( this.controlador.deletePrestamo);

        app.route('/api/v1/prestamos/paginado')
            .get(this.controlador.findByTxtPaginated);

    }

}
