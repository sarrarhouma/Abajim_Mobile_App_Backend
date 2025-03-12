const Follow = require("../models/Follow");
const User = require("../models/User");

const FollowService = {
  async subscribe(follower, user_id) {
    console.log("🔁 Demande d'abonnement - follower:", follower, "→ user_id:", user_id);

    // 🔍 Vérifier les rôles
    const child = await User.findOne({ where: { id: follower, role_id: 8 } });
    const teacher = await User.findOne({ where: { id: user_id, role_id: 4 } });

    if (!child) {
      console.warn("❌ Le follower n'est pas un enfant !");
      return { error: "Seuls les enfants peuvent s'abonner aux enseignants." };
    }

    if (!teacher) {
      console.warn("❌ L'utilisateur suivi n'est pas un enseignant !");
      return { error: "Vous ne pouvez suivre que des enseignants." };
    }

    const alreadyFollowed = await Follow.findOne({ where: { follower, user_id } });
    if (alreadyFollowed) {
      return { message: "Déjà abonné à cet enseignant" };
    }

    return await Follow.create({ follower, user_id, status: "accepted" });
  },

  async unsubscribe(follower, user_id) {
    return await Follow.destroy({ where: { follower, user_id } });
  },

  async isFollowing(follower, user_id) {
    const follow = await Follow.findOne({ where: { follower, user_id } });
    return !!follow;
  },

  async getSubscriptionsByUser(follower) {
    return await Follow.findAll({ where: { follower } });
  },

  async countFollowers(user_id) {
    return await Follow.count({ where: { user_id } });
  },
};

module.exports = FollowService;
