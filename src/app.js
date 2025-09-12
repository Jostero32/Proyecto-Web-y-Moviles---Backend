import express, { Router } from "express";
import cors from "cors";
import morgan from "morgan";


const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas
app.use("/api", Router().get("/", (req, res) => {res.json({ message: "User route" });}));

export default app;
