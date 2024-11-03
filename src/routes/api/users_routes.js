const router = require('express').Router();
const { newUser, login, profile } = require('../../controllers/users_controllers');
const { userLogging } = require('../../utils/middlewares');


router.post('/register', newUser);


router.post('/login', login);


router.get('/profile', userLogging, profile);



module.exports = router;