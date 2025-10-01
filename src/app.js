import express, { Router } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import roleRoutes from "./routes/role.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/product.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import {authenticateToken} from "./middlewares/auth.middleware.js"

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/users",userRoutes);
app.use("/roles",authenticateToken, roleRoutes);
app.use("/categories",authenticateToken, categoryRoutes);
app.use("/products",authenticateToken, productRoutes);
app.use("/conversations",authenticateToken, conversationRoutes);
app.use("/messages",authenticateToken, messageRoutes);
app.use("/notifications",authenticateToken, notificationRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("uploads"));
app.get("/files/users/:subfolder/:filename", authenticateToken, (req, res) => {
  const { filename } = req.params;  
  const { subfolder } = req.params;  
  const filePath = path.join(process.cwd(), "uploads/users",subfolder, filename);
console.log(filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: "Archivo no encontrado" });
    }
  });
});
export default app;
