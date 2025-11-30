"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Example User Routes
const express_1 = require("express");
const signup_controller_1 = require("../controllers/register/signup.controller");
// import { authenticate } from '../middlewares/authMiddleware';
const router = (0, express_1.Router)();
router.get('/signup', signup_controller_1.signup);
exports.default = router;
// {
//   "first_name": "John",
//   "last_name": "Doe",
//   "dob": "1995-12-12",
//   "email": "john@example.com",
//   "mobile": "9876543210",
//   "gender": "male",
//   "password": "secret123"
// }
