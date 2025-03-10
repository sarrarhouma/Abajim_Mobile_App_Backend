const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/FollowController");

router.post("/subscribe", FollowController.subscribe);
router.delete("/unsubscribe", FollowController.unsubscribe);
router.get("/is-following/:follower/:user_id", FollowController.isFollowing);
router.get("/by-user/:follower", FollowController.getUserSubscriptions);
router.get("/count/:user_id", FollowController.getFollowersCount);

module.exports = router;
