"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgListController = void 0;
const pgListService_1 = require("../../services/pgListService");
const pgPicturesService_1 = require("../../services/pgPicturesService");
const pgAddressService_1 = require("../../services/pgAddressService");
const models_1 = require("../../models");
class PgListController {
    static async create(req, res) {
        try {
            const { name, description, price, pg_type, added_by, pg_owner_contact_number, address, pictures, amenity_ids, for_category_ids } = req.body;
            // Create the main PG record
            const pgData = {
                name,
                description,
                price,
                pg_type,
                added_by,
                pg_owner_contact_number,
                address: `${address?.line_1 || ''}, ${address?.city || ''}, ${address?.state || ''}`.trim()
            };
            const newPg = await pgListService_1.PgListService.create(pgData);
            // Create detailed address if provided
            if (address) {
                await pgAddressService_1.PgAddressService.create({
                    pg_id: newPg.id,
                    line_1: address.line_1,
                    line_2: address.line_2,
                    landmark: address.landmark,
                    city: address.city,
                    state: address.state,
                    country: address.country || 'India',
                    zip: address.zip
                });
            }
            // Add pictures if provided
            if (pictures && pictures.length > 0) {
                await pgPicturesService_1.PgPicturesService.addMultiplePictures(newPg.id, pictures);
            }
            // Add amenities if provided
            if (amenity_ids && amenity_ids.length > 0) {
                for (const amenityId of amenity_ids) {
                    await pgListService_1.PgListService.addAmenity(newPg.id, amenityId);
                }
            }
            // Add for categories if provided
            if (for_category_ids && for_category_ids.length > 0) {
                for (const categoryId of for_category_ids) {
                    await models_1.PgFor.create({
                        pg_id: newPg.id,
                        for_pg_id: categoryId
                    });
                }
            }
            // Fetch the complete PG with all relationships
            const completePg = await pgListService_1.PgListService.findById(newPg.id);
            res.status(201).json({
                success: true,
                message: 'PG created successfully with all related data',
                data: completePg
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating PG',
                error: error.message
            });
        }
    }
    static async getAll(req, res) {
        try {
            const { page = 1, limit = 10, pg_type, min_price, max_price, location } = req.query;
            let pgs;
            if (pg_type) {
                pgs = await pgListService_1.PgListService.findByType(pg_type);
            }
            else if (min_price && max_price) {
                pgs = await pgListService_1.PgListService.findByPriceRange(parseFloat(min_price), parseFloat(max_price));
            }
            else if (location) {
                pgs = await pgListService_1.PgListService.searchByLocation(location);
            }
            else {
                const offset = (parseInt(page) - 1) * parseInt(limit);
                pgs = await pgListService_1.PgListService.findAll({
                    limit: parseInt(limit),
                    offset
                });
            }
            res.status(200).json({
                success: true,
                message: 'PGs retrieved successfully',
                data: pgs,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit)
                }
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving PGs',
                error: error.message
            });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const pg = await pgListService_1.PgListService.findById(id);
            if (!pg) {
                res.status(404).json({
                    success: false,
                    message: 'PG not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'PG retrieved successfully',
                data: pg
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving PG',
                error: error.message
            });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const [affectedRows, updatedPgs] = await pgListService_1.PgListService.update(id, updateData);
            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'PG not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'PG updated successfully',
                data: updatedPgs[0]
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating PG',
                error: error.message
            });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedRows = await pgListService_1.PgListService.delete(id);
            if (deletedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'PG not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'PG deleted successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting PG',
                error: error.message
            });
        }
    }
    static async addAmenity(req, res) {
        try {
            const { pgId, amenityId } = req.body;
            const pgAmenity = await pgListService_1.PgListService.addAmenity(pgId, amenityId);
            res.status(201).json({
                success: true,
                message: 'Amenity added to PG successfully',
                data: pgAmenity
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error adding amenity to PG',
                error: error.message
            });
        }
    }
    static async removeAmenity(req, res) {
        try {
            const { pgId, amenityId } = req.params;
            const deletedRows = await pgListService_1.PgListService.removeAmenity(pgId, amenityId);
            if (deletedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'PG-Amenity association not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Amenity removed from PG successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error removing amenity from PG',
                error: error.message
            });
        }
    }
    static async addPictures(req, res) {
        try {
            const { pgId } = req.params;
            const { pictures } = req.body;
            if (!pictures || pictures.length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'Pictures array is required'
                });
                return;
            }
            const addedPictures = await pgPicturesService_1.PgPicturesService.addMultiplePictures(pgId, pictures);
            res.status(201).json({
                success: true,
                message: 'Pictures added successfully',
                data: addedPictures
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error adding pictures',
                error: error.message
            });
        }
    }
    static async removePicture(req, res) {
        try {
            const { pictureId } = req.params;
            const deletedRows = await pgPicturesService_1.PgPicturesService.delete(pictureId);
            if (deletedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Picture not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Picture removed successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error removing picture',
                error: error.message
            });
        }
    }
    static async updateAddress(req, res) {
        try {
            const { pgId } = req.params;
            const addressData = req.body;
            const [affectedRows, updatedAddresses] = await pgAddressService_1.PgAddressService.updateByPgId(pgId, addressData);
            if (affectedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Address not found for this PG'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Address updated successfully',
                data: updatedAddresses[0]
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating address',
                error: error.message
            });
        }
    }
    static async addForCategory(req, res) {
        try {
            const { pgId, categoryId } = req.body;
            const pgFor = await models_1.PgFor.create({
                pg_id: pgId,
                for_pg_id: categoryId
            });
            res.status(201).json({
                success: true,
                message: 'Category added to PG successfully',
                data: pgFor
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error adding category to PG',
                error: error.message
            });
        }
    }
    static async removeForCategory(req, res) {
        try {
            const { pgId, categoryId } = req.params;
            const deletedRows = await models_1.PgFor.destroy({
                where: {
                    pg_id: pgId,
                    for_pg_id: categoryId
                }
            });
            if (deletedRows === 0) {
                res.status(404).json({
                    success: false,
                    message: 'PG-Category association not found'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Category removed from PG successfully'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error removing category from PG',
                error: error.message
            });
        }
    }
}
exports.PgListController = PgListController;
