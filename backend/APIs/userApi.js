const exp = require("express");
const { createUserOrRestaurant,loginUserOrRestaurant } = require("./util");
const expressAsyncHandler = require("express-async-handler");
const userApp = exp.Router();

//get usersCollection and articlesCollection into the API via a middleware
let usersCollection;
let restaurantsCollection;
let menuCollection;
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  restaurantsCollection = req.app.get("restaurantsCollection");
  menuCollection = req.app.get("menuCollection");
  next();
});

//user registration route
userApp.post("/user", expressAsyncHandler(createUserOrRestaurant));

// user Login route
userApp.post('/login',expressAsyncHandler(loginUserOrRestaurant))
module.exports = userApp;

//GET all restaurants.
//Yet to add: Token Verification Middleware
userApp.get('/all-restaurants',expressAsyncHandler(async (req,res)=>{ 
  //get all restaurants
  const restaurantObj = await restaurantsCollection.find({}, { projection: { password: 0 } }).toArray();

  if(!restaurantObj){
    res.send({message:'Some Error Occured in retrieving restaurants',statusCode:11})
  }else{
    res.send({message:'All restaurants',statusCode:12,payload:restaurantObj})
  }
}))

// GET menu by restaurantId
//Yet to add: Token Verification Middleware
userApp.get('/menu/:restaurantId',expressAsyncHandler(async(req,res)=>{
  // get restaurantId from url parameters
  const restaurantId = Number(req.params.restaurantId)
  // get menu by restaurantId
  const menuObj = await menuCollection.find({restaurantId:restaurantId}).toArray()
  if(!menuObj){
    res.send({message:'Some Error Occured while retrieving menu',statusCode:13})
  }else{
    res.send({message:'Menu of the restaurant',statusCode:14,payload:menuObj})
  }
}))

