Guía rápida para abrir el proyecto GIGS

Este documento explica los pasos básicos para abrir y ejecutar el proyecto pagina-web-GIGS en un entorno local.

1. Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

Node.js (versión recomendada LTS)

npm (incluido con Node.js)

Visual Studio Code

2. Configuración de variables de entorno (.env)

⚠️ Este paso es obligatorio y debe hacerse antes de ejecutar el proyecto.

En la raíz del proyecto, crear los archivos .env y .env.local según el .env.example

Agregar todas las variables necesarias (credenciales, puertos, claves de servicios externos, etc.).

Guardar ambos archivos .env.

Nota: El proyecto no funcionará correctamente si los archivos .env no están configurados.

3. Instalación de dependencias

Abrir una terminal en la raíz del proyecto (pagina-web-GIGS) y ejecutar:

npm install


Este comando instalará todas las dependencias necesarias tanto para el frontend como para el backend.

4. Ejecución del proyecto

Una vez configurado el .env e instaladas las dependencias, ejecutar:

npm run dev


Este comando levantará simultáneamente:

El backend (API)

El frontend (web)

5. Acceso al proyecto

Frontend: disponible en el navegador según el puerto configurado (por defecto http://localhost:5174).

Backend: se ejecuta en el puerto definido en el archivo .env.

6. Notas importantes

Si se clona el proyecto nuevamente, siempre es necesario volver a ejecutar npm install.

El archivo .env no debe subirse al repositorio.

Ante errores, verificar primero que las variables de entorno estén correctamente configuradas.