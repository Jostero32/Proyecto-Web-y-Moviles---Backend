import { Router } from "express";
import {getAllUsers,getUserById} from "../controllers/user.controller.js";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *    parameters:
 *     - in: path
 *      name: id
 *     required: true
 *    schema:
 *      type: integer
 *    description: ID del usuario
 *   tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/:id", getUserById);

export default router;
