"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const mw = __importStar(require("./auth_mw"));
class UsuariosRouter {
    constructor() {
        this.controlador = new usuarios_controller_1.UsuariosController();
    }
    routes(app) {
        app.route('/api/v1/usuarios')
            .get((req, res, next) => {
            next();
        }, mw.jwtAdminMidleware, this.controlador.getUsuarios)
            .post(this.controlador.createUsuario);
        app.route('/api/v1/usuario/:id')
            .get(mw.jwtAdminMidleware, this.controlador.getUsuario)
            .put(mw.jwtAdminMidleware, this.controlador.updateUsuario)
            .delete(mw.jwtAdminMidleware, this.controlador.deleteUsuario);
    }
}
exports.UsuariosRouter = UsuariosRouter;
//# sourceMappingURL=usuarios.routes.js.map