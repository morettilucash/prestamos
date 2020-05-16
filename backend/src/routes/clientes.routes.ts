import { Request, Response, NextFunction } from "express";
import { ClientesController } from "../controllers/clientes.controller";


export class ClientesRouter {

    public controlador: ClientesController = new ClientesController();

    public routes(app): void {
        app.route('/api/v1/clientes')
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            },  this.controlador.getClientes)
            .post(this.controlador.createCliente);

        app.route('/api/v1/cliente/:id')
            .get( this.controlador.getCliente)
            .put(this.controlador.updateCliente)
            .delete( this.controlador.deleteCliente);

        app.route('/api/v1/clientes/paginado')
            .get(this.controlador.findByTxtPaginated);

        app.route('/api/v1/clientes/faker')
            .post(this.controlador.createClienteFaker);
    }

}
