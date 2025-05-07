const Sequelize = require("sequelize");
const sequelize = require("../config/db");

// 🔹 Import Models
const User = require("./User");
const Webinar = require("./Webinar");
const WebinarTranslation = require("./WebinarTranslation");
const WebinarChapter = require("./WebinarChapter");
const File = require("./File");
const FileTranslation = require("./FileTranslation");
const Manuel = require("./Manuel")(sequelize, Sequelize);
const Material = require("./Material")(sequelize, Sequelize);
const SchoolLevel = require("./SchoolLevel");
const Video = require("./Videos");
const Meeting = require("./Meeting");
const MeetingFile = require("./MeetingFile");
const MeetingTime = require("./MeetingTime");
const ReserveMeeting = require("./ReserveMeeting");
const Sale = require("./Sale");
const Submaterial = require("./Submaterial");
const Notification = require("./Notification")(sequelize, Sequelize.DataTypes);
const NotificationStatus = require("./NotificationStatus")(sequelize, Sequelize.DataTypes);
const Favorite = require("./Favorite")(sequelize, Sequelize);
const Order = require("./Order")(sequelize, Sequelize.DataTypes);
const OrderItem = require("./OrderItem")(sequelize, Sequelize.DataTypes);
const Cart = require("./Cart")(sequelize, Sequelize.DataTypes);
const CardReservation = require("./CardReservation");
const PaymentProof = require("./PaymentProof");

// Quiz Models
const Quiz = require("./Quiz");
const QuizTranslation = require("./QuizTranslation");
const QuizQuestion = require("./QuizQuestion");
const QuizQuestionTranslation = require("./QuizQuestionTranslation");
const QuizAnswer = require("./QuizAnswer");
const QuizAnswerTranslation = require("./QuizAnswerTranslation");
const QuizResult = require("./QuizResult");
const Likes =  require("./Likes");

// Teacher related
const UserLevel = require("./UserLevel");
const UserMatiere = require("./UserMatiere");
const Follow = require("./Follow");
const Like = require("./Likes");

// 🧠 MODELS REGISTER
const db = {
  sequelize,
  Sequelize,
  User,
  Webinar,
  WebinarTranslation,
  WebinarChapter,
  File,
  FileTranslation,
  Manuel,
  Material,
  SchoolLevel,
  Video,
  Meeting,
  MeetingFile,
  MeetingTime,
  ReserveMeeting,
  Sale,
  Submaterial,
  Notification,
  NotificationStatus,
  Favorite,
  Order,
  OrderItem,
  Cart,
  CardReservation,
  PaymentProof,
  Quiz,
  QuizTranslation,
  QuizQuestion,
  QuizQuestionTranslation,
  QuizAnswer,
  QuizAnswerTranslation,
  QuizResult,
  UserLevel,
  UserMatiere,
  Follow,
  Like,
};

//
// ▶️ RELATIONS
//

// ✅ USER / TEACHER Relations
User.hasMany(Webinar, { foreignKey: "teacher_id", as: "webinars" });
Webinar.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });

User.hasMany(Meeting, { foreignKey: "teacher_id", as: "meetings" });
Meeting.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });

// ✅ Webinar Translations
Webinar.hasMany(WebinarTranslation, { foreignKey: "webinar_id", as: "translations" });
WebinarTranslation.belongsTo(Webinar, { foreignKey: "webinar_id", as: "webinar" });

// ✅ Webinar Chapters + Files
Webinar.hasMany(WebinarChapter, { foreignKey: "webinar_id", as: "chapters" });
WebinarChapter.belongsTo(Webinar, { foreignKey: "webinar_id", as: "webinar" });

WebinarChapter.hasMany(File, { foreignKey: "chapter_id", as: "files" });
File.belongsTo(WebinarChapter, { foreignKey: "chapter_id", as: "chapter" });

File.hasMany(FileTranslation, { foreignKey: "file_id", as: "translations" });
FileTranslation.belongsTo(File, { foreignKey: "file_id", as: "file" });

// ✅ Manuel → Video
Manuel.hasMany(Video, { foreignKey: "manuel_id", as: "videos" });
Video.belongsTo(Manuel, { foreignKey: "manuel_id", as: "manuel" });

// ✅ Manuel → Material + School Level
Manuel.belongsTo(Material, { foreignKey: "material_id", as: "material" });
Material.hasMany(Manuel, { foreignKey: "material_id" });

Manuel.belongsTo(SchoolLevel, { foreignKey: "level_id", as: "level" });
SchoolLevel.hasMany(Manuel, { foreignKey: "level_id" });

// ✅ Notifications
Notification.hasMany(NotificationStatus, { foreignKey: "notification_id", as: "statuses" });
NotificationStatus.belongsTo(Notification, { foreignKey: "notification_id", as: "notification" });

Notification.belongsTo(User, { foreignKey: "user_id", as: "user" });
Notification.belongsTo(User, { foreignKey: "sender_id", as: "sender_user" });

// ✅ Favorite
Webinar.hasMany(Favorite, { foreignKey: "webinar_id", as: "favorites" });
Favorite.belongsTo(Webinar, { foreignKey: "webinar_id", as: "webinar" });

User.hasMany(Favorite, { foreignKey: "user_id", as: "favorites" });
Favorite.belongsTo(User, { foreignKey: "user_id", as: "user" });

// ✅ Meetings
Meeting.hasMany(MeetingFile, { foreignKey: "meeting_id", as: "files" });
MeetingFile.belongsTo(Meeting, { foreignKey: "meeting_id", as: "meeting" });

Meeting.hasMany(MeetingTime, { foreignKey: "meeting_id", as: "times" });
MeetingTime.belongsTo(Meeting, { foreignKey: "meeting_id", as: "meeting" });

// Meeting -> ReserveMeeting
ReserveMeeting.belongsTo(Meeting, { foreignKey: 'meeting_id', as: 'meeting' });
Meeting.hasMany(ReserveMeeting, { foreignKey: 'meeting_id', as: 'meeting_reservations' });
ReserveMeeting.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(ReserveMeeting, { foreignKey: 'user_id', as: 'user_reservations' });
MeetingTime.hasMany(ReserveMeeting, { foreignKey: "meeting_time_id", as: "reservations" });
ReserveMeeting.belongsTo(MeetingTime, { foreignKey: "meeting_time_id", as: "time" });

// MeetingTime -> Material
MeetingTime.belongsTo(Material, { as: 'material', foreignKey: 'matiere_id' });
Material.hasMany(MeetingTime, { as: 'meeting_times', foreignKey: 'matiere_id' });

// MeetingTime -> Submaterial
MeetingTime.belongsTo(Submaterial, { as: 'submaterial', foreignKey: 'submaterial_id' });
Submaterial.hasMany(MeetingTime, { as: 'meeting_times_sub', foreignKey: 'submaterial_id' });

// ✅ Sale
User.hasMany(Sale, { foreignKey: 'buyer_id', as: 'purchases' });
User.hasMany(Sale, { foreignKey: 'seller_id', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'buyer_id', as: 'buyer' });
Sale.belongsTo(User, { foreignKey: 'seller_id', as: 'seller' });

Webinar.hasMany(Sale, { foreignKey: 'webinar_id', as: 'webinarSales' });
Meeting.hasMany(Sale, { foreignKey: 'meeting_id', as: 'meetingSales' });

// ✅ Cart
User.hasMany(Cart, { foreignKey: "creator_id", as: "cart_items" });
Cart.belongsTo(User, { foreignKey: "creator_id", as: "creator" });
Cart.belongsTo(Webinar, { foreignKey: 'webinar_id', as: 'webinar' });
Cart.belongsTo(Meeting, { foreignKey: 'reserve_meeting_id', as: 'meeting' });

// ✅ Orders & Payments
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// PaymentProof.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
// Order.hasMany(PaymentProof, { foreignKey: 'order_id', as: 'payment_proofs' });

// ✅ QUIZ Relations
Quiz.hasMany(QuizTranslation, { foreignKey: 'quiz_id', as: 'translations' });
Quiz.hasMany(QuizQuestion, { foreignKey: 'quiz_id', as: 'questions' });
Quiz.hasMany(QuizResult, { foreignKey: 'quiz_id', as: 'results' });

QuizQuestion.hasMany(QuizQuestionTranslation, { foreignKey: 'quizzes_question_id', as: 'translations' });
QuizQuestion.hasMany(QuizAnswer, { foreignKey: 'question_id', as: 'answers' });

QuizAnswer.hasMany(QuizAnswerTranslation, { foreignKey: 'quizzes_questions_answer_id', as: 'translations' });

QuizResult.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
QuizResult.belongsTo(Quiz, { foreignKey: 'quiz_id', as: 'quiz' });

// ✅ Teacher Levels & Matiere (Books)
User.hasMany(UserLevel, { foreignKey: "teacher_id", as: "levels" });
User.hasMany(UserMatiere, { foreignKey: "teacher_id", as: "matieres" });

UserMatiere.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });
UserMatiere.belongsTo(Manuel, { foreignKey: "matiere_id", as: "manuel" });
Manuel.hasMany(UserMatiere, { foreignKey: "matiere_id", as: "matiere_links" });

// ✅ Follow
User.hasMany(Follow, { foreignKey: "user_id", as: "followers" });
Follow.belongsTo(User, { foreignKey: "user_id", as: "teacher" });
Follow.belongsTo(User, { foreignKey: "follower", as: "follower_user" });
User.hasMany(Follow, { foreignKey: "follower", as: "followings" });

// ✅ Video -> Likes
Video.hasMany(Like, { foreignKey: 'video_id', as: 'likes_list' });
Like.belongsTo(Video, { foreignKey: 'video_id', as: 'video' });

// ✅ Like -> User
Like.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Like, { foreignKey: 'user_id', as: 'likes' });



module.exports = db;