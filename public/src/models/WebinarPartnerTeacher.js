const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Webinar = require('./Webinar');
const User = require('./User');

class WebinarPartnerTeacher extends Model {}

WebinarPartnerTeacher.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    webinar_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Webinar, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    teacher_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' }, 
        onDelete: 'CASCADE' 
    }
}, { 
    sequelize, 
    modelName: 'WebinarPartnerTeacher',
    tableName: 'webinar_partner_teacher',
    timestamps: false
});

// Define relationships
Webinar.hasMany(WebinarPartnerTeacher, { foreignKey: 'webinar_id', onDelete: 'CASCADE' });
WebinarPartnerTeacher.belongsTo(Webinar, { foreignKey: 'webinar_id' });

User.hasMany(WebinarPartnerTeacher, { foreignKey: 'teacher_id', onDelete: 'CASCADE' });
WebinarPartnerTeacher.belongsTo(User, { foreignKey: 'teacher_id' });

module.exports = WebinarPartnerTeacher;
