const bcrypt = require('bcryptjs')

const { getById, getByUsername, postUser } = require("../models/users_models");
const { crearToken } = require('../utils/middlewares');

// Recuperar usuario por ID
const UserId = async (req, res, next) => {
    const { userId } = req.params;
    const user = await getById(userId);
    try {
        if (!user) {
            return res.status(404).json({ message: 'No se encuentra el id del usuario' })
        }
        res.json(user)
    } catch (error) {
        next(error)
    }
}

// Crear nuevo usuario
const newUser = async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const { username } = req.body;
    try {
        const user = await getByUsername(username);
        if (user) {
            return res.status(409).json({ message: "El usuario ya existe en la base de datos." });
        }

    } catch (error) {
        next(error)
    }
    try {
        const newUserResult = await postUser(req.body);
        console.log(newUserResult)
        if (newUserResult === 0) {
            return res.status(500).json({ message: 'Error al crear el nuevo usuario.' });
        }
        res.json({
            message: `Usuario ${username} ha sido creado.👌`

        });
    } catch (error) {
        next(error);
    }
}

// Login usuario
const login = async (req, res, next) => {
    console.log('asdds')
    const { username, password } = req.body;
    try {
        const user = await getByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'El usuario y/o contraseña no existe' });
        }

        const contrasenasoniguales = await bcrypt.compare(password, user.password)
        if (!contrasenasoniguales) {
            return res.status(401).json({ message: 'El usuario y/o contraseña no existe' });
        }
        const token = crearToken(username);
        res.json({ token: token });

    } catch (error) {
        next(error);
    }
}

// Devolver información del usuario autentificado
const profile = async (req, res, next) => {
    try {
        userName = req.username
        const user = await getByUsername(userName)
        return res.json(user);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    UserId,
    newUser,
    login,
    profile
}