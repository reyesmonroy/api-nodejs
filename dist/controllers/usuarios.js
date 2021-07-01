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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuario_1.default.findAll();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (usuario) {
            return res.status(200).json(usuario);
        }
        res.status(404).json({
            error: `No se contro el recurso con el id ${id}`
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo cargar los datos'
        });
        console.log(error);
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                error: 'Ya existe un usuario con el mismo email' + body.email
            });
        }
        const usuario = yield usuario_1.default.create(body);
        res.status(201).json(usuario);
    }
    catch (error) {
        res.status(500).json({
            error: 'No se pudo crear el usuario'
        });
        console.log(error);
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                error: `No existe un usuario con el id ${id}`
            });
        }
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update(body));
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(500).json({
            error: 'No se actualizaron los datos'
        });
        console.log(error);
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                error: `No existe un usuario con el id ${id}`
            });
        }
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({
            estado: false
        }));
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(500).json({
            error: 'No se eliminarion los datos'
        });
        console.log(error);
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map