"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Admin Routes
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin/admin.controller");
// import { addAdminSchema, updateAdminSchema } from '../validators/adminValidator';
const router = (0, express_1.Router)();
router.get('/admins', admin_controller_1.getAdmins);
// router.post('/admins', validateRequest(addAdminSchema), addAdmin);
// router.put('/admins/:id', validateRequest(updateAdminSchema), updateAdmin);
router.delete('/admins/:id', admin_controller_1.deleteAdmin);
exports.default = router;
