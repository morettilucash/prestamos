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
const jwt = __importStar(require("jsonwebtoken"));
function jwtAdminMidleware(req, res, next) {
    const authString = req.headers['authorization'];
    if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
        const authArray = authString.split(' ');
        const token = authArray[1];
        jwt.verify(token, process.env.PKEY, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.status(403).send({
                    ok: false,
                    msg: 'Token no válido: No tiene autorización para este recurso',
                    error: err
                });
            }
            else {
                if (decoded.rol == 'ADMIN') {
                    next();
                }
                else {
                    res.status(403).send({
                        ok: false,
                        msg: 'Token no válido: No tiene autorización para este recurso',
                        error: err
                    });
                }
            }
        }));
    }
    else {
        res.status(403).send({
            ok: false,
            msg: 'Token no válido: No tiene autorización para este recurso'
        });
    }
}
exports.jwtAdminMidleware = jwtAdminMidleware;
//# sourceMappingURL=auth_mw.js.map