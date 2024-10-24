const router = require('express').Router();

const { selectAllEvents, selectIdEvent, postEvent, putEvent, deleteEvent, getEventsDate, eventsBySportType } = require('../../controllers/events_controllers');

// URL BASE: /api/events

router.get('/', selectAllEvents);
router.get('/upcoming', getEventsDate);
router.get('/sports', eventsBySportType)
router.get('/:idEvent', selectIdEvent);
router.post('/', postEvent);
router.put('/:idEvent', putEvent);
router.delete('/:idEvent', deleteEvent);

module.exports = router;