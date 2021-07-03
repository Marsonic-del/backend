const Card = require('../models/card');
const { ERR_404, ERR_403, errorMessages } = require('../utils/constants');
// Ищем запрашиваемую на удаление карточку. Если находим то проверяем
// принадлежит ли карточка пользователю.
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(ERR_404).send(errorMessages.cardsDelete400);
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        return res.status(ERR_403).send(errorMessages.cardsDelete403);
      }
      next();
    });
};
