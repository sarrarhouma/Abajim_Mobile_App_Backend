const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SchoolLevel = sequelize.define("school_levels", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = SchoolLevel;
