const exp = require("express");
const { createUserOrRestaurant,loginUserOrRestaurant } = require("./util");
const expressAsyncHandler = require("express-async-handler");
const userApp = exp.Router();
const VerifyToken = require('../Middlewares/VerifyToken')
const { ObjectId } = require("mongodb");


//get usersCollection and articlesCollection into the API via a middleware
let usersCollection;
let restaurantsCollection;
let menuCollection;
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  restaurantsCollection = req.app.get("restaurantsCollection");
  menuCollection = req.app.get("menuCollection");
  ordersCollection = req.app.get("ordersCollection");
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


userApp.post('/cart/add',VerifyToken,expressAsyncHandler(async(req,res)=>{
  const username = req.body.username
  let cartRes = await usersCollection.findOne({username:username})
  delete cartRes.password
  let cartData = cartRes.cartData || {}
  if(!cartData[req.body.itemId]){
    cartData[req.body.itemId] = 1;
  }else{
    cartData[req.body.itemId] += 1;
  }
  let cartUpdateRes = await usersCollection.updateOne({username:username},{$set:{cartData:cartData}})
  if(cartUpdateRes.acknowledged===true && cartUpdateRes.modifiedCount >= 1){
    res.send({message:'Item added to cart', statusCode:26})
  }else{
    res.send({message:'Some problem occured while adding item to cart', statusCode:27})
  }
}))


// Remove from cart
userApp.post('/cart/remove',VerifyToken,expressAsyncHandler(async(req,res)=>{
  const username = req.body.username
  let cartRes = await usersCollection.findOne({username:username})
  delete cartRes.password
  let cartData = cartRes.cartData || {}
  if(cartData[req.body.itemId] > 0){
    cartData[req.body.itemId] -= 1;
  }
  let cartUpdateRes = await usersCollection.updateOne({username:username},{$set:{cartData:cartData}})
  if(cartUpdateRes.acknowledged===true && cartUpdateRes.modifiedCount >= 1){
    res.send({message:'Item removed from cart', statusCode:28})
  }else{
    res.send({message:'Some problem occured while removing item from cart', statusCode:29})
  }
}))

// get cart details. performin POST since we need to send username to fetch cart details
userApp.post('/cart/get',VerifyToken,expressAsyncHandler(async(req,res)=>{
  const username = req.body.username
  let cartRes = await usersCollection.findOne({username:username})
  delete cartRes.password
  let cartData = cartRes.cartData || {}
  res.send({message:'Cart details',success:true,statusCode:30,payload:cartData})
}))


// placeOrder
userApp.post('/placeorder',VerifyToken,expressAsyncHandler(async(req,res)=>{
  const orderData = req.body
  let placeOrderRes = await ordersCollection.insertOne({orderData})
  if(placeOrderRes.acknowledged===true){
    res.send({message:'Order Placed',statusCode:31})
  }else{
    res.send({message:'Some Problem Occured while placing order',statusCode:32})
  }
}))