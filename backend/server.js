// This is the main server.js file

// Import dependencies
const exp = require("express");
const cors = require("cors");
const path = require("path");
const mongoClient = require("mongodb").MongoClient;
require("dotenv").config(); //it adds the .env file to process object. To access env variables, process.env.key

//initialze express app
const app = exp();
//Use body parser middleware
app.use(exp.json());
// use cors to link frontend and backend
app.use(cors())

//mongodb connection
mongoClient
  .connect(process.env.DB_URL)
  .then((client) => {
    const foodDelDbObj = client.db("foodDeldb");

    // Create collection objects
    const usersCollection = foodDelDbObj.collection("users");
    const restaurantsCollection = foodDelDbObj.collection("restaurants");
    const menuCollection = foodDelDbObj.collection("menu");

    //share collection objects with api's
    app.set("usersCollection", usersCollection);
    app.set("restaurantsCollection", restaurantsCollection);
    app.set("menuCollection", menuCollection);

    //confirmation
    console.log("Database connection established");
  })
  .catch((err) => console.log("Error connecting to Database"));

// import API's
const userApp = require("./APIs/userApi");
const clientApp = require("./APIs/client");

app.use("/images", exp.static(path.join(__dirname, "./Uploads")));

// //directing path's to apis using path level middleware
app.use("/user-api", userApp);
app.use("/client", clientApp);

//error handling middleware
app.use((err, req, res, next) => {
  res.send({ status: "Error", message: err.message });
});

//get PORT from .env
const PORT = process.env.PORT || 4002;
//listen the server at port = PORT
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
