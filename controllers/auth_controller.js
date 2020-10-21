const UserModel = require('../database/models/user_model')

const registerNew = (req, res) => {
    res.render("authentication/register");
  };

const registerCreate = async (req, res, next) => {
    try  {
    const { username, password } = req.body;
    const user = await UserModel.create({ username, password });
  
    req.login(user, error => {
      if (error) {
        return next(error);
      }
      res.redirect("/dashboard");
    });
} catch (err) {
    console.log(err)
}
  };

  const loginNew = (req, res) => {
    res.render("authentication/login");
  };

  const loginCreate = async (req, res) => {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    res.redirect("/dashboard");
  };

module.exports = {registerNew,
    registerCreate,
loginNew,
loginCreate,
}