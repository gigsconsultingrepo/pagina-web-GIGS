// src/server/index.js

// 1. Cargar dotenv ANTES DE TODO
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// 2. Imports principales
import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary"; 


// 4. Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 5. Crear app
const app = express();
app.use(cors());
app.use(express.json());

// 6. Importar rutas (ya sin dotenv aquí)
import cloudinaryRoutes from "./cloudinary.routes.js";
import emailRoutes from "./email.routes.js";
app.use("/api", cloudinaryRoutes);
app.use("/api", emailRoutes);

// 7. Iniciar servidor
const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
