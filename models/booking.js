const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  houseId: { type: mongoose.Schema.Types.ObjectId, ref: 'House' },
  date: { type: Date, required: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

