const router = require('express').Router();

const { selectAllEvents, selectIdEvent, postEvent, putEvent, deleteEvent, getEventsDate, eventsBySportType } = require('../../controllers/events_controllers');
const { checkEventId, usuarioEstaLogueado } = require('../../utils/middlewares');


// URL BASE: /api/events

router.get('/', selectAllEvents);
router.get('/upcoming', getEventsDate);
router.get('/sports', eventsBySportType)
router.get('/:idEvent', checkEventId, selectIdEvent);
router.post('/', postEvent);
router.put('/:idEvent', usuarioEstaLogueado, checkEventId, putEvent);
router.delete('/:idEvent', checkEventId, deleteEvent);

module.exports = router;