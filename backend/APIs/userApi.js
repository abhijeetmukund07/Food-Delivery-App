const exp = require("express");
const { createUserOrRestaurant,loginUserOrRestaurant } = require("./util");
const expressAsyncHandler = require("express-async-handler");
const userApp = exp.Router();

//get usersCollection and articlesCollection into the API via a middleware
let usersCollection;
let restaurantsCollection;
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  restaurantsCollection = req.app.get("restaurantsCollection");
  next();
});

//user registration route
userApp.post("/user", expressAsyncHandler(createUserOrRestaurant));

// user Login route
userApp.post('/login',expressAsyncHandler(loginUserOrRestaurant))
module.exports = userApp;
