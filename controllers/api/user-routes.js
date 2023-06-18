const express = require('express')
const User = require('../../models/User')
const { Post, Comment } = require('../../models')
const router = express.Router()

router.get("/", async(req, res) => {
    const users = await User.findAll({include: Post})
    console.log(users)
    res.send(users)
})

router.get("/:id", async(req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id, {include: {model: Post, include: Comment}})
    console.log(user)
    res.send(user)
})

router.post("/create", async(req, res) => {
    console.log(req)
    console.log(req.body)
    try {
        const user = await User.create({username: req.body.username, password: req.body.password})
        const result = await user.save()
        res.send({message: "success", data: result})
    } catch (e) {
        res.send({message: "there was an error", error: e})
    }
})

router.put("/:id", async(req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    user.set({
        username: req.body.username,
        password: req.body.password
    })
    const result = await user.save()
    res.send(result)
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    const result = await user.destroy()
    res.send(result)
})

module.exports = router