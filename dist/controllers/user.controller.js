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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let userExists = yield User_1.default.exists({ email: body.email });
        if (userExists) {
            return res.status(200).send({ "success": false, "data": null, "message": "Usuario ya existe" });
        }
        const user = new User_1.default({
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            email: body.email,
            role: "USER",
            createdDate: new Date()
        });
        if (user.password) {
            user.password = yield user.encryptPassword(user.password);
        }
        const savedUser = yield user.save();
        if (savedUser) {
            return res.status(200).send({ "success": true, "data": savedUser, "message": "Usuario creado" });
        }
    }
    catch (error) {
        if (error.code == 11000 || error.code == 11001) {
            return res.status(400).json({ "success": false, "data": null, "message": "Usuario ya existe" });
        }
        else {
            return res.status(400).json({ "success": false, "data": null, "message": "Error al crear un usuario" });
        }
    }
});
exports.createUser = createUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        return res.status(200).json({ "success": true, "data": users, "message": "Lista de usuarios" });
    }
    catch (error) {
        return res.status(400).json({ "success": false, "data": null, "message": "Error al listar los usuarios" });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params._id;
        const user = yield User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ "success": false, "data": null, "message": "El usuario no existe" });
        }
        else {
            return res.status(200).json({ "success": true, "data": user, "message": "Usuario encontrado" });
        }
    }
    catch (error) {
        return res.status(404).json({ "success": false, "data": null, "message": "El usuario no existe " });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        const usera = new User_1.default();
        body.password = yield usera.encryptPassword(body.password);
        const id = req.params._id;
        const user = User_1.default.findByIdAndUpdate(id, body, { new: true }, (err, user) => {
            if (err) {
                return res.status(400).json({ "success": false, "data": null, "message": "Error al modificar el usuario" });
            }
            if (!user) {
                return res.status(404).json({ "success": false, "data": null, "message": "Usuario no encontrado" });
            }
            else {
                return res.status(200).json({ "success": true, "data": user, "message": "Datos modificados" });
            }
        });
    }
    catch (error) {
        return res.status(400).json({ "success": false, "data": null, "message": "Error al modificar el usuario" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const id = req.params._id;
    const user = User_1.default.findByIdAndDelete(id, {}, (err, user) => {
        if (err) {
            return res.status(400).json({ "success": false, "data": null, "message": "Error al eliminar el usuario" });
        }
        if (user) {
            return res.status(200).json({ "success": true, "data": null, "message": "Usuario eliminado" });
        }
        else {
            return res.status(400).json({ "success": false, "data": null, "message": "Error al eliminar el usuario" });
        }
    });
};
exports.deleteUser = deleteUser;
