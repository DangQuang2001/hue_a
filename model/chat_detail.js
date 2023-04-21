const mongoose = require('mongoose');
const message = require('../socketIO/message');
const Schema = mongoose.Schema


const ChatDetail = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
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