const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Manuel = require("./Manuel")(sequelize, Sequelize);
const Material = require("./Material")(sequelize, Sequelize);

// 🔹 Définition correcte des relations
Manuel.belongsTo(Material, { foreignKey: "material_id", as: "material" });
Material.hasMany(Manuel, { foreignKey: "material_id" });

const db = {
    sequelize,
    Sequelize,
    Manuel,
    Material
};

module.exports = db;
