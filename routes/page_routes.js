const express = require('express')
const {
    index,
    dashboard
} = require('../controllers/page_controller')
const router = express.Router()


router.get("/", index)
router.get("/dashboard", dashboard)

module.exports = router