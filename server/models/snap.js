const mongoose = require('mongoose');

const snapSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    text: {type:String, required:true},
    createdAt: {type:Date, default:Date.now},
});

module.exports = mongoose.model('Snap', snapSchema);
