const router = require("express").Router();
const User = require("../models/User");
const generateLoginToken = require("../utils/generateLoginToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
const  generateToken = require("../utils/generateTokens");
const verifyToken = require("../utils/verifyToken");

// router.post("/signup", async (req, res) => {
//   try {
//     const checkUser = await User.findOne({ name: req.body.name });
    
//     if (checkUser) {
//       return res.status(200).json({
//         "status_code": 200,
//         "status": "OK",
//         "data": {
//           "success": "user already exists"
//         }
//       });
//     }

//     // create new user
//     const newUser = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       isAgree: req.body.isAgree,
//     });

//     // save user and respond
//     const user = await newUser.save();
//     return res.status(201).json({
//       "status_code": 201,
//       "status": "info",
//       "data": {
//         "success": "user successfully created"
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({
//       "status_code": 500,
//       "status": "error",
//       "data": {
//         "error": error
//       }
//     });
//   }
// });

router.post("/login", async (req, res) => {
    try {
        console.log("working...");
      const { email, password } = req.body;
      console.log(email,password)
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({
          "status_code": 404,
          "status": "error",
          "data": {
            "error": "User Not Found"
          }
        });
      }
  
      if (user.password !== password) {
        return res.status(404).json({
          "status_code": 404,
          "status": "error",
          "data": {
            "error": "Wrong Password"
          }
        });
      }

      const accessToken = generateLoginToken(user.id);
    //const refreshToken = generateRefreshToken(user);
  
      res.status(200).json({
        "status_code": 200,
        "status": "OK",
        "data": {
          "success": "Valid Credentials",
           "id":accessToken,
           "redirect_url":"/auth/twofactorauth"
        //   "refresh_token": refreshToken
        }
      });
    } catch (err) {
      return res.status(500).json({
        "status_code": 500,
        "status": "error",
        "data": {
          "error": err
        }
      });
    }
});

router.post("/twoauth", async (req, res) => {
    try{
        const {otp, hash_id}= req.body;
        const OTP = "123456";
        //console.log(req.body);
        if(otp===OTP && hash_id){
            const verified = verifyToken(hash_id);
            const refresh_token = generateRefreshToken(verified.data);            
            const access_token = generateToken(verified.data);

            const verifyAT = verifyToken(access_token);
            console.log("AT",verifyAT);
            
            res.status(200).json({
                "status_code":200,
                "timestamp": verifyAT.exp,
                "status":"OK",
                "data":{
                    "access_token":access_token,
                    "refresh_token":refresh_token,
                    "redirect_url":"/auth/welcomepage"
                }
            });
        }


    }catch(err){
        return res.status(500).json({
            "status_code": 500,
            "status": "error",
            "data": {
              "error": err
            }
          });
    }
});

router.post("/getdata", async (req,res)=>{
    try{
        const {AT, RT}=req.body;
        console.log(req.body);
        const decoded = verifyToken(AT);
        console.log(decoded);

        if(decoded){
            const user = await User.findById(decoded.id);
            res.status(200).json({
                "status_code":200,
                "status":"OK",
                "data":{
                    user
                }
            })
        }

    }catch(err){
        return res.status(500).json({
            "status_code": 500,
            "status": "error",
            "data": {
              "error": err
            }
          });
    }
})


module.exports = router;
