import bcrypt from 'bcrypt';
import initDb from '../../../models/initialize.js';
import db from '../../../models/index.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  await initDb();

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = await db.User.create({ name, email, password_hash });

    return res.status(201).json({
      message: 'Registrasi berhasil.',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Error di register:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
}
