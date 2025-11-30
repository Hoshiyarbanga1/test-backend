"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgTypeController = void 0;
const pgTypeService_1 = require("../../services/pgTypeService");
class PgTypeController {
    static async create(req, res) {
        try {
            const { name } = req.body;
            // Auto-generate slug if not provided
            const slug = await pgTypeService_1.PgTypeService.generateSlug(name);
            const typeData = {
                name,
                slug
            };
            const newType = await pgTypeService_1.PgTypeService.create(typeData);
            res.status(201).json({
                success: true,
                message: 'PG type created successfully',
                data: newType
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating PG type',
                error: error.message
            });
        }
    }
    static async getAll(req, res) {
        try {
            const { with_count } = req.query;
            let types;
            if (with_count === 'true') {
                types = await pgTypeService_1.PgTypeService.getTypesWithPgCount();
            }
            else {
                types = await pgTypeService_1.PgTypeService.findAll();
            }
            res.status(200).json({
                success: true,
                message: 'PG types retrieved successfully',
                data: types
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving PG types',
                error: error.message
            });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const type = await pgTypeService_1.PgTypeService.findById(id);
            if (!type) {
                res.status(404).json({
                    success: false,
                    message: 'PG type not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'PG type retrieved successfully',
                data: type
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving PG type',
                error: error.message
            });
        }
    }
    static async getBySlug(req, res) {
        try {
            const { slug } = req.params;
            const type = await pgTypeService_1.PgTypeService.findBySlug(slug);
            if (!type) {
                res.status(404).json({
                    success: false,
                    message: 'PG type not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'PG type retrieved successfully',
                data: type
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving PG type',
                error: error.message
            });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            // If name is being updated, regenerate slug
            if (updateData.name) {
                updateData.slug = await pgTypeService_1.PgTypeService.generateSlug(updateData.name);
            }
            const [affectedRows, updatedTypes] = await pgTypeService_1.PgTypeService.update(id, updateData);
            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'PG type not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'PG type updated successfully',
                data: updatedTypes[0]
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating PG type',
                error: error.message
            });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await pgTypeService_1.PgTypeService.delete(id);
            if (deletedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'PG type not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'PG type deleted successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting PG type',
                error: error.message
            });
        }
    }
}
exports.PgTypeController = PgTypeController;
