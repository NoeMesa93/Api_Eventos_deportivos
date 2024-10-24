const { postUser } = require('../../controllers/users_controllers');

const router = require('express').Router();
// URL: /api/users

// POST / api / users / register: Permite registrar nuevos organizadores de eventos.Debe recibir un username y password y guardar los datos encriptados(usa bcrypt para el hashing de contraseñas).
//POST / api / users / login: Permite a los usuarios autenticarse. Devuelve un token JWT si las credenciales son correctas.Este token debe ser utilizado para acceder a las rutas protegidas de la API.
//GET / api / users / profile(opcional): Devuelve la información del usuario autenticado.Debe estar protegida y solo accesible para el usuario logueado.

router.post('/register', postUser)
router.post('/login',)
router.get('/profile')



module.exports = router;