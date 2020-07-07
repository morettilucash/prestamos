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
class UsuariosController {
    constructor() {
    }
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield usuarios_1.Usuarios.find({
                order: { username: "ASC" }
            })
                .then(usuario => { res.json(usuario); })
                .catch(err => { res.json(err.message); });
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            yield usuarios_1.Usuarios.findOne({ id })
                .then(usuario => { res.json(usuario); })
                .catch(err => { res.json(err.message); });
        });
    }
    createUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario = new usuarios_1.Usuarios();
            usuario.username = req.body.username;
            usuario.password = bcrypt.hashSync(req.body.password, 10);
            usuario.rol = req.body.rol;
            usuario.save()
                .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
        });
    }
    ;
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            usuarios_1.Usuarios.findOne({ id })
                .then((usuario) => __awaiter(this, void 0, void 0, function* () {
                console.log('usuario', usuario);
                usuario.username = req.body.username;
                usuario.password = req.body.password;
                usuario.rol = req.body.rol;
                usuario.save()
                    .then(u => {
                    res.json(u);
                })
                    .catch(err => {
                    res.json(err);
                });
            }))
                .catch(err => res.json({ message: 'No se encontró el usuario' }));
        });
    }
    deleteUsuario(req, res) {
        let id = parseInt(req.params.id);
        usuarios_1.Usuarios.findOne({ id })
            .then(usuario => {
            usuario.remove()
                .then(u => {
                res.json(u);
            })
                .catch(err => {
                res.send(err);
            });
        })
            .catch(err => { res.json(err.message); });
    }
    ;
}
exports.UsuariosController = UsuariosController;
//# sourceMappingURL=usuarios.controller.js.map