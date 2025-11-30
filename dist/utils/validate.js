"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(2, "First name is required"),
    last_name: zod_1.z.string().min(2, "Last name is required"),
    dob: zod_1.z.string().refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid DOB",
    }),
    email: zod_1.z.string().email("Invalid email"),
    mobile: zod_1.z.string().min(10, "Invalid mobile number"),
    gender: zod_1.z.enum(["male", "female", "other"]),
    password: zod_1.z.string().min(6, "Password must be at least 6 chars"),
});
