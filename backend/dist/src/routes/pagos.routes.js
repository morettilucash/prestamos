"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pagos_controller_1 = require("../controllers/pagos.controller");
const mw = __importStar(require("./auth_mw"));
class PagosRouter {
    constructor() {
        this.controlador = new pagos_controller_1.PagosController();
    }
    routes(app) {
        app.route('/api/v1/pagos')
            .get((req, res, next) => {
            next();
        }, mw.jwtAdminMidleware, this.controlador.getPagos)
            .post(mw.jwtAdminMidleware, this.controlador.createPago);
        app.route('/api/v1/pago/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getPago)
            .put(mw.jwtAdminMidleware, this.controlador.updatePago)
            .delete(mw.jwtAdminMidleware, this.controlador.deletePago);
        app.route('/api/v1/pagos/paginado')
            .get(mw.jwtAdminMidleware, this.controlador.findPaginated);
    }
}
exports.PagosRouter = PagosRouter;
//# sourceMappingURL=pagos.routes.js.map