const express = require('express')
const { User, Post, Comment } = require('../models')
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const data = await Post.findAll({include: [
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
        ],})
        const posts = data.map((post) => {
            const { dataValues } = post   
            const { User } = dataValues
            const username = User.dataValues.username
            dataValues.User = username
            return dataValues
        })
        res.render("home", {
            user: req.session,
            posts
        })
    } catch (error) {
        res.render("home")
        console.error(error);
        
    }
})

router.get('/signup', (req, res) => {
    if(req.session.loggedIn){
        res.redirect("/dashboard")
    } else res.render("signup")
})

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/post/:id', async(req, res) => {
    try {
        const id = req.params.id
        const {dataValues} = await Post.findByPk(id, {include: [
            {
                model: User,
                attributes: ['id', 'username'],
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                },
            },
        ],})
        const user = dataValues.User.dataValues
        const comments = dataValues.Comments
        const commentsWithUsers = comments.map((comment) => {
        const commentData = comment.dataValues
        const user = comment.dataValues.User
        const userData = user.dataValues
        const username = userData.username
        return { commentData, username: username }
        })
        console.log(commentsWithUsers)
        
        res.render("single-post", {
            user: user,
            post: dataValues,
            comments: commentsWithUsers
          
        })
    } catch (error) {
        console.error(error);
    }
})

module.exports = router
