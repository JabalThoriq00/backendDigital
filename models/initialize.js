import db from './index.js';

async function initDb() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log('✓ Database terkoneksi & tabel sudah disinkronisasi.');
  } catch (error) {
    console.error('✗ Gagal koneksi atau sinkronisasi DB:', error);
  }
}

export default initDb;
