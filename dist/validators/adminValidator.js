"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminSchema = exports.addAdminSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addAdminSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    mobile: joi_1.default.string().optional(),
    profile_photo: joi_1.default.string().optional(),
    status: joi_1.default.string().optional(),
    DOB: joi_1.default.date().optional(),
    gender: joi_1.default.string().optional(),
});
exports.updateAdminSchema = joi_1.default.object({
    first_name: joi_1.default.string().optional(),
    last_name: joi_1.default.string().optional(),
    username: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().min(6).optional(),
    mobile: joi_1.default.string().optional(),
    profile_photo: joi_1.default.string().optional(),
    status: joi_1.default.string().optional(),
    DOB: joi_1.default.date().optional(),
    gender: joi_1.default.string().optional(),
});
