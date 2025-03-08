const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Webinar = require('./Webinar');
const User = require('./User');

class WebinarReport extends Model {}

WebinarReport.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    webinar_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Webinar, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    reason: { type: DataTypes.STRING(255), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.INTEGER, allowNull: false }
}, { 
    sequelize, 
    modelName: 'WebinarReport',
    tableName: 'webinar_reports',
    timestamps: false
});

// Define relationships
Webinar.hasMany(WebinarReport, { foreignKey: 'webinar_id', onDelete: 'CASCADE' });
WebinarReport.belongsTo(Webinar, { foreignKey: 'webinar_id' });

User.hasMany(WebinarReport, { foreignKey: 'user_id', onDelete: 'CASCADE' });
WebinarReport.belongsTo(User, { foreignKey: 'user_id' });

module.exports = WebinarReport;
