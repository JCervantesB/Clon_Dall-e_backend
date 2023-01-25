import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'No se pudieron obtener las publicaciones, inténtalo de nuevo' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { nombre, instrucciones, imagen } = req.body;
    const imagenUrl = await cloudinary.uploader.upload(imagen);

    const nuevoPost = await Post.create({
      nombre,
      instrucciones,
      imagen: imagenUrl.url,
    });

    res.status(200).json({ success: true, data: nuevoPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'No se puede crear una publicación, inténtalo de nuevo' });
  }
});

export default router;