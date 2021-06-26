const { ERR_500, errorMessages } = require("../utils/constants");

// Обработчик стандартной ошибки сервера (код 500)
const handleDefualtError = (req, res) => {
  return res.status(ERR_500).send(errorMessages.defaultMessage500);
};

module.exports = { handleDefualtError };
