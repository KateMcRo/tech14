const express = require('express')
const Post = require('../../models/Post')
const { User, Comment } = require('../../models')
const router = express.Router()

router.get("/", async(req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'username'],
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['id', 'username']
                },
            },
        ],
    })
    console.log(posts)
    res.send(posts)
})

router.get("/:id", async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['id', 'username'],
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['id', username]
                },
            },
        ],
    })    
    res.send(post)
})

router.post("/create", async(req, res) => {
    console.log(req.body)
    console.log(req.session)
    try {
        const post = await Post.create({title: req.body.title, content: req.body.content, userId: req.session.user.id})
        const result = await post.save()
        res.send({message: "success", data: result})
    } catch (e) {
        res.send({message: "there was an error", error: e})
    }
})

router.put("/:id", async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    post.set({
        title: req.body.title,
        content: req.body.content
    })
    const result = await post.save()
    res.send(result)
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const result = await post.destroy()
    res.send(result)
})

module.exports = router