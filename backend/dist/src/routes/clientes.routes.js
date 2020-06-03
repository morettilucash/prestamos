"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientes_controller_1 = require("../controllers/clientes.controller");
class ClientesRouter {
    constructor() {
        this.controlador = new clientes_controller_1.ClientesController();
    }
    routes(app) {
        app.route('/api/v1/clientes')
            .get((req, res, next) => {
            next();
        }, this.controlador.getClientes)
            .post(this.controlador.createCliente);
        app.route('/api/v1/cliente/:id')
            .get(this.controlador.getCliente)
            .put(this.controlador.updateCliente)
            .delete(this.controlador.deleteCliente);
        app.route('/api/v1/clientes/paginado')
            .get(this.controlador.findByTxtPaginated);
        app.route('/api/v1/clientes/faker')
            .post(this.controlador.createClienteFaker);
    }
}
exports.ClientesRouter = ClientesRouter;
//# sourceMappingURL=clientes.routes.js.map