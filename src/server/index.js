import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import cors from 'cors';
import cloudinaryRoutes from './cloudinary.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de Cloudinary (firma + delete)
app.use('/api', cloudinaryRoutes);

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
    console.log(`API Cloudinary firmada escuchando en http://localhost:${PORT}`);
});
