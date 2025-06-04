import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import initDb from '../../../models/initialize.js';
import db from '../../../models/index.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await initDb();

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi.' });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });

    return res.status(200).json({
      message: 'Login berhasil.',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        accessToken: token
      }
    });
  } catch (error) {
    console.error('Error di login:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
}
