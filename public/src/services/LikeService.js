const Like = require("../models/Likes");

const LikeService = {
  async toggleLike(user_id, video_id) {
    if (!user_id || !video_id) {
      console.error("❌ Erreur : user_id ou video_id est manquant !");
      throw new Error("user_id et video_id sont requis.");
    }
    const existingLike = await Like.findOne({ where: { user_id, video_id } });

    if (existingLike) {
      console.log("👎 Like supprimé");
      await existingLike.destroy();
      return { message: "Like supprimé" };
    } else {
      console.log("👍 Like ajouté");
      const newLike = await Like.create({ user_id, video_id });
      return { message: "Like ajouté", data: newLike };
    }
  }
};

module.exports = LikeService;
