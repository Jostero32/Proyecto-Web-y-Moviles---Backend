import { User, Role, UserRole } from "../models/index.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ 
        model: Role, 
        through: { attributes: [] }
      }]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Role,
        through: { attributes: [] }
      }]
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { dni, email, name, password, phone, avatarUrl, roleName } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "Email ya registrado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ dni, email, name, passwordHash, phone, avatarUrl, rating: 0 });

    // Asignar rol
    const role = await Role.findOne({ where: { roleName } });
    if (!role) return res.status(400).json({ message: "Rol no válido" });
    await UserRole.create({ userId: user.id, roleId: role.id });

    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

    // Obtener roles
    const userRoles = await UserRole.findAll({
      where: { userId: user.id },
      include: [{ model: Role, as: "Role" }]
    });
    const roles = userRoles.map(ur => ur.Role.roleName);

    const token = generateToken({ id: user.id, email: user.email, roles });
    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: "Error en login",
      error: error.message || error,
      stack: error.stack || undefined
    });
  }
};

export const createUser = async (req, res) => {
  // Puedes usar register para crear usuarios
  return register(req, res);
};

export const updateUser = async (req, res) => {
  try {
    const { name, phone, avatarUrl, roleName } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({ name, phone, avatarUrl });

    // Cambiar rol si se envía
    if (roleName) {
      const role = await Role.findOne({ where: { roleName } });
      if (!role) return res.status(400).json({ message: "Rol no válido" });
      await UserRole.destroy({ where: { userId: user.id } });
      await UserRole.create({ userId: user.id, roleId: role.id });
    }

    res.json({ message: "Usuario actualizado", user });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.message || error,
      stack: error.stack || undefined
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    await UserRole.destroy({ where: { userId: user.id } });
    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};

// Cambiar rol de usuario
export const changeUserRole = async (req, res) => {
  try {
    const { roleName } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    const role = await Role.findOne({ where: { roleName } });
    if (!role) return res.status(400).json({ message: "Rol no válido" });
    await UserRole.destroy({ where: { userId: user.id } });
    await UserRole.create({ userId: user.id, roleId: role.id });
    res.json({ message: "Rol cambiado", userId: user.id, nuevoRol: roleName });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar rol", error });
  }
};
