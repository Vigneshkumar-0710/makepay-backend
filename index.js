const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
const authRoute = require("./routers/users");

dotenv.config();

mongoose
  .connect("mongodb+srv://makepay:makepay123@cluster0.gitzkam.mongodb.net/MAKEPAY?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))

  // const setStableHeaders = (req, res, next) => {
  //   // Set your desired headers here
  //   res.setHeader('Content-Type', 'application/json');
  //   res.setHeader('Cache-Control', 'no-cache');
  //   // You can add more headers as needed
  
  //   // Continue to the next middleware or route handler
  //   next();
  // };

//middleware
app.use(cors());
app.use(express.json());
//app.use(setStableHeaders);
// app.use(helmet());
// app.use(morgan("common"));



app.use("/auth", authRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});