import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  getMainCategories,
  getSubcategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/main", getMainCategories);
router.get("/:id", getCategoryById);
router.get("/:parentId/subcategories", getSubcategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
