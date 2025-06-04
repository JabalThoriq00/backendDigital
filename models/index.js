// models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db.config.js'; // Perhatikan .js di akhir

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false
  }
);

// Kita impor model dengan sintaks ESM
import UserModel from './user.model.js';

const User = UserModel(sequelize, DataTypes);
// const Product = ProductModel(sequelize, DataTypes); // opsional

// Jika ada relasi:
User.hasMany(Product, { foreignKey: 'user_id', as: 'products' });
Product.belongsTo(User, { foreignKey: 'user_id', as: 'seller' });

const db = {
  Sequelize,
  sequelize,
  User
  // Product
};

export default db;
