const router = require('express').Router();

const { selectAllEvents, selectIdEvent, postEvent, putEvent, deleteEvent, getEventsDate, selectBySportType, eventByDateRange } = require('../../controllers/events_controllers');
const { checkEventId, userLogging, checkAdmin } = require('../../utils/middlewares');


// URL BASE: /api/events



//Mostrar todos los eventos.
router.get('/', userLogging, selectAllEvents);

// Mostrar eventos por tipo de deporte.
router.get('/', userLogging, selectBySportType);

//Mostrar próximos eventos por fecha ascendente.
router.get('/upcoming', userLogging, getEventsDate);

// Mostrar próximos eventos por rango de fecha
router.get('/date', eventByDateRange);

// Mostrar eventos por id.
router.get('/:idEvent', userLogging, checkEventId, selectIdEvent);

// Crear nuevo evento.
router.post('/', userLogging, checkAdmin, postEvent);

// Modificar evento por id.
router.put('/:idEvent', userLogging, checkAdmin, checkEventId, putEvent);

// Eliminar evento por id.
router.delete('/:idEvent', userLogging, checkAdmin, checkEventId, deleteEvent);



module.exports = router;