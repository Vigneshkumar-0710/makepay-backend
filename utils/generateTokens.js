// auth.js

const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key_here';

function generateToken(user) {
  const payload = {
    id: user,
    
    
    // Note: It's generally not recommended to include the password in the token payload
  };

  const options = {
    expiresIn: '30m', // Token expiry time
  };

  console.log("AT>result",jwt.sign(payload, secretKey, options))

  return jwt.sign(payload, secretKey, options);
}


module.exports = generateToken;
