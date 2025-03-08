const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const WebinarChapter = require('./WebinarChapter');
const User = require('./User');

class WebinarChapterItem extends Model {}

WebinarChapterItem.init({
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    chapter_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: WebinarChapter, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    item_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { 
        type: DataTypes.ENUM('file', 'session', 'text_lesson', 'quiz', 'assignment'),
        allowNull: false
    },
    order: { type: DataTypes.INTEGER, allowNull: true },
    created_at: { type: DataTypes.BIGINT, allowNull: false }
}, { 
    sequelize, 
    modelName: 'WebinarChapterItem',
    tableName: 'webinar_chapter_items',
    timestamps: false
});

// Define relationships
WebinarChapter.hasMany(WebinarChapterItem, { foreignKey: 'chapter_id', onDelete: 'CASCADE' });
WebinarChapterItem.belongsTo(WebinarChapter, { foreignKey: 'chapter_id' });

User.hasMany(WebinarChapterItem, { foreignKey: 'user_id', onDelete: 'CASCADE' });
WebinarChapterItem.belongsTo(User, { foreignKey: 'user_id' });

module.exports = WebinarChapterItem;
