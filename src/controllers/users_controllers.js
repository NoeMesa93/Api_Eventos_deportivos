const bcrypt = require('bcryptjs')

const { newUser, getById, getByUsername } = require("../models/users_models");
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
const postUser = async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    try {
        const { username } = req.body;
        const user = await getByUsername(username);
        if (user) {
            return res.status(400).json({ message: "Error existe usuario." });
        }

    } catch (error) {
        next(error)
    }

    try {
        const user = await newUser(req.body);
        if (user === 0) {
            return res.status(404).json({ message: 'Error, login incorrecto' });
        }
        res.json({ message: "Usuario creado" });
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
            return res.status(400).json({ message: 'El usuario y/o contraseña no existe' });
        }

        const contrasenasoniguales = await bcrypt.compare(password, user.password)
        if (!contrasenasoniguales) {
            return res.status(400).json({ message: 'El usuario y/o contraseña no existe' });
        }
        const token = crearToken(username);
        res.json({ token: token });

    } catch (error) {
        next(error);
    }
}


const profile = (req, res, next) => {
    console.log(req.username)

}

module.exports = {
    UserId,
    postUser,
    login,
    profile
}