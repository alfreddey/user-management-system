const router = require('express').Router();
const AuthController = require('../controllers/auth');


router.post('/register', AuthController.registerUser);

router.post('/login', AuthController.loginUser);


module.exports = router;