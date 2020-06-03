"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() { }
    // Puertos
    port() {
        let puerto = process.env.PORT || 8080;
        return puerto;
    }
    // Entornos
    env() {
        let env = process.env.NODE_ENV || 'dev';
        return env;
    }
    // Vencimiento token
    caducidadToken() {
        return process.env.CADUCIDAD_TOKEN = '1h';
        //     process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30; // seg, min, dia mes
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map