const router = require('express').Router();

const { selectEventsOrSportType, selectIdEvent, postEvent, putEvent, deleteEvent, getEventsDate, selectBySportType, eventByDateRange, pagination } = require('../../controllers/events_controllers');
const { checkEventId, checkAdmin } = require('../../utils/middlewares');


// URL BASE: /api/events



//Mostrar todos los eventos o por tipo de deporte
router.get('/', selectEventsOrSportType);

// Mostrar eventos por tipo de deporte.
// router.get('/', selectBySportType);

//Mostrar próximos eventos por fecha ascendente.
router.get('/upcoming', getEventsDate);

router.get('/page', pagination)

// Mostrar próximos eventos por rango de fecha
router.get('/date', eventByDateRange);

// Mostrar eventos por id.
router.get('/:idEvent', checkEventId, selectIdEvent);

// Crear nuevo evento.
router.post('/', checkAdmin, postEvent);

// Modificar evento por id.
router.put('/:idEvent', checkAdmin, checkEventId, putEvent);

// Eliminar evento por id.
router.delete('/:idEvent', checkAdmin, checkEventId, deleteEvent);



module.exports = router;