const { selectAll, selectById, insertEvent, updateEvent, supEvent, getByDate, getBySportType, } = require('../models/events_models')

// Seleccionar todos los eventos
const selectAllEvents = async (req, res, next) => {
    try {
        const result = await selectAll();
        if (!result) {
            return res.status(404).json({ message: 'No se encontraron eventos.' })
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

// Seleccionar evento por id
const selectIdEvent = async (req, res, next) => {
    const { idEvent } = req.params;
    const event = await selectById(idEvent);
    try {
        if (!event) {
            return res.status(400).json({ message: 'Error, el id del evento no existe' })
        }
        res.json(event);
    } catch (error) {
        next(error);
    }
}


// Crear nuevo evento
const postEvent = async (req, res, next) => {
    try {
        const result = await insertEvent(req.body);
        if (result === 0) {
            return res.status(404).json({ message: 'No se ha podido insertar el nuevo evento.' });
        }
        const event = await selectById(result);
        res.json(event);
    } catch (error) {
        next(error);
    }
}


// Actualizar evento
const putEvent = async (req, res, next) => {
    const { idEvent } = req.params;
    try {
        const result = await updateEvent(idEvent, req.body);
        if (result.affectedRows !== 1) {
            res.status(404).json({ message: 'No se ha podido actualizar el evento' })
        }
        const event = await selectById(idEvent);
        res.json(event);
    } catch (error) {
        next(error);
    }
}


// Eliminar un evento por id
const deleteEvent = async (req, res, next) => {
    const { idEvent } = req.params;
    try {
        const event = await selectById(idEvent);
        await supEvent(idEvent);
        res.json(event);
    } catch (error) {
        next(error);
    }

}


// Obtener eventos por fecha y orden ascendente.
const getEventsDate = async (req, res, next) => {
    const events = await getByDate();
    try {
        if (!events) {
            return res.status(404).json({ message: "No se encontraron eventos próximos." })
        }
        res.json(events);
    } catch (error) {
        next(error);
    }
}

// Filtrar eventos por tipos de deporte
const eventsBySportType = async (req, res, next) => {
    const { type } = req.query;
    try {
        const events = await getBySportType(type); // Usar "type" aquí también

        if (events.length === 0) {
            return res.status(404).json({ message: "No hay eventos para ese tipo de deporte" });
        }

        res.json(events); // Enviar eventos como respuesta
    } catch (error) {
        next(error); // Manejo de errores
    }
}



module.exports = {
    selectAllEvents,
    selectIdEvent,
    postEvent,
    putEvent,
    deleteEvent,
    getEventsDate,
    eventsBySportType
}