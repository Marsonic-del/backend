const Card = require('../models/card');
const { ERR_400, ERR_404, errorMessages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(ERR_404).send(errorMessages.cardsDelete400);
      }
      if (card.owner !== req.user._id) {
        return res.status(ERR_400).send('You can only delete your own cards');
      }
      next();
    });
};
