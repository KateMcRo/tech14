const express = require('express')
const Comment = require('../../models/Comment')
const router = express.Router()

router.get("/", async(req, res) => {
    const comments = await Comment.findAll()
    res.send(comments)
})

router.get("/:id", async(req, res) => {
    const id = req.params.id
    const comment = await Comment.findByPk(id)
    res.send(comment)
})

router.post("/create", async (req, res) => {
    try {
      const { comment, postId } = req.body;
  
      const newComment = await Comment.create({ comment, userId: req.session.user.id, postId });
      res.send({ message: "success", data: newComment });
    } catch (e) {
      res.send({ message: "there was an error", error: e });
    }
  });

router.put("/:id", async(req, res) => {
    const id = req.params.id
    const comment = await Comment.findByPk(id)
    comment.set({
        comment: req.body.comment
    })
    const result = await comment.save()
    res.send(result)
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id
    const comment = await Comment.findByPk(id)
    const result = await comment.destroy()
    res.send(result)
})

module.exports = router