const mongoose = require('mongoose');
const Schema = mongoose.Schema


const ChatDetail = new Schema({
    roomChatId: { type: String, required: true, unique: true },
    message: [
        {
            userId: { type: String, required: true },
            content: { type: String },
            typeM: { type: String },
            createdAt: { type: Date }
        }
    ],
    readBy: [{ type: String, ref: 'User' }]

}, {
    timestamps: true
});

module.exports = mongoose.model('ChatDetail', ChatDetail);