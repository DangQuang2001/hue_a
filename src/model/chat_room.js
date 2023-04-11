const mongoose = require('mongoose');
const Schema = mongoose.Schema


const ChatRoom = new Schema({
    id: { type: String, required: true, unique: true },
    userId: [{ type: String ,ref:'User'}],
    
}, {
    timestamps: true
});

module.exports = mongoose.model('ChatRoom', ChatRoom);