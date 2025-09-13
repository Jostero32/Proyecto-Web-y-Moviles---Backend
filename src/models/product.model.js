import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define("Product", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  sellerId: { type: DataTypes.BIGINT, allowNull: false, field: "seller_id" },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  categoryId: { type: DataTypes.BIGINT, allowNull: false, field: "category_id" },
  status: { 
    type: DataTypes.ENUM("active", "sold", "inactive", "reserved"),
    allowNull: false,
  },
}, {
  tableName: "products",
  timestamps: false,
});

export default Product;
