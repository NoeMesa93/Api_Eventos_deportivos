// Comprobar si el clienteid es válido, si sirve para hacer peticiones.
// exports.nombredelafunción = lafunción anónima. SE PUEDE HACER TAMBIÉN CON MODULE.EXPORTS = { }
// Este checkId en principio tendrá los mismo datos que nos da la petición, porque pasa por el antes de poder hacer la petición como tal. Por lo tanto podemos extraer de los parámetros el clienteId
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const { selectById } = require('../models/events_models');


// Middleware para comprobar que el id introducido es correcto.
exports.checkEventId = async (req, res, next) => {
    const { idEvent } = req.params // Requerimos el id de los parámetros de la petición. (url)
    if (isNaN(idEvent)) {
        return res.status(400).json({ message: 'El ID introducido debe ser un número.' });
    }
    const events = await selectById(idEvent)
    if (!events) {
        return res.status(404).json({ message: 'El id introducido no existe.' })
    }
    next();
}


exports.crearToken = (username) => {
    env.config();
    const tokenkey = process.env.TOKEN_KEY
    const token = jwt.sign(username, tokenkey);
    return token
}

// Comprobar usuario por token
exports.usuarioEstaLogueado = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({ message: "No has enviado el token" })
    }
    try {
        env.config();
        const tokenkey = process.env.TOKEN_KEY;
        const userName = jwt.verify(token, tokenkey);
        req.username = userName;
        next();
    } catch (error) {
        res.status(400).json({ message: "El token es erroneo" });
    }
}



