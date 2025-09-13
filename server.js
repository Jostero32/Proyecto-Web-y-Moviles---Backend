import app from "./src/app.js";
import sequelize from "./src/config/database.js";

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");

    await sequelize.sync({ alter: true }); // crea/actualiza tablas automáticamente
    console.log("✅ Tablas sincronizadas");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar:", error);
  }
})();
