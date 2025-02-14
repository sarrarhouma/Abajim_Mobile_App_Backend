const db = require("../models");
const Manuel = db.Manuel;
const Material = db.Material;

exports.getAllManuels = async () => {
    return await Manuel.findAll({
        include: [{ model: Material, as: "material", attributes: ["name"] }],
    });
};

exports.getManuelById = async (id) => {
    return await Manuel.findOne({
        where: { id },
        include: [{ model: Material, as: "material", attributes: ["name"] }],
    });
};
