import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProductRating = sequelize.define("ProductRating", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.BIGINT, allowNull: false, field: "user_id" },
  productId: { type: DataTypes.BIGINT, allowNull: false, field: "product_id" },
  score: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: "product_ratings",
  timestamps: false,
  indexes: [
    { unique: true, fields: ["user_id", "product_id"] },
  ],
});

export default ProductRating;
