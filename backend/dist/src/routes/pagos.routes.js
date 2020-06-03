"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagos_controller_1 = require("../controllers/pagos.controller");
class PagosRouter {
    constructor() {
        this.controlador = new pagos_controller_1.PagosController();
    }
    routes(app) {
        app.route('/api/v1/pagos')
            .get((req, res, next) => {
            next();
        }, this.controlador.getPagos)
            .post(this.controlador.createPago);
        app.route('/api/v1/pago/:id')
            .get(this.controlador.getPago)
            .put(this.controlador.updatePago)
            .delete(this.controlador.deletePago);
        app.route('/api/v1/pagos/paginado')
            .get(this.controlador.findPaginated);
    }
}
exports.PagosRouter = PagosRouter;
//# sourceMappingURL=pagos.routes.js.map