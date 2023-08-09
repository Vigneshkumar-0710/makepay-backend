// auth.js

const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key_here';

function generateRefreshToken(user) {
    console.log("RT",user);
  const payload = {
    
    id: user,
        // Note: It's generally not recommended to include the password in the token payload
  };
  
  console.log("RT>result",jwt.sign(payload, secretKey))

  return jwt.sign(payload, secretKey);
}

module.exports = generateRefreshToken;
