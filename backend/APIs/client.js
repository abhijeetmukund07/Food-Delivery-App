// This file is for the restaurant-api. i.e restaurant or for the client
const exp = require("express");
const bcryptjs = require("bcryptjs");
const path = require("path");
const expressAsyncHandler = require("express-async-handler");
const multer = require("multer");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const { createUserOrRestaurant, loginUserOrRestaurant } = require("./util");
const VerifyToken = require("../Middlewares/VerifyToken");
// initialize the express router
const clientApp = exp.Router();

// Get users and restaurantsCollection
let usersCollection;
let restaurantsCollection;
let ordersCollection;
clientApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  restaurantsCollection = req.app.get("restaurantsCollection");
  menuCollection = req.app.get("menuCollection");
  ordersCollection = req.app.get("ordersCollection");
  next();
});

// initialize muter diskstorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// register new restaurant
clientApp.post("/user", expressAsyncHandler(createUserOrRestaurant));

// login restaurant route
clientApp.post("/login", expressAsyncHandler(loginUserOrRestaurant));

//Add Menu item
clientApp.post("/add-item",VerifyToken,upload.single("image"), async (req, res) => {
  let image_filename = `${req.file.filename}`;
  let menuObj = JSON.parse(req.body.menuObj);

  menuObj.image_filename = image_filename;
  // console.log(req.body) //comment out to debug
  let responseFromDb = await menuCollection.insertOne(menuObj);
  // console.log(responseFromDb)
  res.send({ message: "Menu item added successfully", statusCode: 6 });
});

// Get menu of the particular restaurant by restaurantid
clientApp.get(
  "/menu/:restaurantId",
  expressAsyncHandler(async (req, res) => {
    let restaurantId = Number(req.params.restaurantId);
    // console.log(typeof(restaurantId)) //comment out to debug
    const menuList = await menuCollection.find({ restaurantId: restaurantId }).toArray();
    // console.log(menuList)
    res.send({ message: "all menu", statusCode: 7, payload: menuList });
  })
);

clientApp.post(
  "/menu/remove",VerifyToken,
  expressAsyncHandler(async (req, res) => {
    //Get Object id from req.body
    const menuObjId = req.body.id;
    const objectId = ObjectId.createFromHexString(menuObjId);
    let menuObj = await menuCollection.findOne({ _id: objectId });
    // console.log(menuObj) //comment out to debug
    fs.unlink(`uploads/${menuObj.image_filename}`, () => {});
    // fs.unlink(path.join(__dirname, "../Uploads/${menuObj.}"))
    const delResponse = await menuCollection.deleteOne({ _id: objectId });
    console.log(delResponse);
    if ((delResponse.acknowledged === true) & (delResponse.deletedCount === 1)) {
      res.send({ message: "menu item removed", statusCode: 8 });
    } else {
      res.send({ message: "some error occured while deleting the menu item", statusCode: 9 });
    }
  })
);

// Get all orders
clientApp.get(
  "/all-orders",
  VerifyToken,
  expressAsyncHandler(async (req, res) => {
    const restaurantId = Number(req.body.restaurantId);
    console.log(restaurantId)
    let dbRes = await ordersCollection.find({ restaurantId: restaurantId }).toArray();
    console.log(dbRes)
    if (dbRes.length === 0) {
      res.send({ message: "No Orders Recieved Yet", statusCode: 35 });
    } else {
      res.send({ message: "All Recieved Orders", statusCode: 36, payload:dbRes });
    }
  })
);

clientApp.post('/status',VerifyToken,expressAsyncHandler(async(req,res)=>{
  console.log('In status changer req handler')
  const orderId = req.body.orderId;
  const status= req.body.status;
  const dbRes = await ordersCollection.updateOne({orderId:orderId},{$set:{status:status}})
  if(dbRes.acknowledged===true || dbRes.modifiedCount===1){
    res.send({message:'Order Status Modified',statusCode: 37})
  }else{
    res.send({message:'Some error occured in modifying order status',statusCode: 38})
  }
}))

module.exports = clientApp;
