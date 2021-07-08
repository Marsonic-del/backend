const jwt = require('jsonwebtoken');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { SECRET_KEY } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ForbiddenError('Необходима авторизация'));
    // return res.status(403).send({ message: 'Необходима авторизация' });
  }
  // извлечём токен
  const token = JSON.parse(authorization.replace('Bearer ', ''));
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new ForbiddenError('Необходима авторизация');
    // отправим ошибку, если не получилось
    /* return res
      .status(403)
      .send({ message: 'Необходима авторизация' }); */
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
