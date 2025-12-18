// Cargar dotenv ANTES DE TODO
import dotenv from "dotenv";
dotenv.config();

// Ahora sí puedes leer process.env
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";


const router = Router();

// Leer variables YA cargadas
const cloudinary_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_secret = process.env.CLOUDINARY_API_SECRET;
const cloudinary_upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_key,
  api_secret: cloudinary_secret
});

// Diagnóstico
router.get("/media/diag", (req, res) => {
  res.json({
    ok: true,
    cloudinary_name: !!cloudinary_name,
    cloudinary_key: !!cloudinary_key,
    cloudinary_secret: !!cloudinary_secret,
    cloudinary_upload_preset: !!cloudinary_upload_preset,
    values: {
      cloudinary_name: cloudinary_name || null,
      upload_preset: cloudinary_upload_preset || null
    }
  });
});

// Ruta para firmar subida
router.post("/media/sign", (req, res) => {
  if (!cloudinary_name || !cloudinary_key || !cloudinary_secret || !cloudinary_upload_preset) {
    return res.status(500).json({
      error: "Faltan variables de entorno Cloudinary"
    });
  }

  const { folder, public_id } = req.body;
  const timestamp = Math.floor(Date.now() / 1000);

  // Construir los parámetros para la firma
  // CRÍTICO: Todos los parámetros que se envíen a Cloudinary deben estar en la firma
  const params = {
    timestamp,
    upload_preset: cloudinary_upload_preset,
  };

  if (public_id) {
    const cleanPublicId = public_id.replace(/^[^\/]+\//, '')
    params.public_id = cleanPublicId;
    params.use_filename = false;
    params.unique_filename = false;
  }

  if (folder) {
    params.folder = folder;
  }

  const signature = cloudinary.utils.api_sign_request(params, cloudinary_secret);

  res.json({
    cloudName: cloudinary_name,
    apiKey: cloudinary_key,
    uploadPreset: cloudinary_upload_preset,
    timestamp,
    signature,
    public_id: public_id || null
  });
});

// Ruta para borrar imagen en Cloudinary
router.delete("/media", async (req, res) => {
  if (!cloudinary_name || !cloudinary_key || !cloudinary_secret) {
    return res.status(500).json({
      error: "Faltan variables de entorno Cloudinary"
    });
  }

  const { public_id } = req.query;
  
  if (!public_id) {
    return res.status(400).json({
      error: "Se requiere public_id"
    });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.json({
      success: result.result === 'ok',
      result: result.result,
      public_id: public_id
    });
  } catch (error) {
    console.error('Error al borrar imagen en Cloudinary:', error);
    res.status(500).json({
      error: "Error al borrar imagen en Cloudinary",
      message: error.message
    });
  }
});

export default router;
