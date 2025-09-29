
import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         dni:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         phone:
 *           type: string
 *         avatarUrl:
 *           type: string
 *         rating:
 *           type: number
 *         Roles:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               roleName:
 *                 type: string
 *     UserRegister:
 *       type: object
 *       required:
 *         - dni
 *         - email
 *         - name
 *         - lastname
 *         - password
 *         - phone
 *         - avatarUrl
 *         - roleId
 *       properties:
 *         dni:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         avatarUrl:
 *           type: string
 *         roleId:
 *           type: integer
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         phone:
 *           type: string
 *         avatarUrl:
 *           type: string
 *         roleId:
 *           type: integer
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/",authenticateToken, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id",authenticateToken, getUserById);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Email ya registrado o rol no válido
 */
router.post("/register", createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token
 *       400:
 *         description: Usuario no encontrado o contraseña incorrecta
 */
router.post("/login", login);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:id",authenticateToken, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id",authenticateToken, deleteUser);

export default router;
