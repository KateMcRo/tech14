const express = require('express')
const { User, Post, Comment } = require('../models')
const router = express.Router()

router.get("/", async (req, res) => {
    try {
      const user = await User.findByPk(req.session.user.id, { include: { model: Post, include: Comment } });
      const posts = user.Posts;
      console.log("Dash 9:", {posts});
      console.log(posts.datavalues)
      res.render("user-posts", {
        layout: "dashboard",
        user: req.session.user,
        posts
      });
    } catch (error) {
      console.error(error);
      res.render("user-posts", { layout: "dashboard", user: req.session.user, posts: [] });
    }
  });
  

module.exports = router