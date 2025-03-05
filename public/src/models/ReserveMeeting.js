const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const MeetingTime = require('./MeetingTime');
const User = require('./User');
const Sale = require('./Sale'); // Assuming Sale is a related model

class ReserveMeeting extends Model {}

ReserveMeeting.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    meeting_id: { type: DataTypes.INTEGER, allowNull: true },
    sale_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: { model: Sale, key: 'id' }, 
        onDelete: 'SET NULL' 
    },
    meeting_time_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: MeetingTime, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    day: { type: DataTypes.STRING(10), allowNull: false },
    date: { type: DataTypes.INTEGER, allowNull: false },
    start_at: { type: DataTypes.BIGINT, allowNull: false },
    end_at: { type: DataTypes.BIGINT, allowNull: false },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    paid_amount: { type: DataTypes.DECIMAL(13,2), allowNull: true },
    meeting_type: { 
        type: DataTypes.ENUM('in_person', 'online'), 
        allowNull: false, 
        defaultValue: 'online' 
    },
    student_count: { type: DataTypes.INTEGER, allowNull: true },
    discount: { type: DataTypes.INTEGER, allowNull: true },
    link: { type: DataTypes.STRING(255), allowNull: true },
    password: { type: DataTypes.STRING(64), allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { 
        type: DataTypes.ENUM('pending', 'open', 'finished', 'canceled'), 
        allowNull: false 
    },
    created_at: { type: DataTypes.INTEGER, allowNull: false },
    locked_at: { type: DataTypes.INTEGER, allowNull: true },
    reserved_at: { type: DataTypes.INTEGER, allowNull: true }
}, { 
    sequelize, 
    modelName: 'ReserveMeeting',
    tableName: 'reserve_meetings',
    timestamps: false
});

// Define relationships
MeetingTime.hasMany(ReserveMeeting, { foreignKey: 'meeting_time_id', onDelete: 'CASCADE' });
ReserveMeeting.belongsTo(MeetingTime, { foreignKey: 'meeting_time_id' });

User.hasMany(ReserveMeeting, { foreignKey: 'user_id', onDelete: 'CASCADE' });
ReserveMeeting.belongsTo(User, { foreignKey: 'user_id' });

Sale.hasMany(ReserveMeeting, { foreignKey: 'sale_id', onDelete: 'SET NULL' });
ReserveMeeting.belongsTo(Sale, { foreignKey: 'sale_id' });

module.exports = ReserveMeeting;
