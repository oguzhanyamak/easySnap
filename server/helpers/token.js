const jwt = require('jsonwebtoken');
const token = {
    generateToken:async (user,expiresIn) => {
        return jwt.sign({user:user},process.env.JWT_SECRET,{expiresIn:expiresIn});
    }
}

module.exports = token;