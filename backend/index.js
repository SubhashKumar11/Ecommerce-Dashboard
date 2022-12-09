const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
//jsonwebtoken import
const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";
const port = process.env.PORT || 9000;
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
app.use(cors());
app.use(express.json());
//for register
app.post("/register", async (req, res) => {
  //res.send(req.body) //use to get data from postman
  let user = new User(req.body);
  let result = await user.save();

  //to remove password from post request,ie password must not visible in frontend so use
  result = result.toObject(); 
  delete result.password;
 // res.send(result);
 jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
  //if some error occur
  if (err) {
    res.send({ result: "something went wrong try after sometime" });
  }
  res.send( {result, auth: token });
});
});
//for register ends here
//for login starts here
app.post("/login", async (req, res) => {
  //res.send(req.body) //to first check whether route works or not
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password"); //select use to remove visible password at frontend
    if (user) {
      jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        //if some error occur
        if (err) {
          res.send({ result: "something went wrong try after sometime" });
        }
        res.send( {user, auth: token });
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

//route for add products
app.post("/add-product", async (req, res) => {
  /* let product = new Product(req.body)
  let result = await product.save();
  res.send(result); these commented lines use to test this route in postman*/
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
  
});
app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "no result" });
  }
});
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});
app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no result found" });
  }
});
//to update data use api
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});
//for search any item by typing word in search box
app.get("/search/:key" ,async (req, res) => {
  let result = await Product.find({
    //so that in serach box on any typing of word product get listed
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});
//verification of token note->this stepp is optional so it is not use in frontend
function verifyToken(req,res,next){
  let token = req.headers['authorization']
  if(token){
token = token.split(' ')[1]
//this step done after testing on postman to verify token below
jwt.verify(token,jwtkey,(err,valid)=>{
  if (err) {
    res.status(401).send({result:"please provide valid token"});
  } else {
next();
  }
})
  }else{
res.status(403).send({result:"add token with header"})
  }
console.warn("middleware called",token);
}
app.listen(port, () => {
  console.log("server listening at port number 9000 ");
});
