"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post('/user', user_controller_1.createUser);
router.get('/user', user_controller_1.getAll);
router.get('/', (req, res) => {
    res.send("Response OK");
});
exports.default = router;
