"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const config_1 = require("./config/config");
const config = new config_1.Config();
// DotEnv: carga variables de entorno de un archivo .env en process.env.
const result = dotenv.config();
console.log('DotEnv:', result);
if (result.error) {
    throw result.error;
}
const typeorm_1 = require("typeorm");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
// Routes
const clientes_routes_1 = require("./routes/clientes.routes");
const prestamos_routes_1 = require("./routes/prestamos.routes");
const pagos_routes_1 = require("./routes/pagos.routes");
class App {
    constructor() {
        this.logger = require('morgan'); // Registro de cada petición
        this.routeClientes = new clientes_routes_1.ClientesRouter();
        this.routePrestamos = new prestamos_routes_1.PrestamosRouter();
        this.routePagos = new pagos_routes_1.PagosRouter();
        console.log('Iniciando Servidor');
        this.app = express_1.default();
        typeorm_1.createConnection()
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            this.conection = connection;
            console.log('Base de datos Ecommerce:', connection.isConnected);
        }))
            .catch(error => console.log(error));
        this.config();
        //Definimos todas las rutas
        this.routeClientes.routes(this.app);
        this.routePagos.routes(this.app);
        this.routePrestamos.routes(this.app);
    }
    config() {
        this.app.use(this.logger('dev'));
        // bodyParser: Analiza los cuerpos de solicitud entrantes en un middleware antes de sus 
        // manejadores, disponibles bajo la propiedad req.body.
        this.app.use(bodyParser.json({ type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ 'extended': false }));
        // Habilitar cors:
        this.app.use(cors_1.default());
        // Habilitar carpeta public:
        this.app.use('/static', express_1.default.static(__dirname + '/public'));
        // Este middleware intentará comprimir los cuerpos de respuesta para todas las solicitudes que lo atraviesen:
        this.app.use(compression_1.default());
        // ayuda a proteger aplicaciones Express configurando varios encabezados HTTP:
        this.app.use(helmet_1.default());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
            next();
        });
        this.app.listen(config.port(), () => console.log(`App escuchando en puerto: ${config.port()}`));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map