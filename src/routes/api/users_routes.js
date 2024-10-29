const { newUser, login, profile } = require('../../controllers/users_controllers');
const { userLogging } = require('../../utils/middlewares');

const router = require('express').Router();


router.post('/register', newUser);


router.post('/login', login);


router.get('/profile', userLogging, profile);



module.exports = router;