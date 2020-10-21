function index(req, res) {
    res.render("authentication/login")
}

function game(req, res) {
    res.render("game/pong")
}

module.exports = {  
    index,
    game,
}