import {Category} from "../models/category.model.js";


export const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const category = await Category.create({ categoryName });
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error: error.message });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};


export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;  
  
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required in URL" });
    }
  
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({
        message: "Category deleted successfully",
        deletedCategory,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting category",
        error: error.message,
      });
    }
  };
  
