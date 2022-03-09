const router = require('express').Router();
const { route } = require('express/lib/application');
const { getUsers, getUserById, createUser, updateUserInfo, updateUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me/:id', updateUserInfo);
router.patch('/me/avatar/:id', updateUserAvatar);

module.exports = router;