const Sequelize = require("sequelize");
const sequelize = require("../config/db");

// 🔹 Import des modèles
const User = require("./User");
const Webinar = require("./Webinar");
const WebinarChapter = require("./WebinarChapter");
const File = require("./File");
const FileTranslation = require("./FileTranslation");
const Manuel = require("./Manuel")(sequelize, Sequelize);
const Material = require("./Material")(sequelize, Sequelize);
const SchoolLevel = require("./SchoolLevel");
const Video = require("./Videos");

// 🔹 Notifications
const Notification = require("./Notification")(sequelize, Sequelize.DataTypes);
const NotificationStatus = require("./NotificationStatus")(sequelize, Sequelize.DataTypes);
const Favorite = require("./Favorite")(sequelize, Sequelize); 
// 🔹 Définir les relations entre modèles

// ▶️ Webinar Relations
Webinar.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });
User.hasMany(Webinar, { foreignKey: "teacher_id", as: "webinars" });
User.hasMany(Webinar, { foreignKey: "teacher_id", as: "videos" });
User.hasMany(Webinar, { foreignKey: "teacher_id", as: "teacher" });


Webinar.hasMany(WebinarChapter, { foreignKey: "webinar_id", as: "chapters" }); 
WebinarChapter.belongsTo(Webinar, { foreignKey: "webinar_id", as: "webinar" });

// ▶️ WebinarChapter → File
WebinarChapter.hasMany(File, { foreignKey: "chapter_id", as: "files" });
File.belongsTo(WebinarChapter, { foreignKey: "chapter_id", as: "chapter" });

// ▶️ File → FileTranslation
File.hasMany(FileTranslation, { foreignKey: "file_id", as: "translations" });
FileTranslation.belongsTo(File, { foreignKey: "file_id", as: "file" });

// ▶️ Manuel → Material / SchoolLevel
Manuel.belongsTo(Material, { foreignKey: "material_id", as: "material" });
Material.hasMany(Manuel, { foreignKey: "material_id" });

Manuel.belongsTo(SchoolLevel, { foreignKey: "level_id", as: "level" });
SchoolLevel.hasMany(Manuel, { foreignKey: "level_id" });

// ▶️ Notification → NotificationStatus
Notification.hasMany(NotificationStatus, {
  foreignKey: 'notification_id',
  as: 'statuses',
  onDelete: 'CASCADE'
});
NotificationStatus.belongsTo(Notification, {
  foreignKey: 'notification_id',
  as: 'notification',
  onDelete: 'CASCADE'
});
// ✅ Manuel → Video
Manuel.hasMany(Video, { foreignKey: "manuel_id", as: "videos" });
Video.belongsTo(Manuel, { foreignKey: "manuel_id", as: "manuel" });

// favorites → webinar
// Ajoute cette association
Webinar.hasMany(Favorite, { foreignKey: "webinar_id", as: "favorites" });
Favorite.belongsTo(Webinar, { foreignKey: "webinar_id", as: "webinar" });

User.hasMany(Favorite, { foreignKey: "user_id", as: "favorites" });
Favorite.belongsTo(User, { foreignKey: "user_id", as: "user" });
// 🔹 Exporter tous les modèles dans un objet db
const db = {
  sequelize,
  Sequelize,
  User,
  Webinar,
  WebinarChapter,
  File,
  FileTranslation,
  Manuel,
  Material,
  SchoolLevel,
  Notification,
  NotificationStatus,
  Video,
  Favorite
};

module.exports = db;
