const jwt = require('jsonwebtoken');
const token = {
    generateToken:async (userId,expiresIn) => {
        return jwt.sign({userId:userId},process.env.JWT_SECRET,{expiresIn:expiresIn});
    }
}

module.exports = token;