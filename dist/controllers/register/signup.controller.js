"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validate_1 = require("../../utils/validate");
const signup = async (req, res) => {
    try {
        // Validate request body
        const parsed = validate_1.signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                status: false,
                message: "Validation failed"
            });
        }
        const data = parsed.data;
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        // Save user in DB here (for now return success response)
        const user = {
            ...data,
            password: hashedPassword,
        };
        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: user, // remove password in production response
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            status: false,
            message: "Server error",
        });
    }
};
exports.signup = signup;
