const Like = require("../models/Likes");
const { Favorite, Webinar, User } = require("../models");



const LikeService = {
  async toggleLike(user_id, video_id) {
    if (!user_id || !video_id) {
      console.error("❌ Erreur : user_id ou video_id est manquant !");
      throw new Error("user_id et video_id sont requis.");
    }
    const existingLike = await Like.findOne({ where: { user_id, video_id } });

    if (existingLike) {
      await existingLike.destroy();
      return { message: "Like supprimé" };
    } else {
      const newLike = await Like.create({ user_id, video_id });
      return { message: "Like ajouté", data: newLike };
    }
  },

// ✅ Ajouter/Retirer des favoris
async toggleFavorite(user_id, webinar_id) {
  const existing = await Favorite.findOne({ where: { user_id, webinar_id } });

  if (existing) {
    await existing.destroy();
    return { message: "Favori retiré", isFavorite: false };
  } else {
    const newFavorite = await Favorite.create({ user_id, webinar_id });
    return { message: "Favori ajouté", isFavorite: true, data: newFavorite };
  }
},

// ✅ Récupérer tous les favoris de l'utilisateur
async getFavoriteWebinars(user_id) {
  const favorites = await Favorite.findAll({
    where: { user_id },
    include: [
      {
        model: Webinar,
        as: "webinar",
        attributes: ["id", "slug", "image_cover", "description", "duration", "price"],
        include: [
          {
            model: User,
            as: "teacher",
            attributes: ["id", "full_name", "avatar"]
          }
        ]
      }
    ]
  });

  return favorites.map(fav => ({
    ...fav.webinar.toJSON(),
    isFavorite: true // ✅ Chaque webinaire récupéré est marqué comme favori
  }));
}


};
module.exports = LikeService;
