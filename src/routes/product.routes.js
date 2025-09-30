import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct,
  uploadProductPhotos
} from "../controllers/product.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para gestión de productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error al recuperar productos
 *   post:
 *     summary: Crear un nuevo producto con fotos
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               sellerId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               categoryId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, sold, inactive, reserved]
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       404:
 *         description: Categoría o vendedor no encontrado
 *       500:
 *         description: Error al crear producto
 */
router.get("/", getAllProducts);
router.post("/", uploadProductPhotos.array("photos", 10), createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *   put:
 *     summary: Actualizar un producto y opcionalmente reemplazar sus fotos
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               categoryId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, sold, inactive, reserved]
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Categoría no válida
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar producto
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al eliminar producto
 */
router.get("/:id", getProductById);
router.put("/:id", uploadProductPhotos.array("photos", 10), updateProduct);
router.delete("/:id", deleteProduct);

/**
 * @swagger
 * /products/{id}/status:
 *   patch:
 *     summary: Actualizar el estado de un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, sold, inactive, reserved]
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       400:
 *         description: Status no válido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al actualizar el estado
 */
router.patch("/:id/status", updateProductStatus);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         sellerId:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         categoryId:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [active, sold, inactive, reserved]
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *             description: URL de la foto
 *     ProductInput:
 *       type: object
 *       required:
 *         - sellerId
 *         - title
 *         - description
 *         - price
 *         - categoryId
 *       properties:
 *         sellerId:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         categoryId:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [active, sold, inactive, reserved]
 */
