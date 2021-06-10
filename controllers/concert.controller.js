const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const concert = await Concert.find();
    const seats = await Seat.find();

    const concerts = [];
    concert.map(data => {
      const tickets = seats.filter(seat => seat.day === data.day);
      const freeTickets = 50 - tickets.length;
      const output = { tickets: freeTickets, concert: data };

      concerts.push(output);
    })
    res.json(concerts);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await Concert.findById(req.params.id);
    if (!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {

  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = {
      performer,
      genre,
      price,
      day,
      image,
    }

    const concert = new Concert(newConcert);
    await concert.save();
    res.json({ message: 'OK' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {

  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = {
      performer,
      genre,
      price,
      day,
      image
    }

    await Concert.findOneAndUpdate({ _id: req.params.id }, newConcert, (err, doc) => {
      if (err) {
        res.status(404).json({ message: 'Not found...' })
      } else {
        res.json(doc)
      }
    })
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    await Concert.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
      if (err) {
        res.status(404).json({ message: 'Not found...' });
      } else {
        res.json(doc);
      }
    });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};