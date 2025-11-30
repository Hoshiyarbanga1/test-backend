"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmenitiesController = void 0;
const amenitiesService_1 = require("../../services/amenitiesService");
class AmenitiesController {
    static async create(req, res) {
        try {
            const { name, description } = req.body;
            // Auto-generate slug if not provided
            const slug = await amenitiesService_1.AmenitiesService.generateSlug(name);
            const amenityData = {
                name,
                description,
                slug
            };
            const newAmenity = await amenitiesService_1.AmenitiesService.create(amenityData);
            res.status(201).json({
                success: true,
                message: 'Amenity created successfully',
                data: newAmenity
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating amenity',
                error: error.message
            });
        }
    }
    static async getAll(req, res) {
        try {
            const { search, page = 1, limit = 10 } = req.query;
            let amenities;
            if (search) {
                amenities = await amenitiesService_1.AmenitiesService.search(search);
            }
            else {
                const offset = (parseInt(page) - 1) * parseInt(limit);
                amenities = await amenitiesService_1.AmenitiesService.findAll({
                    limit: parseInt(limit),
                    offset
                });
            }
            res.status(200).json({
                success: true,
                message: 'Amenities retrieved successfully',
                data: amenities,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit)
                }
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving amenities',
                error: error.message
            });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const amenity = await amenitiesService_1.AmenitiesService.findById(id);
            if (!amenity) {
                res.status(404).json({
                    success: false,
                    message: 'Amenity not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Amenity retrieved successfully',
                data: amenity
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving amenity',
                error: error.message
            });
        }
    }
    static async getBySlug(req, res) {
        try {
            const { slug } = req.params;
            const amenity = await amenitiesService_1.AmenitiesService.findBySlug(slug);
            if (!amenity) {
                res.status(404).json({
                    success: false,
                    message: 'Amenity not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Amenity retrieved successfully',
                data: amenity
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving amenity',
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
                updateData.slug = await amenitiesService_1.AmenitiesService.generateSlug(updateData.name);
            }
            const [affectedRows, updatedAmenities] = await amenitiesService_1.AmenitiesService.update(id, updateData);
            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Amenity not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Amenity updated successfully',
                data: updatedAmenities[0]
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating amenity',
                error: error.message
            });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await amenitiesService_1.AmenitiesService.delete(id);
            if (deletedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Amenity not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Amenity deleted successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting amenity',
                error: error.message
            });
        }
    }
    static async getPopular(req, res) {
        try {
            const { limit = 10 } = req.query;
            const popularAmenities = await amenitiesService_1.AmenitiesService.getPopularAmenities(parseInt(limit));
            res.status(200).json({
                success: true,
                message: 'Popular amenities retrieved successfully',
                data: popularAmenities
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving popular amenities',
                error: error.message
            });
        }
    }
}
exports.AmenitiesController = AmenitiesController;
