const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key_here";

function generateLoginToken(user){
    const payload = {
        data: user
    }
    const options ={
        noTimestamp: true,
    }

    return jwt.sign(payload,secretKey,options);
}

module.exports = generateLoginToken;