"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_usuarios_controller_1 = require("../controllers/auth_usuarios.controller");
class LoginRoutes {
    constructor() {
        this.controlador = new auth_usuarios_controller_1.UsuariosAuthController();
    }
    routes(app) {
        app.route('/api/v1/login')
            .post(this.controlador.loginUsuario);
    }
}
exports.LoginRoutes = LoginRoutes;
//# sourceMappingURL=login.routes.js.map