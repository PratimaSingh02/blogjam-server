const Category = require("../models/Category");

class CategoryController {
    createCategory = async (req, res) => {
        const newCategory = new Category(req.body);//create document
        try {
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getAllCategories = async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new CategoryController();