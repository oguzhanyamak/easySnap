const bcrypt = require('bcrypt');
const token = require('../../../helpers/token');

module.exports = {
    createUser: async (parent,{data:{username,password}},{User}) => {
        const user = await User.findOne({username:username});
        if(user){
            throw new Error('User already exists');
        }
        const newUser = await new User({username,password}).save();
        return {token:token.generateToken(newUser,'1h')};
    },
    signIn: async (parent,{data:{username,password}},{User}) => {
        const user = await User.findOne({username:username});
        if(!user){
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error('Invalid password');
        }
        return {token:token.generateToken(user,'1h')};

    }
}
