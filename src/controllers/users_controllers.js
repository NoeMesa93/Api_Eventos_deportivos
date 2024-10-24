const { newUser, getById } = require("../models/users_models");

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
    try {
        const user = await newUser(req.body);
        if (user === 0) {
            return res.status(404).json({ message: 'Error, login incorrecto' });
        }
        const userId = await getById(user);
        console.log(user)
        res.json(userId);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    UserId,
    postUser
}