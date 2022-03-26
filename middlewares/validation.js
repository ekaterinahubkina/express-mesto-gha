const {
  celebrate, Joi, Segments,
} = require('celebrate');
const validator = require('validator');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .custom((value, helper) => {
        if (!validator.isURL(value)) {
          return helper.error('string.notUrl');
        }
        return value;
      }).messages({
        'string.notUrl': 'Некорректный формат ссылки',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Укажите Email',
      'string.notEmail': 'Неправильный формат Email',
      'string.empty': 'Поле Email не может быть пустым',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Укажите пароль',
      'string.empty': 'Поле password не может быть пустым',
    }),
  }),
});

const card = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Укажите название карточки места',
        'string.min': 'Название должно быть болше 2-х символов',
        'string.empty': 'Поле name не может быть пустым',
      }),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Укажите ссылку',
      'string.notURL': 'Неправильный формат ссылки',
      'string.empty': 'Поле link не может быть пустым',
    }),
  }),
});

const cardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Некорректный id',
        'string.hex': 'Некорректный id',
        'any.required': 'Некорректный id',
      }),
  }),
});

const id = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().length(24).hex().required()
      .messages({
        'string.length': 'Некорректный id',
        'string.hex': 'Некорректный id',
        'any.required': 'Некорректный id',
      }),
  }),
});

const updateInfo = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'any.required': 'Укажите имя',
      'string.min': 'Имя должно быть больше 2-х символов',
      'string.max': 'Имя не может быть больше 30 символов',
      'string.empty': 'Поле name не может быть пустым',
    }),
    about: Joi.string().min(2).max(30).messages({
      'any.required': 'Укажите информацию о себе',
      'string.min': 'О себе должно быть болше 2-х символов',
      'string.max': 'О себе не может быть больше 30 символов',
      'string.empty': 'Поле about не может быть пустым',
    }),
  }),
});

const updateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .custom((value, helper) => {
        if (!validator.isURL(value)) {
          return helper.error('string.notUrl');
        }
        return value;
      }).messages({
        'string.notUrl': 'Некорректный формат ссылки',
        'string.empty': 'Поле avatar не может быть пустым',
      }),
  }),
});

module.exports = {
  register, card, cardId, id, updateInfo, updateAvatar,
};
