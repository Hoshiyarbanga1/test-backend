"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Username or email already exists' });
    }
    // Joi validation errors (already handled in validateRequest, but fallback)
    if (err.isJoi) {
        return res.status(400).json({ error: err.details[0].message });
    }
    // Default to 500
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
}
