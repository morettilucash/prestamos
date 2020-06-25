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
const clientes_1 = require("../Entities/clientes");
const faker = __importStar(require("faker"));
class ClientesController {
    constructor() {
    }
    createClienteFaker(req, res) {
        let cliente = new clientes_1.Clientes();
        // cliente = ;
        cliente.nombre = faker.name.firstName();
        cliente.apellido = faker.name.lastName();
        cliente.domicilio = faker.address.streetAddress();
        cliente.email = faker.internet.email();
        cliente.created_at = faker.date.recent();
        cliente.updated_at = faker.date.recent();
        cliente.telefono = faker.phone.phoneNumber();
        cliente.save()
            .then(u => {
            res.send(u);
        })
            .catch(err => {
            res.send(err);
        });
    }
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield clientes_1.Clientes.find({
                order: { nombre: "ASC" }
            })
                .then(cliente => { res.json(cliente); })
                .catch(err => { res.json(err.message); });
        });
    }
    getCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            yield clientes_1.Clientes.findOne({ id })
                .then(cliente => { res.json(cliente); })
                .catch(err => { res.json(err.message); });
        });
    }
    createCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cliente = new clientes_1.Clientes();
            let telefono = req.body.telefono;
            cliente.telefono = telefono;
            cliente.nombre = req.body.nombre;
            cliente.apellido = req.body.apellido;
            cliente.domicilio = req.body.domicilio;
            cliente.localidad = req.body.localidad;
            cliente.created_at = new Date();
            cliente.updated_at = new Date();
            yield new Promise((resolve, reject) => {
                clientes_1.Clientes.findOne({ telefono })
                    .then(u => {
                    if (u) {
                        res.json('El número de teléfono ya se encuentra registrado.');
                    }
                    else {
                        resolve();
                    }
                })
                    .catch(err => {
                    res.json(err.message);
                    reject();
                });
            });
            cliente.save()
                .then(u => {
                res.json(u);
            }).catch(err => {
                res.json(err);
            });
        });
    }
    ;
    updateCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = parseInt(req.params.id);
            let telefono = req.body.telefono;
            clientes_1.Clientes.findOne({ id })
                .then((cliente) => __awaiter(this, void 0, void 0, function* () {
                console.log('cliente', cliente);
                cliente.nombre = req.body.nombre;
                cliente.apellido = req.body.apellido;
                cliente.domicilio = req.body.domicilio;
                cliente.localidad = req.body.localidad;
                cliente.updated_at = new Date();
                if (cliente.telefono !== telefono) {
                    yield new Promise((resolve, reject) => {
                        clientes_1.Clientes.findOne({ telefono })
                            .then(u => {
                            if (u) {
                                res.json('El número de teléfono ya se encuentra registrado.');
                            }
                            else {
                                cliente.telefono = telefono;
                                resolve();
                            }
                        })
                            .catch(err => {
                            res.json(err.message);
                            reject();
                        });
                    });
                }
                yield new Promise((resolve, reject) => {
                    cliente.save()
                        .then(u => {
                        res.json(u);
                    })
                        .catch(err => {
                        res.json(err);
                        reject();
                    });
                });
            }))
                .catch(err => res.json({ message: 'No se encontró el cliente' }));
        });
    }
    deleteCliente(req, res) {
        let id = parseInt(req.params.id);
        clientes_1.Clientes.findOne({ id })
            .then(cliente => {
            cliente.remove()
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
    findByTxtPaginated(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageNro = req.query.pageNro;
            let pageSize = req.query.pageSize;
            let filter = req.query.filter || '';
            let attr = req.query.attr || 'nombre'; // columna por la cual filtrar
            let clientes = yield clientes_1.Clientes.findByTxtPaginated(pageNro, pageSize, attr, filter);
            res.send({ clientes });
        });
    }
}
exports.ClientesController = ClientesController;
//# sourceMappingURL=clientes.controller.js.map