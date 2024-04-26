//import bcrypt js for hashing password
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//request handler for user registration(user or restaurant)
const createUserOrRestaurant = async (req, res) => {
  //get users and restaurants collection Object
  const usersCollectionObj = req.app.get("usersCollection");
  const restaurantsCollectionObj = req.app.get("restaurantsCollection");

  //get user or restaurant
  const user = req.body;
  // console.log(user.username)

  //check duplicate user
  if (user.userType === "user") {
    //find user by username
    let dbUser = await usersCollectionObj.findOne({ username: user.username });
    //if user already exists
    if (dbUser != null) {
      return res.send({ message: "Username already exists", statusCode: 0 });
    }
  }

  //check duplicate restaurant
  if (user.userType === "restaurant") {
    //find user by username
    let dbUser = await restaurantsCollectionObj.findOne({
      username: user.username,
    });
    //if user already exists
    if (dbUser != null) {
      return res.send({ message: "Restaurant already exists", statusCode:1 });
    }
  }

  //if control comes to this line., it means that there is no duplicate user
  //now,
  //since the following steps 1 and 2 are common to both users and restaurants, we are placing it outside any if block which checks the type of user

  //1.hash password
  const hashedPassword = await bcryptjs.hash(user.password, 4);
  //2. replace plain password with hashed password
  user.password = hashedPassword;

  //3. insert user/restaurant into respective collection
  if (user.userType === "user") {
    //insert into users collection
    let responseFromDB = await usersCollectionObj.insertOne(user);
    // console.log(responseFromDB)  ******uncomment to test/debug*****
    res.send({ message: "New User Created", statusbar: 2 });
  } else if (user.userType === "restaurant") {
    //insert into users collection
    user.restaurantId = Date.now();
    let responseFromDB = await restaurantsCollectionObj.insertOne(user);
    //  console.log(responseFromDB)  *****uncomment to test/debug*****
    res.send({ message: "New Restaurant Created", statusCode: 3 });
  }
};

// User or RestaurantLogin
const loginUserOrRestaurant = async (req, res) => {
  //get users and restaurants collection Object
  const usersCollectionObj = req.app.get("usersCollection");
  const restaurantsCollectionObj = req.app.get("restaurantsCollection");

  //get user or restaurant
  const user = req.body;

  //Check if username exists
  if(user.userType==='user'){
    const dbUser = await usersCollectionObj.findOne({username:user.username})
    if(dbUser===null){
        res.send({message:'Invalid Username', statusCode: 4})
    }else{
        // user exists. Now check password
        // validate password
        let status = await bcryptjs.compare(user.password,dbUser.password)
        if(status === false){
            res.send({message:'Invalid password',statusCode:5})
        }else{
            // password is valid.
            // Now generate token
            const signedToken = jwt.sign({username: dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            delete dbUser.password
            // send token, dbUser as response
            res.send({message:'Login Succesful',statusCode:6,token:signedToken,user:dbUser})
        }
        
    }
  }

  if(user.userType==='restaurant'){
    const dbUser = await restaurantsCollectionObj.findOne({username:user.username})
    if(dbUser===null){
        res.send({message:'Invalid Restaurant Username', statusCode: 4})
    }else{
        // user exists. Now check password
        // validate password
        let status = await bcryptjs.compare(user.password,dbUser.password)
        if(status===false){
            res.send({message:'Invalid password',statusCode:5})
        }else{
             // password is valid.
            // Now generate token
            const signedToken = jwt.sign({username: dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            delete dbUser.password
            // send token, dbUser as response
            res.send({message:'Login Succesful',statusCode:6,token:signedToken,user:dbUser})
        }
    }
  }
};

module.exports = { createUserOrRestaurant, loginUserOrRestaurant };
