const router = require('express').Router();
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const { id, updateInfo, updateAvatar } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', id, getUserById);
router.patch('/me', updateInfo, updateUserInfo);
router.patch('/me/avatar', updateAvatar, updateUserAvatar);

module.exports = router;
