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
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_1 = require("../Entities/usuarios");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class UsuariosAuthController {
    constructor() {
    }
    loginUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Login', req.body);
            let password = req.body.password;
            let username = req.body.username;
            let usuario = new usuarios_1.Usuarios();
            usuario = yield usuarios_1.Usuarios.findByUsername(username);
            console.log('Usuario buscado por username.', usuario);
            if (!usuario) {
                // Si no encuentra el usuario
                return res.status(404).send({
                    isLogged: false,
                    token: null,
                    error: "Datos incorrectos."
                });
            }
            let validarPasword = yield bcrypt.compareSync(password, usuario.password);
            if (!validarPasword) {
                // return res.status(401).send({ Error: "La contraseña no coincide."});
                return res.status(401).send({
                    isLogged: false,
                    token: null,
                    error: "Password incorrecta."
                });
            }
            const userSinPass = Object.assign({}, usuario);
            delete userSinPass.password;
            let token = jwt.sign(userSinPass, process.env.PKEY, { expiresIn: '10h' });
            res.status(200).send({
                isLogged: true,
                token: token,
                expiresIn: '10h',
                rol: userSinPass.rol
            });
        });
    }
}
exports.UsuariosAuthController = UsuariosAuthController;
//# sourceMappingURL=auth_usuarios.controller.js.map