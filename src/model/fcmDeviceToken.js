const mongoose = require('mongoose');
const Schema = mongoose.Schema


const FcmDeviceToken = new Schema({
    fcmToken: { type: String },
    isOpenApp: { type: Boolean },
    lastSigned: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('FcmDeviceToken', FcmDeviceToken);