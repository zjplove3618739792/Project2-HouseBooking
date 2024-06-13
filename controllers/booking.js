const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.js');

router.get('/', async (req, res) => { // Changed route from '/booking' to '/'
  const bookings = await Booking.find();
  res.render('booking', { bookings });
});

router.post('/', async (req, res) => { // Changed route from '/booking' to '/'
  const { startDate, endDate } = req.body;
  await Booking.create({ startDate, endDate });
  res.redirect('/booking');
});

module.exports = router;
