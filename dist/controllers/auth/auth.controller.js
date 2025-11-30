"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenBlacklisted = exports.logout = exports.login = void 0;
const connection_1 = __importDefault(require("../../db/connection"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const tokenBlacklist = new Set();
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    try {
        const [rows] = await connection_1.default.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username]);
        const admin = rows.length > 0 ? rows[0] : null;
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'Login successful', token });
    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    tokenBlacklist.add(token);
    res.json({ message: 'Logout successful' });
};
exports.logout = logout;
const isTokenBlacklisted = (token) => tokenBlacklist.has(token);
exports.isTokenBlacklisted = isTokenBlacklisted;
