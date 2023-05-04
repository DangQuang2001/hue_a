const mongoose = require('mongoose');
const Schema = mongoose.Schema


const Notification = new Schema({
    id: { type: String, required: true, unique: true },
    senderId: { type: String, ref: 'User' },
    title: { type: String, required: true },
    type: { type: Number, required: true },
    dateSend: { type: Date },
    receiverId: { type: String },
    readBy: { type: Array },
    isDelete: { type: Array },
    dataId: { type: String }

}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', Notification);