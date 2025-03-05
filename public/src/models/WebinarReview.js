const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Webinar = require('./Webinar');
const User = require('./User');
const Bundle = require('./Bundle'); // If bundles are a separate entity

class WebinarReview extends Model {}

WebinarReview.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    webinar_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: { model: Webinar, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    bundle_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true, 
        references: { model: Bundle, key: 'id' }, 
        onDelete: 'CASCADE' 
    },
    content_quality: { type: DataTypes.INTEGER, allowNull: false },
    instructor_skills: { type: DataTypes.INTEGER, allowNull: false },
    purchase_worth: { type: DataTypes.INTEGER, allowNull: false },
    support_quality: { type: DataTypes.INTEGER, allowNull: false },
    rates: { type: DataTypes.STRING(10), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.INTEGER, allowNull: false },
    status: { 
        type: DataTypes.ENUM('pending', 'active'), 
        allowNull: false, 
        defaultValue: 'pending' 
    }
}, { 
    sequelize, 
    modelName: 'WebinarReview',
    tableName: 'webinar_reviews',
    timestamps: false
});

// Define relationships
Webinar.hasMany(WebinarReview, { foreignKey: 'webinar_id', onDelete: 'CASCADE' });
WebinarReview.belongsTo(Webinar, { foreignKey: 'webinar_id' });

User.hasMany(WebinarReview, { foreignKey: 'creator_id', onDelete: 'CASCADE' });
WebinarReview.belongsTo(User, { foreignKey: 'creator_id' });

Bundle.hasMany(WebinarReview, { foreignKey: 'bundle_id', onDelete: 'CASCADE' });
WebinarReview.belongsTo(Bundle, { foreignKey: 'bundle_id' });

module.exports = WebinarReview;
