"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForPgController = void 0;
const forPgService_1 = require("../../services/forPgService");
class ForPgController {
    static async create(req, res) {
        try {
            const { name } = req.body;
            // Auto-generate slug if not provided
            const slug = await forPgService_1.ForPgService.generateSlug(name);
            const categoryData = {
                name,
                slug
            };
            const newCategory = await forPgService_1.ForPgService.create(categoryData);
            res.status(201).json({
                success: true,
                message: 'For PG category created successfully',
                data: newCategory
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating For PG category',
                error: error.message
            });
        }
    }
    static async getAll(req, res) {
        try {
            const { with_count, search, page = 1, limit = 10 } = req.query;
            let categories;
            if (with_count === 'true') {
                categories = await forPgService_1.ForPgService.getCategoriesWithPgCount();
            }
            else if (search) {
                categories = await forPgService_1.ForPgService.search(search);
            }
            else {
                const offset = (parseInt(page) - 1) * parseInt(limit);
                categories = await forPgService_1.ForPgService.findAll({
                    limit: parseInt(limit),
                    offset
                });
            }
            res.status(200).json({
                success: true,
                message: 'For PG categories retrieved successfully',
                data: categories,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit)
                }
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving For PG categories',
                error: error.message
            });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await forPgService_1.ForPgService.findById(id);
            if (!category) {
                res.status(404).json({
                    success: false,
                    message: 'For PG category not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'For PG category retrieved successfully',
                data: category
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving For PG category',
                error: error.message
            });
        }
    }
    static async getBySlug(req, res) {
        try {
            const { slug } = req.params;
            const category = await forPgService_1.ForPgService.findBySlug(slug);
            if (!category) {
                res.status(404).json({
                    success: false,
                    message: 'For PG category not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'For PG category retrieved successfully',
                data: category
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving For PG category',
                error: error.message
            });
        }
    }
    static async getPopular(req, res) {
        try {
            const { limit = 10 } = req.query;
            const popularCategories = await forPgService_1.ForPgService.getPopularCategories(parseInt(limit));
            res.status(200).json({
                success: true,
                message: 'Popular For PG categories retrieved successfully',
                data: popularCategories
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving popular For PG categories',
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
                updateData.slug = await forPgService_1.ForPgService.generateSlug(updateData.name);
            }
            const [affectedRows, updatedCategories] = await forPgService_1.ForPgService.update(id, updateData);
            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'For PG category not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'For PG category updated successfully',
                data: updatedCategories[0]
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating For PG category',
                error: error.message
            });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await forPgService_1.ForPgService.delete(id);
            if (deletedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'For PG category not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'For PG category deleted successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting For PG category',
                error: error.message
            });
        }
    }
}
exports.ForPgController = ForPgController;
