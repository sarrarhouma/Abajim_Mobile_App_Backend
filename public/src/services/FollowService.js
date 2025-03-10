const Follow = require("../models/Follow");

const FollowService = {
  async subscribe(follower, user_id) {
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
