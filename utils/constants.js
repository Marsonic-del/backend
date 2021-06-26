// Константные значения кодов ошибок
const ERR_400 = 400;
const ERR_404 = 404;
const ERR_500 = 500;
const ID_LENGTH = 24;

// Обьекты с описанием ошибки
const errorMessages = {
  usersPost400: {
    message: "Переданы некорректные данные при создании пользователя",
  },

  usersIdGet: {
    message: "Пользователь по указанному _id не найден",
  },

  usersMePatch400: {
    message: "Переданы некорректные данные при обновлении профиля",
  },

  usersMePatch404: {
    message: "Пользователь с указанным _id не найден",
  },

  usersMeAvatarPatch400: {
    message: "Переданы некорректные данные при обновлении аватара",
  },

  usersMeAvatarPatch404: {
    message: "Пользователь с указанным _id не найден",
  },

  cardsPost400: {
    message: "Переданы некорректные данные при создании карточки",
  },

  cardsDelete404: {
    message: "Карточка с указанным _id не найдена",
  },

  cardsLikes400: {
    message: "Переданы некорректные данные для постановки/снятии лайка",
  },

  defaultMessage500: {
    message: "Ошибка сервера",
  },
};

module.exports = {
  ERR_400,
  ERR_404,
  ERR_500,
  ID_LENGTH,
  errorMessages,
};
