"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const clientes_controller_1 = require("../controllers/clientes.controller");
const mw = __importStar(require("./auth_mw"));
class ClientesRouter {
    constructor() {
        this.controlador = new clientes_controller_1.ClientesController();
    }
    routes(app) {
        app.route('/api/v1/clientes')
            .get(mw.jwtAdminMidleware, (req, res, next) => {
            next();
        }, mw.jwtAdminMidleware, this.controlador.getClientes)
            .post(mw.jwtAdminMidleware, this.controlador.createCliente);
        app.route('/api/v1/cliente/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getCliente)
            .put(mw.jwtAdminMidleware, this.controlador.updateCliente)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteCliente);
        app.route('/api/v1/clientes/paginado')
            .get(mw.jwtAdminMidleware, this.controlador.findByTxtPaginated);
        app.route('/api/v1/clientes/faker')
            .post(mw.jwtAdminMidleware, this.controlador.createClienteFaker);
    }
}
exports.ClientesRouter = ClientesRouter;
//# sourceMappingURL=clientes.routes.js.map