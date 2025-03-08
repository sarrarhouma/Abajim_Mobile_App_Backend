const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Meeting = require('./Meeting');

class MeetingTime extends Model {}

MeetingTime.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    meeting_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Meeting, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    day_label: { 
        type: DataTypes.ENUM('saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'), 
        allowNull: false 
    },
    level_id: { type: DataTypes.INTEGER, allowNull: true },
    matiere_id: { type: DataTypes.INTEGER, allowNull: true },
    min_students: { type: DataTypes.INTEGER, allowNull: true },
    max_students: { type: DataTypes.INTEGER, allowNull: true },
    meet_date: { type: DataTypes.BIGINT, allowNull: true },
    created_at: { type: DataTypes.BIGINT, allowNull: false },
    start_time: { type: DataTypes.INTEGER, allowNull: false },
    end_time: { type: DataTypes.INTEGER, allowNull: false },
    submaterial_id: { type: DataTypes.INTEGER, allowNull: true }
}, { 
    sequelize, 
    modelName: 'MeetingTime',
    tableName: 'meeting_times',
    timestamps: false
});

// Define relationships
Meeting.hasMany(MeetingTime, { foreignKey: 'meeting_id', onDelete: 'CASCADE' });
MeetingTime.belongsTo(Meeting, { foreignKey: 'meeting_id' });

module.exports = MeetingTime;
