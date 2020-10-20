function index(req, res) {
    res.render("home")
}

function dashboard(req, res) {
    res.render("dashboard")
}

function multiplayer(req, res) {
    res.render("multiplayer")
}

function singleplayer(req, res) {
    res.render("singleplayer")
}

function instructions(req, res) {
    res.render("instructions")                
}

function leaderboard(req, res) {
    res.render("leaderboard")
}

function chat(req, res){
    res.render("chat")
}





module.exports = {  
    index,
    dashboard,
    multiplayer, 
    singleplayer,
    instructions,
    leaderboard,
    chat

}