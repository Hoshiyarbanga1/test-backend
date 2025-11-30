"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAmenityFromPgValidator = exports.addAmenityToPgValidator = exports.pgQueryValidator = exports.pgIdValidator = exports.updatePgListValidator = exports.createPgListValidator = void 0;
const { body, param, query } = require('express-validator');
exports.createPgListValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be between 3 and 100 characters'),
    body('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('pg_type')
        .isIn(['boys', 'girls', 'co-ed'])
        .withMessage('PG type must be boys, girls, or co-ed'),
    body('added_by')
        .isUUID()
        .withMessage('Added by must be a valid UUID'),
    body('pg_owner_contact_number')
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please enter a valid contact number'),
    // Address validation
    body('address.line_1')
        .notEmpty()
        .withMessage('Address line 1 is required'),
    body('address.city')
        .notEmpty()
        .withMessage('City is required'),
    body('address.state')
        .notEmpty()
        .withMessage('State is required'),
    body('address.zip')
        .matches(/^[1-9][0-9]{5}$/)
        .withMessage('ZIP code must be a valid 6-digit Indian postal code'),
    // Pictures validation
    body('pictures')
        .optional()
        .isArray()
        .withMessage('Pictures must be an array'),
    body('pictures.*')
        .optional()
        .isURL()
        .withMessage('Each picture must be a valid URL'),
    // Amenities validation
    body('amenity_ids')
        .optional()
        .isArray()
        .withMessage('Amenity IDs must be an array'),
    body('amenity_ids.*')
        .optional()
        .isUUID()
        .withMessage('Each amenity ID must be a valid UUID'),
    // For categories validation
    body('for_category_ids')
        .optional()
        .isArray()
        .withMessage('For category IDs must be an array'),
    body('for_category_ids.*')
        .optional()
        .isUUID()
        .withMessage('Each for category ID must be a valid UUID')
];
exports.updatePgListValidator = [
    body('name')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be between 3 and 100 characters'),
    body('description')
        .optional()
        .isLength({ max: 1000 })
        .withMessage('Description must not exceed 1000 characters'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('pg_type')
        .optional()
        .isIn(['boys', 'girls', 'co-ed'])
        .withMessage('PG type must be boys, girls, or co-ed'),
    body('address')
        .optional()
        .isLength({ min: 10, max: 500 })
        .withMessage('Address must be between 10 and 500 characters'),
    body('pg_owner_contact_number')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please enter a valid contact number')
];
exports.pgIdValidator = [
    param('id')
        .isUUID()
        .withMessage('PG ID must be a valid UUID')
];
exports.pgQueryValidator = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    query('pg_type')
        .optional()
        .isIn(['boys', 'girls', 'co-ed'])
        .withMessage('PG type must be boys, girls, or co-ed'),
    query('min_price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be a positive number'),
    query('max_price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be a positive number'),
    query('location')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('Location must be between 2 and 100 characters')
];
exports.addAmenityToPgValidator = [
    body('pgId')
        .isUUID()
        .withMessage('PG ID must be a valid UUID'),
    body('amenityId')
        .isUUID()
        .withMessage('Amenity ID must be a valid UUID')
];
exports.removeAmenityFromPgValidator = [
    param('pgId')
        .isUUID()
        .withMessage('PG ID must be a valid UUID'),
    param('amenityId')
        .isUUID()
        .withMessage('Amenity ID must be a valid UUID')
];
