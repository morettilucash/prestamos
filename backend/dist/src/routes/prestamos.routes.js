"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prestamos_controller_1 = require("../controllers/prestamos.controller");
class PrestamosRouter {
    constructor() {
        this.controlador = new prestamos_controller_1.PrestamosController();
    }
    routes(app) {
        app.route('/api/v1/prestamos')
            .get((req, res, next) => {
            next();
        }, this.controlador.getPrestamos)
            .post(this.controlador.createPrestamo);
        app.route('/api/v1/prestamo/:id')
            .get(this.controlador.getPrestamo)
            .put(this.controlador.updatePrestamo)
            .delete(this.controlador.deletePrestamo);
        app.route('/api/v1/prestamos/cliente/:id')
            .get(this.controlador.getPrestamoByIdCliente);
        app.route('/api/v1/prestamos/paginado')
            .get(this.controlador.findPaginaByEstado);
    }
}
exports.PrestamosRouter = PrestamosRouter;
//# sourceMappingURL=prestamos.routes.js.map