import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import UserRole from "../models/userRole.model.js";
import Category from "../models/category.model.js";
import { NotificationType } from "../models/index.js";

export async function seedData() {
  try {
    console.log("🌱 Insertando datos iniciales...");

    // Roles
    await Role.bulkCreate(
      [
        { id: 1, roleName: "Administrador" },
        { id: 2, roleName: "Usuario" }
      ],
      { ignoreDuplicates: true }
    );

    // Usuario Admin
    let email = "email@email.com";
    await User.bulkCreate(
      [
        {
          id: 1,
          dni: "00000000",
          email: email,
          name: "Admin",
          lastname: "Admin",
          passwordHash:
            "$2b$10$b1c0c5afGkn2LcVcnBLLb.jugmRAc.utHMzNA2fJMhOjWU7lLG/F2",
          phone: "000000000",
          avatarUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s",
          rating: 5,
        },
      ],
      { ignoreDuplicates: true }
    );

    // Relación User-Role
    let user = await User.findOne({ where: { email } });
    let role = await Role.findOne({ where: { roleName: "Administrador" } });
    await UserRole.bulkCreate(
      [{ userId: user.id, roleId: role.id }],
      { ignoreDuplicates: true }
    );

    // Categorías principales y subcategorías
    const categories = [
      {
        name: "Electrónica",
        description: "Tecnología y dispositivos",
        subcategories: [
          { name: "Celulares y accesorios", description: "Smartphones, fundas, cargadores" },
          { name: "Computadoras y laptops", description: "PC, portátiles y accesorios" },
          { name: "Consolas y videojuegos", description: "Consolas, juegos y accesorios" },
        ],
      },
      {
        name: "Moda",
        description: "Ropa y accesorios",
        subcategories: [
          { name: "Ropa de hombre", description: "Camisetas, pantalones, chaquetas" },
          { name: "Ropa de mujer", description: "Vestidos, blusas, faldas" },
          { name: "Zapatos", description: "Calzado para todas las edades" },
        ],
      },
      {
        name: "Hogar y muebles",
        description: "Muebles, decoración y más",
        subcategories: [
          { name: "Muebles de sala", description: "Sofás, mesas de centro" },
          { name: "Cocina", description: "Utensilios y electrodomésticos pequeños" },
          { name: "Decoración", description: "Cuadros, lámparas, adornos" },
        ],
      },
    ];


    for (const cat of categories) {
      const [category] = await Category.findOrCreate({
        where: { name: cat.name },
        defaults: {
          name: cat.name,
          description: cat.description,
          parentCategoryId: null,
        },
      });

      for (const sub of cat.subcategories) {
        await Category.findOrCreate({
          where: { name: sub.name },
          defaults: {
            name: sub.name,
            description: sub.description,
            parentCategoryId: category.id,
          },
        });
      }
    }

    await NotificationType.bulkCreate(
      [
        { id: 1, typeName: "Mensaje" },
        { id: 2, typeName: "Alerta" },
        { id: 3, typeName: "Recordatorio" },
      ],
      { ignoreDuplicates: true }
    );

    console.log("✅ Datos iniciales insertados correctamente");
  } catch (error) {
    console.error("❌ Error en seedData:", error);
  }
}
