"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const estadisticas_controller_1 = require("../controllers/estadisticas.controller");
const mw = __importStar(require("./auth_mw"));
class EstadisticasRouter {
    constructor() {
        this.controlador = new estadisticas_controller_1.EstadisticasController();
    }
    routes(app) {
        app.route('/api/v1/estadisticas/ganancias/desde/:desde/hasta/:hasta')
            .get(mw.jwtAdminMidleware, this.controlador.getGanancias);
        app.route('/api/v1/estadisticas/prestamos/desde/:desde/hasta/:hasta')
            .get(mw.jwtAdminMidleware, this.controlador.getCantPrestamos);
        app.route('/api/v1/estadisticas/pagos/desde/:desde/hasta/:hasta')
            .get(mw.jwtAdminMidleware, this.controlador.getCantPagos);
        app.route('/api/v1/estadisticas/prestado/desde/:desde/hasta/:hasta')
            .get(mw.jwtAdminMidleware, this.controlador.getPrestado);
        app.route('/api/v1/estadisticas/ingresado/desde/:desde/hasta/:hasta')
            .get(mw.jwtAdminMidleware, this.controlador.getIngresado);
    }
}
exports.EstadisticasRouter = EstadisticasRouter;
//# sourceMappingURL=estadisticas.routes.js.map