// const Sequelize = require("sequelize");
// const sequelize = require("../config/db");

// const Manuel = require("./Manuel")(sequelize, Sequelize);
// const Material = require("./Material")(sequelize, Sequelize);

// // 🔹 Définition correcte des relations
// Manuel.belongsTo(Material, { foreignKey: "material_id", as: "material" });
// Material.hasMany(Manuel, { foreignKey: "material_id" });

// const db = {
//     sequelize,
//     Sequelize,
//     Manuel,
//     Material
// };

const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Manuel = require("./Manuel")(sequelize, Sequelize);
const Material = require("./Material")(sequelize, Sequelize);
const SchoolLevel = require("./SchoolLevel");

// 🔹 Définition correcte des relations
Manuel.belongsTo(Material, { foreignKey: "material_id", as: "material" });
Material.hasMany(Manuel, { foreignKey: "material_id" });

Manuel.belongsTo(SchoolLevel, { foreignKey: "level_id", as: "level" }); // ✅ Ajout relation manuel -> level
SchoolLevel.hasMany(Manuel, { foreignKey: "level_id" }); // ✅ Un niveau peut avoir plusieurs manuels

const db = {
    sequelize,
    Sequelize,
    Manuel,
    Material,
    SchoolLevel, // ✅ Ajout du modèle SchoolLevel dans db
};

module.exports = db;

