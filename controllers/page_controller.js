function index(req, res) {
    res.render("home")
}

function dashboard(req, res) {
    res.render("dashboard")
}

module.exports = {  
    index,
    dashboard
}