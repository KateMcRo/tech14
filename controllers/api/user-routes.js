const express = require('express')
const { User, Post, Comment } = require('../../models')
const router = express.Router()
const bcrypt = require('bcrypt');

router.get("/", async(req, res) => {
    const users = await User.findAll({include: Post})
    res.send(users)
})

router.get("/:id", async(req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id, {include: {model: Post, include: Comment}})
    res.send(user)
})

router.post("/create", async(req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            username: req.body.username, 
            password: hashedPass});

        const result = await user.save()
        req.session.loggedIn = true
        req.session.user = result
        console.log(user)
        res.send({
            message: "success", 
            data: result, 
            loggedIn: req.session.loggedIn
        });
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