const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key_here";

function verifyToken(token) {
    const decoded = jwt.verify(token, secretKey);

    console.log(decoded);

    return decoded;
}

module.exports = verifyToken;