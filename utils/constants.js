// Константные значения кодов ошибок
const ERR_400 = 400;
const ERR_401 = 401;
const ERR_403 = 403;
const ERR_404 = 404;
const ERR_500 = 500;
const SECRET_KEY = 'some-secret-key';

// Обьекты с описанием ошибки
const errorMessages = {
  usersPost400: {
    message: 'Переданы некорректные данные при создании пользователя',
  },

  usersIdGet: {
    message: 'Пользователь по указанному _id не найден',
  },

  usersMePatch400: {
    message: 'Переданы некорректные данные при обновлении профиля',
  },

  usersMePatch404: {
    message: 'Пользователь с указанным _id не найден',
  },

  usersMeAvatarPatch400: {
    message: 'Переданы некорректные данные при обновлении аватара',
  },

  usersMeAvatarPatch404: {
    message: 'Пользователь с указанным _id не найден',
  },

  cardsPost400: {
    message: 'Переданы некорректные данные при создании карточки',
  },

  cardsDelete400: {
    message: 'Карточка с указанным _id не найдена',
  },

  cardsDelete403: {
    message: 'Вы не можете удалять чужые карточки',
  },

  cardsLikes400: {
    message: 'Переданы некорректные данные для постановки/снятии лайка',
  },

  defaultMessage500: {
    message: 'Ошибка сервера',
  },
};

module.exports = {
  ERR_400,
  ERR_401,
  ERR_403,
  ERR_404,
  ERR_500,
  SECRET_KEY,
  errorMessages,
};
