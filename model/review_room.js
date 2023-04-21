const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewRoom = new Schema({
    roomId: { type: String, require: true, ref: "MotelHouse" },
    userId: { type: String, require: true, ref: "User" },
    rating: { type: Number },
    comment: { type: String },
    images: [{ type: String }]
}, {
    timestamps: true,
});


module.exports = mongoose.model('ReviewRoom', ReviewRoom);