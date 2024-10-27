const jwt = require('jsonwebtoken');
const env = require('dotenv');


exports.crearToken = (username) => {
    env.config();
    const tokenkey = process.env.TOKEN_KEY
    const token = jwt.sign(username, tokenkey);
    return token
}