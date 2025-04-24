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
const Meeting = require('./Meeting');
const MeetingFile = require('./MeetingFile');
const MeetingTime = require('./MeetingTime');
const ReserveMeeting = require('./ReserveMeeting');
const Sale = require('./Sale');
const Submaterial = require("./Submaterial");
const Notification = require("./Notification")(sequelize, Sequelize.DataTypes);
const NotificationStatus = require("./NotificationStatus")(sequelize, Sequelize.DataTypes);
const Favorite = require("./Favorite")(sequelize, Sequelize); 
const Order = require('./Order')(sequelize, Sequelize.DataTypes);
const OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes);
const Cart = require("./Cart")(sequelize, Sequelize.DataTypes);

// 🔹 Regrouper les modèles pour relations croisées
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
  Favorite,
  Meeting,
  MeetingFile,
  MeetingTime,
  ReserveMeeting,
  Sale,
  Submaterial,
  Order,
  OrderItem,
  Cart,
};

// ▶️ Définir toutes les relations entre modèles avec commentaires explicatifs
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

// 🌍 Chaque fichier peut avoir plusieurs traductions
File.hasMany(FileTranslation, { foreignKey: "file_id", as: "translations" });
FileTranslation.belongsTo(File, { foreignKey: "file_id", as: "file" });

// 📘 Manuel lié à sa matière et son niveau scolaire
Manuel.belongsTo(Material, { foreignKey: "material_id", as: "material" });
Material.hasMany(Manuel, { foreignKey: "material_id" });
Manuel.belongsTo(SchoolLevel, { foreignKey: "level_id", as: "level" });
SchoolLevel.hasMany(Manuel, { foreignKey: "level_id" });

// 🔔 Notifications et leurs statuts
Notification.hasMany(NotificationStatus, { foreignKey: 'notification_id', as: 'statuses', onDelete: 'CASCADE' });
NotificationStatus.belongsTo(Notification, { foreignKey: 'notification_id', as: 'notification', onDelete: 'CASCADE' });

// 🎥 Manuel contient des vidéos
Manuel.hasMany(Video, { foreignKey: "manuel_id", as: "videos" });
Video.belongsTo(Manuel, { foreignKey: "manuel_id", as: "manuel" });

// ❤️ Favoris par utilisateur et par webinar
Webinar.hasMany(Favorite, { foreignKey: "webinar_id", as: "favorites" });
Favorite.belongsTo(Webinar, { foreignKey: "webinar_id", as: "webinar" });
User.hasMany(Favorite, { foreignKey: "user_id", as: "favorites" });
Favorite.belongsTo(User, { foreignKey: "user_id", as: "user" });

// 🗓️ Un meeting contient des fichiers (PDF, docs...)
Meeting.hasMany(MeetingFile, { foreignKey: 'meeting_id', as: 'files' });
MeetingFile.belongsTo(Meeting, { foreignKey: 'meeting_id', as: 'meeting' });

// 🕒 Un fichier de meeting a des horaires disponibles
MeetingFile.hasMany(MeetingTime, { foreignKey: 'meeting_id', as: 'times' });
MeetingTime.belongsTo(MeetingFile, { foreignKey: 'meeting_id', as: 'file' });

// 📅 Un horaire peut être réservé plusieurs fois
MeetingTime.hasMany(ReserveMeeting, { foreignKey: 'meeting_time_id', as: 'reservations' });
ReserveMeeting.belongsTo(MeetingTime, { foreignKey: 'meeting_time_id', as: 'time' });

// 🧩 Matière et sous-matière liées au matériel
Material.hasMany(Submaterial, { foreignKey: "material_id", as: "submaterials" });
Submaterial.belongsTo(Material, { foreignKey: "material_id", as: "material" });

// 💰 Achats entre utilisateurs (acheteur / vendeur)
User.hasMany(Sale, { foreignKey: 'buyer_id', as: 'purchases' });
User.hasMany(Sale, { foreignKey: 'seller_id', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });
Sale.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

// 💼 Un sale peut concerner un webinar ou un meeting
Webinar.hasMany(Sale, { foreignKey: 'webinar_id', as: 'webinarSales' });
Sale.belongsTo(Webinar, { foreignKey: 'webinar_id', as: 'webinar' });
Meeting.hasMany(Sale, { foreignKey: 'meeting_id', as: 'meetingSales' });
Sale.belongsTo(Meeting, { foreignKey: 'meeting_id', as: 'meeting' });

// 🔄 Réservations liées aux meetings
ReserveMeeting.belongsTo(Meeting, { foreignKey: 'meeting_id', as: 'meeting' });
Meeting.hasMany(ReserveMeeting, { foreignKey: 'meeting_id', as: 'meeting_reservations' });
ReserveMeeting.belongsTo(MeetingTime, { foreignKey: 'meeting_time_id', as: 'meetingTime' });
MeetingTime.hasMany(ReserveMeeting, { foreignKey: 'meeting_time_id', as: 'meetingTime_reservations' });
ReserveMeeting.belongsTo(Sale, { foreignKey: 'sale_id', as: 'sale' });
Sale.hasMany(ReserveMeeting, { foreignKey: 'sale_id', as: 'sale_reservations' });
ReserveMeeting.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(ReserveMeeting, { foreignKey: 'user_id', as: 'user_reservations' });

// 👨‍🏫 Meeting est lié à un enseignant
Meeting.belongsTo(User, { foreignKey: 'teacher_id', as: 'teacher' });
User.hasMany(Meeting, { foreignKey: 'teacher_id', as: 'meetings' });

// ⏰ Meeting → horaires
Meeting.hasMany(MeetingTime, { foreignKey: 'meeting_id', as: 'times' });
MeetingTime.belongsTo(Meeting, { foreignKey: 'meeting_id', as: 'meeting' });
MeetingTime.belongsTo(Material, { as: 'material', foreignKey: 'matiere_id' });
Material.hasMany(MeetingTime, { as: 'times', foreignKey: 'matiere_id' });
MeetingTime.belongsTo(Submaterial, { as: 'submaterial', foreignKey: 'submaterial_id' });
Submaterial.hasMany(MeetingTime, { as: 'times', foreignKey: 'submaterial_id' });

// 🧾 Paiement : Order et OrderItems
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(OrderItem, { foreignKey: 'user_id', as: 'order_items' });
OrderItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 🛒 Panier : relation avec webinars et meetings
User.hasMany(Cart, { foreignKey: "creator_id", as: "cart_items" });
Cart.belongsTo(User, { foreignKey: "creator_id", as: "creator" });
Cart.belongsTo(Webinar, { foreignKey: 'webinar_id', as: 'webinar' });
Cart.belongsTo(Meeting, { foreignKey: 'reserve_meeting_id', as: 'meeting' });
Webinar.hasMany(Cart, { foreignKey: 'webinar_id' });

module.exports = db;