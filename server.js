import app from "./src/app.js";
import { sequelize } from "./src/models/index.js";
import Role from "./src/models/role.model.js";
import  User from "./src/models/user.model.js";
import  UserRole  from "./src/models/userRole.model.js";

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    await sequelize.sync({ alter: true }); // crea/actualiza tablas automáticamente
    console.log("✅ Tablas sincronizadas");
    let email="email@email.com";
    let roleName="Administrador";
    await Role.bulkCreate([{id:1, roleName: roleName }, {id:2, roleName: "Comprador" },{id:3,roleName:"Vendedor"}], { ignoreDuplicates: true }); // para que no reviente si ya existen
    await User.bulkCreate([{id:1, dni: "00000000", email: email , name: "Admin", passwordHash: "$2b$10$b1c0c5afGkn2LcVcnBLLb.jugmRAc.utHMzNA2fJMhOjWU7lLG/F2", phone: "000000000", avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s", rating: 5 }
    ], { ignoreDuplicates: true }); 
    let user= await User.findOne({where:{email:email}});
    let role= await Role.findOne({where:{roleName:roleName}});
    await UserRole.bulkCreate([{ userId: user.id, roleId: role.id}],{ignoreDuplicates: true}); // para que no reviente si ya existen
    console.log("✅ Datos iniciales insertados");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar:", error);
  }
})();
