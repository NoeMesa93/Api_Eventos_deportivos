const { newUser, getById } = require("../models/users_models");

// TODO: Terminar el login del usuario, error en el id nosequé 

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

const postUser = async (req, res, next) => {
    try {
        const userId = await newUser(req.body);
        if (result === 0) {
            return res.status(404).json({ message: 'Error, login incorrecto' });
        }
        const user = await getById(userId);
        console.log(user)
        console.log(userId)
        res.json(user);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    UserId,
    postUser
}