const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  // извлечём токен
  const token = JSON.parse(authorization.replace('Bearer ', ''));
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
