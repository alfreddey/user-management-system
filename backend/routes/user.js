const router = require('express').Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');


router.use(AuthMiddleware.verifyToken);

router.get('/', UserController.getUsers);

router.post('/', UserController.createUser);

router.get('/:id', UserController.getUser);

router.patch('/:id', UserController.updateUser);

router.delete('/:id', [ AuthMiddleware.isAdmin ], UserController.deleteUser);




module.exports = router;