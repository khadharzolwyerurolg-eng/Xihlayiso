const router = require('express').Router()
const Biography = require('../models/Biography')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const editableFields = ['name', 'title', 'summary', 'achievements', 'imageUrl', 'region', 'tags']

/**
 * @route POST:: /api/biography/register
 * Uma rota para criar biografias
 */
router.post("/register", async(req, res) => {
    try{
        const {name, title, summary, achievements, imageUrl, region, tags} = req.body; 

        if(!name || !title || !summary || !achievements || !imageUrl || !region ||  !tags){
            return res.status(400).json({
                success: false,
                message: "Missing required biography data!"
            });
        }

        const verifyBio = await Biography.findOne({ name: name.trim() })

        if(verifyBio){
            return res.status(409).json({
                success: false,
                message: "A Biography with this name already exists!"
            });
        }

        const newBiography = new Biography({
            name, 
            title,
            summary,
            achievements, 
            imageUrl, 
            region, 
            tags
        })


        const savedBiography = await newBiography.save();

        return res.status(201).json({
            success: true,
            message: "Biography has been successfully created!",
            savedBiography
        });


    }catch(err){
        console.error("Error registering biography:", err);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred while processing the request.",
        });
    }
})

/**
 * @route GET:: /api/biography/all
 * @desc Obter todas as biografias
 */
router.get("/all", async (req, res) => {
    try{
        const biographies = await Biography.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            biographies
        });
    }catch(err){
        console.error("Error retrieving biographies:", err);
        return res.status(500).json({
            success: false,
            message: "Error retrieving biographies."
        });
    }
})


/**
 * @route GET:: /api/biography/find/:id
 * @desc Obter uma biografia especificada pelo ID
 */
router.get("/find/:id", async (req, res) => {
    try{
        const { id } = req.params;

        if(!mongoose.isObjectIdOrHexString(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid biography ID."
            });
        }

        const biography = await Biography.findById(id);

        if(!biography){
            return res.status(404).json({
                success: false,
                message: "Biography not found!"
            });
        }

        return res.status(200).json({
            success: true,
            biography
        });
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error retrieving the biography.",
            error: err.message
        });
    }
})

/**
 * @route PUT:: /api/biography/update/:id
 * @desc Atualizar uma biografia pelo ID
 */
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;

    if(!mongoose.isObjectIdOrHexString(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid biography ID."
        });
    }

    const updates = Object.fromEntries(
        editableFields
            .filter(field => Object.prototype.hasOwnProperty.call(req.body || {}, field))
            .map(field => [field, req.body[field]])
    );

    if(Object.keys(updates).length === 0){
        return res.status(400).json({
            success: false,
            message: "Provide at least one valid biography field to update."
        });
    }

    try{
        if(typeof updates.name === 'string'){
            updates.name = updates.name.trim();

            const duplicate = await Biography.findOne({
                name: updates.name,
                _id: { $ne: id }
            });

            if(duplicate){
                return res.status(409).json({
                    success: false,
                    message: "A Biography with this name already exists!"
                });
            }
        }

        const biography = await Biography.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if(!biography){
            return res.status(404).json({
                success: false,
                message: "Biography not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Biography updated successfully.",
            biography
        });
    }catch(err){
        console.error("Error updating biography:", err);
        return res.status(err.name === 'ValidationError' ? 400 : 500).json({
            success: false,
            message: err.name === 'ValidationError'
                ? "Invalid biography data."
                : "Error updating the biography.",
            error: err.message
        });
    }
})

/**
 * @route DELETE:: /api/biography/delete/:id
 * @desc Apagar uma biografia pelo ID
 */
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    if(!mongoose.isObjectIdOrHexString(id)){
        return res.status(400).json({
            success: false,
            message: "Invalid biography ID."
        });
    }

    try{
        const biography = await Biography.findByIdAndDelete(id);

        if(!biography){
            return res.status(404).json({
                success: false,
                message: "Biography not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Biography deleted successfully.",
            biography
        });
    }catch(err){
        console.error("Error deleting biography:", err);
        return res.status(500).json({
            success: false,
            message: "Error deleting the biography.",
            error: err.message
        });
    }
})

module.exports = router;