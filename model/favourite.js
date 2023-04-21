const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favourite = new Schema({
    roomId: { type: String, require: true, ref: "MotelHouse" },
    userId: { type: String }
}, {
    timestamps: true,
});


module.exports = mongoose.model('Favourite', favourite);