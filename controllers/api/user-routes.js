const express = require('express')
const { User, Post, Comment } = require('../../models')
const router = express.Router()
const bcrypt = require('bcrypt');

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out: ", err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
});

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
        req.session.user = {
            id: result.id,
            username: result.username,
        };
        res.send({
            message: "success", 
            data: result, 
            loggedIn: req.session.loggedIn
        });
    } catch (e) {
        res.send({message: "there was an error", error: e})
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch)
        if (passwordMatch) {
            req.session.user = user
            req.session.loggedIn = true
          res.sendStatus(200); // Login successful
        } else {
          res.sendStatus(401); // Unauthorized
        }
      } else {
        res.sendStatus(401); // Unauthorized
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.sendStatus(500); // Internal Server Error
    }
  });

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