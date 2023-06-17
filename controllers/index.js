const express = require('express')
const router = express.Router()
const homeRoutes = require("./home-routes")
const dashRoutes = require("./dash-routes")

router.use("/", homeRoutes)
router.use("/dashboard", dashRoutes)

module.exports = router
