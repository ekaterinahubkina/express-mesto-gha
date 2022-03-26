const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { register } = require('./middlewares/validation');
const ErrorNotFound = require('./errors/ErrorNotFound');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', register, login);
app.post('/signup', register, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new ErrorNotFound('Неправильный путь'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
