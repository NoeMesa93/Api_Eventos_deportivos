const { postUser, login, profile } = require('../../controllers/users_controllers');
const { usuarioEstaLogueado } = require('../../utils/middlewares');

const router = require('express').Router();
// URL: /api/users


//POST/api/users/login: Permite a los usuarios autenticarse. Devuelve un token JWT si las credenciales son correctas.Este token debe ser utilizado para acceder a las rutas protegidas de la API.
//GET / api / users / profile(opcional): Devuelve la información del usuario autenticado.Debe estar protegida y solo accesible para el usuario logueado.

router.post('/register', postUser)
router.post('/login', login)
router.get('/profile', usuarioEstaLogueado, profile)



module.exports = router;