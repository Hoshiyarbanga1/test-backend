"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.addAdmin = exports.getAdmins = void 0;
const adminService = __importStar(require("../../services/adminService"));
const adminDetailService = __importStar(require("../../services/adminDetailService"));
const getAdmins = (req, res) => {
    res.json(adminService.getAdmins());
};
exports.getAdmins = getAdmins;
const addAdmin = async (req, res, next) => {
    try {
        const { first_name, last_name, username, email, password, status, deleted_at, created_at, updated_at, ...detailFields } = req.body;
        const adminData = { first_name, last_name, username, email, password, status, deleted_at, created_at, updated_at };
        const detailData = { ...detailFields };
        const result = await adminDetailService.addAdminWithDetail(adminData, detailData);
        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
};
exports.addAdmin = addAdmin;
const updateAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const { first_name, last_name, username, email, password, status, deleted_at, created_at, updated_at, ...detailFields } = req.body;
        const adminData = { first_name, last_name, username, email, password, status, deleted_at, created_at, updated_at };
        const detailData = { ...detailFields };
        const updated = await adminDetailService.updateAdminWithDetail(id, adminData, detailData);
        if (!updated)
            return res.status(404).json({ error: 'Admin not found' });
        res.json({
            success: true,
            message: 'Admin updated successfully',
            data: updated
        });
    }
    catch (err) {
        console.error('Update admin error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => {
    const id = Number(req.params.id);
    const deleted = adminService.deleteAdmin(id);
    if (!deleted)
        return res.status(404).json({ error: 'Admin not found' });
    res.json({ message: 'Admin deleted' });
};
exports.deleteAdmin = deleteAdmin;
