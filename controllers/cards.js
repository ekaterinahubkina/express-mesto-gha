const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorValidation = require('../errors/ErrorValidation');
const ErrorForbidden = require('../errors/ErrorForbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const {
    name, link, likes, createdAt,
  } = req.body;

  if (!name || !link) {
    throw new ErrorValidation('Некорректные данные');
  }

  Card.create({
    name, link, owner: req.user._id, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
      // if (err.name === 'ValidationError') {
      //   return res.status(400).send({ message: 'Переданы некорректные данные' });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => {
      console.log(card.owner.toString(), req.user._id);
      if (card.owner.toString() !== req.user._id) {
        throw new ErrorForbidden('Нет прав доступа');
      }
      card.remove();
      res.send({ data: card });
    })
    .catch((err) => {
      next(err);
      // if (err.name === 'CastError') {
      //   return res.status(400).send({ message: 'Неверный _id карточки' });
      // }
      // if (err.statusCode === 404) {
      //   return res.status(404).send({ message: err.errorMessage });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
      // if (err.name === 'CastError') {
      //   return res.status(400).send({ message: 'Неверный _id карточки' });
      // }
      // if (err.statusCode === 404) {
      //   return res.status(404).send({ message: err.errorMessage });
      // }
      // return res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Неверный _id карточки' });
      }
      return next(err);
      // if (err.statusCode === 404) {
      //   return res.status(404).send({ message: err.errorMessage });
      // }
      // return res.status(500).send({ message: err.message });
    });
};
