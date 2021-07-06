/* const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotValidDataError } = require('../errors/NotValidDataError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { DefaultServerError } = require('../errors/DefaultServerError');
const { errorMessages } = require('../utils/constants');
// Ищем запрашиваемую на удаление карточку. Если находим то проверяем
// принадлежит ли карточка пользователю.
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        next(new NotFoundError(errorMessages.cardsDelete400));
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        next(new ForbiddenError(errorMessages.cardsDelete403));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.cardsDelete400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
  next();
}; */
