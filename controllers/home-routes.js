const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/signup', (req, res) => {
    console.log(req.session)
    if(req.session.loggedIn){
        res.redirect("/dashboard")
    } else res.render("signup")
})

router.get('/login', (req, res) => {
    res.render("login")
})

router.get('/post/:id', (req, res) => {
    res.render("single-post")
})

module.exports = router
