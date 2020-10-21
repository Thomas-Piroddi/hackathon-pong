const express = require('express')
const router = express.Router()
const { celebrate, Joi, Segments } = require("celebrate");
const passport = require("passport");

const PageController = require('../controllers/page_controller');
const AuthController = require('../controllers/auth_controller');

router.get("/", PageController.index)

router.get("/register", AuthController.registerNew);

router.post(
    "/register",
    celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    }),
    AuthController.registerCreate
  );

router.get(
    "/dashboard",
    passport.authenticate("jwt", { session: false }),
    PageController.game
);


router.get("/login", AuthController.loginNew);

  router.post(
    "/login",
    celebrate({
      [Segments.BODY]: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    }),
    passport.authenticate("local", {
      failureRedirect: "/login",
      session: false
    }),
    AuthController.loginCreate
  );
  
//   router.get("/logout", AuthController.logout);
  
  module.exports = router;
  