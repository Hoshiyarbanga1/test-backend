"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('authRoutes loaded');
// Auth Routes
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth/auth.controller");
const router = (0, express_1.Router)();
console.log('authRoutes loaded');
router.post('/admin/login', auth_controller_1.login);
router.post('/admin/logout', auth_controller_1.logout);
exports.default = router;
