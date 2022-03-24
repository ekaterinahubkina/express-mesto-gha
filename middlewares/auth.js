const jwt = require('jsonwebtoken');
const ErrorForbidden = require('../errors/ErrorForbidden');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ErrorForbidden('Нет прав доступа'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new ErrorForbidden('Нет прав доступа'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  console.log(req.user);
  return next();
};
