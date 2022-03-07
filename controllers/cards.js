const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.createCard = (req, res) => {
   const { name, link, likes, createdAt } = req.body;

   Card.create({ name, link, owner: req.user._id, likes, createdAt })
    .then(card => res.send({ data: card}))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
}