import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';

const router = Router();

const cloudinary_name = process.env.CLOUDINARY_CLOUD_NAME || 'dqokw354x';
const cloudinary_key = process.env.CLOUDINARY_API_KEY || '452258256983836';
const cloudinary_secret = process.env.CLOUDINARY_API_SECRET || 'J7WmdPMSyF_N7uTfIu7OpAQEp_c';
const cloudinary_upload_reset = process.env.CLOUDINARY_UPLOAD_PRESET || 'gigs_noticias';

cloudinary.config({
	cloud_name: cloudinary_name,
	api_key: cloudinary_key,
	api_secret: cloudinary_secret,
});

router.post('/media/sign', async (req, res) => {
	try {
		const { folder = 'noticias', public_id } = req.body || {};
		const timestamp = Math.round(Date.now() / 1000);

		const params = {
			timestamp,
			folder,
			upload_preset: cloudinary_upload_reset, 
		};
		if (public_id) params.public_id = public_id;

		const signature = cloudinary.utils.api_sign_request(
			params,
			cloudinary_secret
		);

		res.json({
			cloudName: cloudinary_name,
			apiKey: cloudinary_key,
			uploadPreset: cloudinary_upload_reset,
			timestamp,
			signature,
			folder,
			public_id,
		});
	} catch (e) {
		console.error('sign error:', e);
		res.status(500).json({ error: 'No se pudo firmar' });
	}
});

// Borrar por public_id (para edición/eliminación futuras)
router.delete('/media', async (req, res) => {
	try {
		const { public_id } = req.query;
		if (!public_id) return res.status(400).json({ error: 'public_id requerido' });
		const r = await cloudinary.uploader.destroy(public_id, { invalidate: true });
		res.json(r);
	} catch (e) {
		console.error('delete error:', e);
		res.status(500).json({ error: 'No se pudo eliminar' });
	}
});

export default router;
