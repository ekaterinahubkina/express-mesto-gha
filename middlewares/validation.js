const {
  celebrate, Joi, Segments,
} = require('celebrate');
const validator = require('validator');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Укажите Email',
      'string.notEmail': 'Некорректный Email',
    }),
    password: Joi.string().required().min(6).messages({
      'any.required': 'Укажите пароль',
      'string.min': 'Пароль не может быть короче 6 символов',
    }),
  }),
});

const card = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Укажите название карточки места',
        'string.min': 'Название должно быть болше 2-х символов',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.notUrl');
      }
      return value;
    }).messages({
      'any.required': 'Укажите Url',
      'string.notUrl': 'Некорректный Url',
    }),
  }),
});

module.exports = {
  register, card,
};
