const express = require('express')
const {
    index,
    dashboard,
    multiplayer,
    singleplayer,
    instructions,
    leaderboard,
    chat,
    profile,

} = require('../controllers/page_controller')


const router = express.Router()

// home
router.get("/", dashboard)

// dashboard when logged in - needs authorization
router.get("/dashboard", dashboard)

// online multiplayer
router.get("/multiplayer", multiplayer)

// single player vs com
router.get("/singleplayer", singleplayer)

// instructions for game
router.get("/instructions", instructions)

// leaderboard
router.get("/leaderboard", leaderboard)

router.get("/chat", chat)



router.get("/profile", profile)


module.exports = router