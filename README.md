Instrucciones para probar la API. Incluye documentación básica sobre cómo registrarse, iniciar sesión y probar las funcionalidades.

Esta API está diseñada para la gestión de eventos deportivos, creada con Node.js, express y base de datos MySQL.
Permite a los usuarios registrar nuevos eventos y consultar detalles de eventos existentes.
Los endpoints de la API incluyen funcionalidades para crear, obtener, actualizar y eliminar información tanto de eventos como de usuarios.
Todas las rutas de la API para eventos están protegidas mediante JWT. Para acceder a ellas, los usuarios deben incluir un token JWT en el encabezado de autorización de sus solicitudes. Un middleware verifica la validez del token y devuelve mensajes de error según el caso.

## PETICIONES A USUARIOS

### Registro de usuario

ENDPOINT: /api/users/register
MÉTODO: POST
HEADERS:
BODY:

    {
    "username": "nombre_nuevo_usuario",
    "password": "contraseñaUsuario"
    }

- Recibe un body con los datos del nuevo usuario.
- Registra un nuevo organizador de eventos, la respuesta será el nuevo usuario creado con la password ya encriptada.
- No se pueden registrar dos usuarios con el mismo nombre, si eso pasa devuelve un mensaje de error.
- Si el usuario ya existe en la base de datos, devuelve un mensaje de error.

### Login de usuario

ENDPOINT: /api/users/login
MÉTODO: POST
HEADERS:
BODY:

    {
       "username": "Nombre_de_usuario",
       "password": "contraseña_usuario"
    }

- Recibe un body con los datos del usuario ya registrado.
- Autentica al usuario si ya está registrado y devuelve un token JWT para las autorizaciones de los eventos.
- Si el usuario o la contraseña no coinciden devuelve un mensaje de error.

### Autentificación del usuario ya registrado.

URL: /api/users/profile
MÉTODO: GET
HEADERS: Authorization: <token>
BODY:

- Recibe un token JWT en el encabezado de autorización.
- Devuelve la información del usuario autorizado (id, username y contraseña encriptada).
- Es necesaria autorización para poder realizar la petición.
- Si no se incluye token o éste es erroneo, devuelve un mensaje de error.

## PETICIONES A EVENTOS

### Mostrar todos los eventos.

URL: /api/events
MÉTODO: GET
HEADERS: Authorization: <token>
BODY:

- Recibe un token JWT en el encabezado de autorización.
- Devuelve una lista con todos los eventos deportivos que hay en la base de datos.

### Mostrar evento por identificador.

URL: /api/events/:idEvent
MÉTODO: GET
HEADERS: Authorization: Bearer <token>
BODY:

- Recibe un identificador de evento en la url y un token JWT en el encabezado de autorización.
- Devuelve los datos del evento que coincida con el identificador indicado.
- Si el identificador que se proporciona no es un número muestra un error.
- Si no hay ningún evento en la base de datos con ese identificador muestra un mensaje de error.

### Crear un nuevo evento

URL: /api/events
MÉTODO: POST
HEADERS: Authorization: <token>
BODY:

{
"nombre": "XXXX",
"descripcion": "XXXX",
"fecha": "YYYY-MM-DD",
"ubicacion": "XXXX",
"tipoDeporte": "XXXX",
"organizador": "nombre_organizador"
}

- Recibe un body con los datos del nuevo evento y un token JWT en el encabezado de autorización.
- Muestra los datos del evento creado.
- Si los campos están vacíos, devuelve un mensaje de error.
- Un mismo evento no puede registrarse dos veces.
- El organizador debe existir en la base de datos.
- El usuario que crea el evento debe ser administrador.

### Cambiar la información de un evento mediante identificador.

URL: /api/events/:idEvent
MÉTODO: PUT
HEADERS: Authorization: <token>
BODY:

{
"nombre": "XXXX",
"descripcion": "XXXX",
"fecha": "YYYY-MM-DD",
"ubicacion": "XXXX",
"tipoDeporte": "XXXX",
}

- Recibe un identificador de evento en la url, un body con los datos del evento ya existente y un token JWT en el encabezado de autorización.
- Devuelve el evento actualizado y el organizador.
- Si algún campo está vacío, muestra un mensaje de error.
- El usuario que crea el evento debe ser administrador.

### Eliminar un evento mediante identificador.

URL: /api/events/:idEvent
MÉTODO: DELETE
HEADERS: Authorization: <token>
BODY:

- Recibe un identificador de evento en la url y un token JWT en el encabezado de autorización.
- Devuelve la información del elemento borrado.
- Si el id es incorrecto muestra un mensaje de error.
- El usuario que crea el evento debe ser administrador.

### Muestra una lista de los próximos eventos.

URL: /api/events/upcoming
MÉTODO: GET
HEADERS: Authorization: Bearer <token>
BODY:

- Recibe un token JWT en el encabezado de autorización.
- Devuelve la información de todos los eventos próximos hasta la fecha actual.
- Es necesaria autorización para poder realizar la petición.

### Muestra los eventos filtrados por tipo de deporte

URL: /api/events/sports?type=
MÉTODO: GET
HEADERS: Authorization: <token>
BODY: (No se requiere cuerpo en esta solicitud)

- Recibe un tipo de deporte en el endpoint y un token JWT en el encabezado de autorización.
- Devuelve todos los eventos con el tipo de deporte indicado en el endpoint.
- Si no hay eventos con ese tipo de deporte muestra error.

### Mostrar eventos por rango de fechas.

URL: /api/events/date?from=2023-09-10&to=2023-09-20
MÉTODO: GET
HEADERS: Authorization: <token>
BODY:

- Recibe un rango de fechas en el endpoint y un token JWT en el encabezado de autorización.
- Devuelve los eventos indicados entre ese rango de fechas.
- Si no se rellena una fecha muestra un mensaje de error.
- Si no escribimos la fecha completa o escribimos letras nos dará un mensaje de error.

### Mostrar eventos por paginación y límite.

URL: /api/events/page?page=1&limit=10
MÉTODO: GET
HEADERS: Authorization: Bearer <token>
BODY:

- Recibe un número de página y un límite de eventos en el endpoint y un token JWT en el encabezado de autorización.
- Devuelve eventos por paginación y límite.
- Si se rellena mal el límite o paginación muestra un mensaje de error.
