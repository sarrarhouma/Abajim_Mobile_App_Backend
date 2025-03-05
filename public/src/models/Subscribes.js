const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Subscribe extends Model {}

Subscribe.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usable_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    days: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_popular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    infinite_use: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    level_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'levels',
            key: 'id'
        }
    },
    created_at: { // ✅ Associer Sequelize aux bonnes colonnes SQL
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: { // ✅ Associer Sequelize aux bonnes colonnes SQL
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Subscribe',
    tableName: 'subscribes',
    timestamps: true, // ✅ Active timestamps
    createdAt: 'created_at', // ✅ Sequelize va utiliser "created_at" au lieu de "createdAt"
    updatedAt: 'updated_at', // ✅ Sequelize va utiliser "updated_at" au lieu de "updatedAt"
});

module.exports = Subscribe;
