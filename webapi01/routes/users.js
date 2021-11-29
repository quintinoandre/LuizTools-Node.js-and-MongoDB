const {
	getUsers,
	getUserById,
	postUser,
	putUser,
	patchUser,
	deleteUser,
} = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const validationMiddleware = require('../middlewares/validationMiddleware');

/* GET users listing. */
router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', validationMiddleware, postUser);

router.put('/:id', validationMiddleware, putUser);

router.patch('/:id', patchUser);

router.delete('/:id', deleteUser);

module.exports = router;
