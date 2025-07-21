📄 Descripción del Proyecto

Este proyecto es una API RESTful desarrollada con NestJS que gestiona información relacionada con doctores y servicios médicos. La aplicación implementa operaciones CRUD completas con eliminación lógica, validaciones de entrada, y paginación para una gestión eficiente de datos.

La arquitectura utilizada está basada en el patrón Modular + MVC, donde cada funcionalidad está organizada en módulos independientes que encapsulan sus controladores, servicios y entidades. Además, se utiliza TypeORM como ORM para la interacción con una base de datos relacional PostgreSQL.

🏗️ Tecnologías y herramientas principales:

NestJS (framework backend)

TypeORM (ORM)

PostgreSQL (Base de datos)

Class-validator y class-transformer (Validaciones)

Swagger (Documentación API opcional)

Postman (Pruebas)

Instalación y ejecución

1. Clona el repositorio:

   ```
   git clone https://github.com/shesith/prueba_backend.git
   cd prueba_backend
   ```

2. Instala dependencias:

   ```
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz con el siguiente contenido:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_NAME=tu_base_de_datos
     JWT_SECRET=supersecreto
     ```

4. Inicia el servidor:

   ```
   npm run start:dev
   ```

5. Accede a la documentación Swagger en:
   ```
   http://localhost:3000/api
   ```

## Credenciales de prueba

- **ADMIN:**  
  email: admin@correo.com  
  password: 123456

- **CLIENTE:**  
  email: cliente@correo.com  
  password: 123456
