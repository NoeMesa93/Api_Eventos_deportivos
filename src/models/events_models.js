const pool = require('../config/db')


// Devuelve una lista de todos los eventos.
const selectAll = async () => {
    const [result] = await pool.query('SELECT * FROM eventos');
    return result;
}



//  Devuelve los detalles de un evento específico por su ID.
const selectById = async (idEvent) => {
    const [result] = await pool.query('SELECT * FROM eventos WHERE id = ?', [idEvent]);
    if (result.lenght === 0) return null;
    return result[0];
}



// Obtener eventos por fecha y orden ascendente.
const getByDate = async () => {
    const [result] = await pool.query('SELECT * FROM eventos WHERE fecha > CURDATE() ORDER BY fecha ASC');
    return result;
}


// Obtener eventos por tipos de deporte
const getBySportType = async (tipoDeporte) => {
    const [result] = await pool.query('SELECT * FROM eventos WHERE tipoDeporte = ?', [tipoDeporte])
    return result;
}


// Obtener eventos entre un rango de fechas específico.
const getEventsByDate = async (from, to) => {
    const [result] = await pool.query('SELECT * FROM eventos WHERE fecha BETWEEN ? AND ?', [from, to]);
    return result;
}


const getElementByPage = async (limit, offset) => {
    const [result] = await pool.query('SELECT * FROM eventos LIMIT ? OFFSET ?', [limit, offset]);
    if (result.lenght === 0) return null;
    return result;
}

// Crea un nuevo evento deportivo
const insertEvent = async ({ nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador, imagen }) => {
    const [result] = await pool.query('INSERT INTO eventos (nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador, imagen) values (?, ?, ?, ?, ?, ?, ?)', [nombre, descripcion, fecha, ubicacion, tipoDeporte, organizador, imagen]);
    return result.insertId;
}


// Actualizar evento existente
const updateEvent = async (idEvent, { nombre, descripcion, fecha, ubicacion, tipoDeporte }) => {
    const [result] = await pool.query('UPDATE eventos SET nombre = ?, descripcion = ?, fecha = ?, ubicacion = ?, tipoDeporte = ? WHERE id = ?', [nombre, descripcion, fecha, ubicacion, tipoDeporte, idEvent]);
    return result;
}


// Eliminar un evento por id.
const supEvent = async (idEvent) => {
    const [result] = await pool.query('DELETE FROM eventos WHERE id = ?', [idEvent]);
    return result;
}



module.exports = {
    selectAll,
    selectById,
    insertEvent,
    updateEvent,
    supEvent,
    getByDate,
    getBySportType,
    getEventsByDate,
    getElementByPage
}