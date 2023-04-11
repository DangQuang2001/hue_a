const mongoose = require('mongoose');
const Schema = mongoose.Schema


const MotelHouse = new Schema({
  id: { type: String, required: true, unique: true },
  dateCreate: { type: String, required: true },
  hostID: { type: String, },
  hostName: { type: String, },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Number, }],
  images: [{ type: String, required: true }],
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  typeName: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, },
  hasRoom: { type: Boolean, },
  idReview: { type: Number, },
  adParams: { type: Object, required: true },
  isDelete: { type: Boolean, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('MotelHouse', MotelHouse);