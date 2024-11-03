const router = require('express').Router();
const { selectEventsOrSportType, selectIdEvent, postEvent, putEvent, deleteEvent, getEventsDate, selectBySportType, eventByDateRange, pagination } = require('../../controllers/events_controllers');
const { checkEventId, checkAdmin, singleFileUpload } = require('../../utils/middlewares');


// URL BASE: /api/events


//Mostrar todos los eventos o por tipo de deporte
router.get('/', selectEventsOrSportType);

//Mostrar próximos eventos por fecha ascendente.
router.get('/upcoming', getEventsDate);

// Mostrar eventos por paginación y límite.
router.get('/page', pagination)

// Mostrar próximos eventos por rango de fecha
router.get('/date', eventByDateRange);

// Mostrar eventos por id.
router.get('/:idEvent', checkEventId, selectIdEvent);

// Crear nuevo evento.
router.post('/', checkAdmin, singleFileUpload, postEvent);

// Modificar evento por id.
router.put('/:idEvent', checkAdmin, checkEventId, putEvent);

// Eliminar evento por id.
router.delete('/:idEvent', checkAdmin, checkEventId, deleteEvent);



module.exports = router;