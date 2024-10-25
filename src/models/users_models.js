const pool = require('../config/db');

// Obtener un único usuario con el username

const getByUsername = async (username) => {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (result.length === 0) {
        return null;
    }
    return result[0]
}


// Obtener usuario por Id.
const getById = async (idUser) => {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [idUser])
    if (result.length === 0) return null;
    return result[0];
}


// Crear nuevo usuario.
const newUser = async ({ username, password }) => {
    const [result] = await pool.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password])
    if (result.affectedRows === 0) {
        return -1
    } else return result.insertId;
}


// Permite a los usuarios autenticarse.



module.exports = {
    getById,
    newUser,
    getByUsername
}