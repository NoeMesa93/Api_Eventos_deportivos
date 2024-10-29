const router = require('express').Router();
const { userLogging } = require('../utils/middlewares.js');


router.use('/events', userLogging, require('./api/events_routes.js'));
router.use('/users', require('./api/users_routes.js'));

module.exports = router;