const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class UserLevel extends Model {}

UserLevel.init({
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  level_id: { type: DataTypes.INTEGER, allowNull: false },
  teacher_id: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: true },
  updated_at: { type: DataTypes.DATE, allowNull: true },
}, {
  sequelize,
  modelName: "UserLevel",
  tableName: "user_level",
  timestamps: false, // si tu veux que created_at et updated_at soient automatiques mets true
});

module.exports = UserLevel;
