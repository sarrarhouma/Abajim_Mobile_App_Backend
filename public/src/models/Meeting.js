const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

class Meeting extends Model {}

Meeting.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teacher_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    amount: { type: DataTypes.INTEGER, allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    group_meeting: { type: DataTypes.BOOLEAN, defaultValue: false },
    online_group_min_student: { type: DataTypes.INTEGER, allowNull: true },
    online_group_max_student: { type: DataTypes.INTEGER, allowNull: true },
    online_group_amount: { type: DataTypes.INTEGER, allowNull: true },
    disabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.INTEGER, allowNull: false },
    discount_start_date: { type: DataTypes.BIGINT, allowNull: true },
    discount_end_date: { type: DataTypes.BIGINT, allowNull: true }
}, { 
    sequelize, 
    modelName: 'Meeting',
    tableName: 'meetings',
    timestamps: false
});

// Define relationships
User.hasMany(Meeting, { foreignKey: 'teacher_id', onDelete: 'CASCADE' });
Meeting.belongsTo(User, { foreignKey: 'teacher_id' });

module.exports = Meeting;
