const pool = require('../config/db');

// POST / api / users / register: Permite registrar nuevos organizadores de eventos.Debe recibir un username y password y guardar los datos encriptados(usa bcrypt para el hashing de contraseñas).
const getById = async (idUser) => {
    const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [idUser])
    if (result.length === 0) return null;
    console.log(result)
    return result[0];
}

// Crear nuevo usuario

const newUser = async ({ username, password }) => {
    const [result] = await pool.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password])
    if (result.affectedRows === 0) {
        return -1
    } else return result.insertId;
}

module.exports = {
    newUser,
    getById
}