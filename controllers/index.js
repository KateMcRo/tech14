const express = require('express')
const router = express.Router()
const homeRoutes = require("./home-routes")
const dashRoutes = require("./dash-routes")
const apiRoutes = require("./api")

router.use("/", homeRoutes)
router.use("/dashboard", dashRoutes)
router.use("/api", apiRoutes)

module.exports = router
