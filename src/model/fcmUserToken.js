const mongoose = require('mongoose');
const Schema = mongoose.Schema


const FcmUserToken = new Schema({
    userID: { type: String },
    fcmToken: { type: String },
    isOnline: { type: Boolean },
    isSignOut: { type: Boolean },
    lastSigned: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('FcmUserToken', FcmUserToken);