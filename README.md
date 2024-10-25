Documentación y Pruebas
Instrucciones claras para probar la API. Incluye documentación básica sobre cómo registrarse, iniciar sesión y probar las funcionalidades.

Esta API está diseñada para la gestión de eventos deportivos, creada con Node.js, express y Mysql.
Permite a los usuarios registrar nuevos eventos y consultar detalles de eventos existentes.
Los endpoints de la API incluyen funcionalidades para crear, obtener, actualizar y eliminar información tanto de eventos como de usuarios. La estructura está pensada para facilitar la integración con sistemas de gestión de eventos, con un enfoque en la simplicidad y la escalabilidad.

## USUARIOS

Podemos hacer varias peticiones a usuarios:

## Registro de usuario

URL: /api/users/register
MÉTODO: POST
HEADERS: X
BODY: { "username": "nombreDeNuevoUsuario", "password": "contraseñaUsuario" }

- Tanto la password como el usuario serán encriptados.
- La respuesta será el nuevo usuario creado con la password encriptada.

## Login de usuario

URL: /api/users/login:
MÉTODO: POST
HEADERS:
BODY: {}

## Deuelve la información del usuario autenticado.

URL: /api/users/profile
MÉTODO: GET
HEADERS:
BODY: {}

- Devuelve la información protegida, solo accesible para el usuario logueado.
