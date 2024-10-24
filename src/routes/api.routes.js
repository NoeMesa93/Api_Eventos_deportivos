const router = require('express').Router();

router.use('/events', require('./api/events_routes.js'));
router.use('/users', require('./api/users_routes.js'));

module.exports = router;