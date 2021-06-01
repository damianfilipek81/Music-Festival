
const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  id: { type: Int32Array, required: true },
  performer: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Int32Array, required: true },
  day: { type: Int32Array, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Concert', concertSchema);