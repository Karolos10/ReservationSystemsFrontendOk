Reservation System Frontend
Este es un proyecto frontend para un sistema de reservas desarrollado con Angular. El proyecto permite gestionar reservas, autenticación de usuarios y administración de usuarios a través de un panel de administración.

Contenidos
Descripción del Proyecto
Requisitos
Instalación
Ejecución del Proyecto
Estructura del Proyecto
Cómo Contribuir
Licencia
Descripción del Proyecto
Este proyecto permite a los usuarios autenticarse, gestionar sus reservas y a los administradores gestionar usuarios y reservas. El sistema incluye:

Inicio de sesión: Autenticación de usuarios con roles (NORMAL y ADMIN).
(Solo esta desarrollado para un usuario normal, no se implemento para admin)
Dashboard: Interfaz para gestionar reservas y consultar negocios.
Registro: Opción para que los nuevos usuarios se registren en el sistema.
Guardias de ruta: Protegen las rutas basadas en los roles de usuario.
Interceptors: Manejan la autenticación en las solicitudes HTTP.
Requisitos
Node.js (v14.x o superior)
npm (v6.x o superior)

Instalación
Clona el repositorio:

git clone <url-del-repositorio>
Accede al directorio del proyecto:

cd nombre-del-proyecto
Instala las dependencias:

npm install

Ejecución del Proyecto
Para ejecutar el proyecto en modo desarrollo, usa el siguiente comando:

npm run start