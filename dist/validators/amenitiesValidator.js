"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popularAmenitiesValidator = exports.amenityQueryValidator = exports.amenitySlugValidator = exports.amenityIdValidator = exports.updateAmenitiesValidator = exports.createAmenitiesValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createAmenitiesValidator = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters')
];
exports.updateAmenitiesValidator = [
    (0, express_validator_1.body)('name')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description must not exceed 500 characters')
];
exports.amenityIdValidator = [
    (0, express_validator_1.param)('id')
        .isUUID()
        .withMessage('Amenity ID must be a valid UUID')
];
exports.amenitySlugValidator = [
    (0, express_validator_1.param)('slug')
        .matches(/^[a-z0-9-]+$/)
        .withMessage('Slug must contain only lowercase letters, numbers, and hyphens')
        .isLength({ min: 2, max: 50 })
        .withMessage('Slug must be between 2 and 50 characters')
];
exports.amenityQueryValidator = [
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    (0, express_validator_1.query)('search')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('Search term must be between 2 and 50 characters')
];
exports.popularAmenitiesValidator = [
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Limit must be between 1 and 50')
];
