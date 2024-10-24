const pool = require('../config/db')


// Devuelve una lista de todos los eventos deportivos.

const selectAll = async () => {
    const [result] = await pool.query('SELECT * FROM eventos');
    return result;
}

//  Devuelve los detalles de un evento específico por su ID.

const selectById = async (idEvent) => {
    const [result] = await pool.query('SELECT * FROM eventos WHERE id = ?', [idEvent]);
    if (result.lenght === 0) return null;
    return result[0]
}


// Crea un nuevo evento deportivo

const insertEvent = async ({ nombre, descripcion, fecha, ubicacion, tipoDeporte }) => {
    const [result] = await pool.query('INSERT INTO eventos (nombre, descripcion, fecha, ubicacion, tipoDeporte) values (?, ?, ?, ?, ?)', [nombre, descripcion, fecha, ubicacion, tipoDeporte]);
    if (result.affectedRows === 0) {
        return -1;
    } else {
        return result.insertId;
    }
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
    supEvent
}