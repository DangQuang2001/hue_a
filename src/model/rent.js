const mongoose = require('mongoose');
const Schema = mongoose.Schema


const Rent = new Schema({
    id: { type: String, required: true, unique: true },
    dateCreate: { type: String, required: true },
    hostID: { type: String, },
    userID: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, require: true },
    roomImage: { type: String, require: true },
    phone: { type: String, required: false },
    roomID: { type: String, require: true },
    roomName: { type: String, require: true },
    numberDaysRented: { type: Number, required: true },
    numberPeople: { type: Number, required: true },
    note: { type: String, require: false },
    isConfirmed: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rent', Rent);