const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['booked', 'available'], default: 'available' }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

