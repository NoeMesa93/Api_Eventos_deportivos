const { selectAll, selectById, insertEvent, updateEvent, supEvent, getByDate, getBySportType, getEventsByDate, getElementByPage, } = require('../models/events_models')


// Seleccionar todos los eventos
const selectEventsOrSportType = async (req, res, next) => {
    try {
        if (req.query.type) {
            await selectBySportType(req, res, next)
        } else {
            const result = await selectAll();
            if (!result) return res.status(404).json({ message: 'No se encontraron eventos.' })
            res.json(result);
        }
    } catch (error) {
        next(error);
    }
}

// Seleccionar evento por id
const selectIdEvent = async (req, res, next) => {
    try {
        const { idEvent } = req.params;
        const event = await selectById(idEvent);
        res.json(event);
    } catch (error) {
        next(error);
    }
}


// Obtener eventos por fecha y orden ascendente.
const getEventsDate = async (req, res, next) => {
    try {
        const events = await getByDate();
        if (!events) return res.status(404).json({ message: 'No se encontraron eventos próximos.' })
        res.json(events);
    } catch (error) {
        next(error);
    }
}


// Filtrar eventos por tipos de deporte
const selectBySportType = async (req, res, next) => {
    const { type } = req.query;
    try {
        const events = await getBySportType(type);
        if (events.length === 0) return res.status(404).json({ message: 'No hay eventos para ese tipo de deporte' });

        res.json(events);
    } catch (error) {
        next(error);
    }
}


// Filtrar eventos por rango de fechas
const eventByDateRange = async (req, res, next) => {
    const { from, to } = req.query;
    try {
        const events = await getEventsByDate(from, to)

        if (!from || !to) {
            return res.status(404).json({ message: 'Ambas fechas deben ser rellenadas.' })
        }

        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

        if (isNaN(dateFormat) && !dateFormat.test(from) || !dateFormat.test(to)) {
            return res.status(404).json({ message: 'Formato de fecha no válido. Introduce YYYY-MM-DD' })
        }

        if (events.length === 0) {
            return res.status(404).json({ message: 'No hay eventos en ese rango de fechas.' })
        }
        res.json(events);
    } catch (error) {
        next(error);
    }
}


// Ver eventos por página
const pagination = async (req, res, next) => {
    try {
        let { page, limit } = req.query;
        if (page <= 0 || limit < 0) return res.status(401).json({ message: 'Números no válidos.' })

        if (isNaN(page) || isNaN(limit)) return res.status(401).json({ message: 'Debes introducir un número.' })

        limit = parseInt(limit)
        const offset = (page - 1) * limit;
        const pagina = await getElementByPage(limit, offset);
        res.json(pagina);
    } catch (error) {
        next(error)
    }
}

// Crear nuevo evento
const postEvent = async (req, res, next) => {
    const file = req.file.path // guardamos la URL de la imagen.
    try {
        if (!req.body.nombre || !req.body.descripcion || !req.body.fecha || !req.body.ubicacion || !req.body.tipoDeporte || !req.body.organizador) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
        req.body.imagen = file
        const result = await insertEvent(req.body);
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
        if (result.affectedRows !== 1) res.status(404).json({ message: 'No se ha podido actualizar el evento.' })

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
        if (!event) return send.status(404).json({ message: 'El evento no existe.' })
        await supEvent(idEvent);
        res.json(event);
    } catch (error) {
        next(error);
    }

}



module.exports = {
    selectEventsOrSportType,
    selectIdEvent,
    eventByDateRange,
    getEventsDate,
    selectBySportType,
    postEvent,
    putEvent,
    deleteEvent,
    pagination
}