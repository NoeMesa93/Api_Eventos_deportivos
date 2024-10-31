const jwt = require('jsonwebtoken');
const env = require('dotenv');
const multer = require('multer');
const { selectById } = require('../models/events_models');
const { getByUsername } = require('../models/users_models');




const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const imageName = `image-${Date.now()}.jpg`;
        cb(null, imageName);
    }
})

const uploads = multer({ storage });

exports.singleFileUpload = uploads.single('imagen');


// Middleware para comprobar que el id introducido es correcto.
exports.checkEventId = async (req, res, next) => {
    const { idEvent } = req.params
    if (isNaN(idEvent)) {
        return res.status(400).json({ message: 'El ID introducido debe ser un número.' });
    }
    const events = await selectById(idEvent)
    if (!events) {
        return res.status(404).json({ message: 'El id introducido no existe.' })
    }
    next();
}


// Comprobar usuario por token
exports.userLogging = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Debes introducir la autenticación." })
    }
    try {
        env.config();
        const tokenkey = process.env.TOKEN_KEY;
        const userName = jwt.verify(token, tokenkey);
        req.username = userName;
        next();
    } catch (error) {
        res.status(403).json({ message: "La autenticación es errónea." });
    }
}

// El usuario nos pasa un token en el header de la petición, de ahí debemos extraer el rol y comprobar si es administrador.
exports.checkAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        env.config();
        const tokenkey = process.env.TOKEN_KEY;
        const decoded = jwt.verify(token, tokenkey);
        const user = await getByUsername(decoded);
        const userRol = user.rol;
        if (userRol !== 'admin') {
            return res.status(403).json({ message: "Debes tener permisos de administrador." });
        }
        next();
    } catch (error) {
        next(error)
    }
}




