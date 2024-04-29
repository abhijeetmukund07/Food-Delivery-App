// This file is for the restaurant-api. i.e restaurant or for the client
const exp = require("express");
const bcryptjs = require("bcryptjs");
const path = require("path");
const expressAsyncHandler = require("express-async-handler");
const multer = require("multer");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const { createUserOrRestaurant, loginUserOrRestaurant } = require("./util");
// initialize the express router
const clientApp = exp.Router();

// Get users and restaurantsCollection
let usersCollection;
let restaurantsCollection;

clientApp.use((req, res, next) => {
  usersCollection = req.app.get("usersCollection");
  restaurantsCollection = req.app.get("restaurantsCollection");
  menuCollection = req.app.get("menuCollection");
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
clientApp.post("/add-item", upload.single("image"), async (req, res) => {
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
    const menuList = await menuCollection.find({restaurantId: restaurantId }).toArray();
    // console.log(menuList)
    res.send({ message: "all menu", statusCode: 7, payload: menuList });
  })
);

clientApp.post(
  "/menu/remove",
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

module.exports = clientApp;
