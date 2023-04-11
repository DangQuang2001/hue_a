const mongoose = require('mongoose');
const Schema = mongoose.Schema


const Notification = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    roomID: { type: String, required: true },
    hostID: { type: String, required: true },
    imageHost: { type: String, required: true },
    nameHost: { type: String, required: true },
    dateSend: { type: Date },
    isDelete: { type: Array, required: true },

}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', Notification);