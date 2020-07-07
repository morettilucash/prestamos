"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const prestamos_controller_1 = require("../controllers/prestamos.controller");
const mw = __importStar(require("./auth_mw"));
class PrestamosRouter {
    constructor() {
        this.controlador = new prestamos_controller_1.PrestamosController();
    }
    routes(app) {
        app.route('/api/v1/prestamos')
            .get((req, res, next) => {
            next();
        }, mw.jwtAdminMidleware, this.controlador.getPrestamos)
            .post(mw.jwtAdminMidleware, this.controlador.createPrestamo);
        app.route('/api/v1/prestamo/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getPrestamo)
            .put(mw.jwtAdminMidleware, this.controlador.updatePrestamo)
            .delete(mw.jwtAdminMidleware, this.controlador.deletePrestamo);
        app.route('/api/v1/prestamos/cliente/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getPrestamoByIdCliente);
        app.route('/api/v1/prestamos/paginado')
            .get(mw.jwtAdminMidleware, this.controlador.findPaginaByEstado);
    }
}
exports.PrestamosRouter = PrestamosRouter;
//# sourceMappingURL=prestamos.routes.js.map