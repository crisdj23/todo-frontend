# Todo App Backend - Flask + PostgreSQL

Una API RESTful para gestionar tareas (To-Do List) construida con Flask, Peewee ORM y PostgreSQL.

 Características

- API RESTful completa con operaciones CRUD
- Base de datos PostgreSQL con Peewee ORM
- Soporte CORS para frontend separado
- Desplegable en Render
- Endpoints de salud para monitoreo

 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/tasks` | Obtener todas las tareas |
| POST | `/tasks` | Crear una nueva tarea |
| PUT | `/tasks/<id>` | Actualizar una tarea |
| DELETE | `/tasks/<id>` | Eliminar una tarea |
| GET | `/health` | Verificar estado de la API |

 Instalación Local

### Prerrequisitos
- Python 3.8+
- PostgreSQL

### Pasos

1. Clonar el repositorio:

git clone <tu-repositorio>
cd todo-backend


2. Crear un entorno virtual:

python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate


3. Instalar dependencias:

pip install -r requirements.txt


4. Configurar PostgreSQL local:

# Crear base de datos
createdb todoapp



python app.py


La API estará disponible en \`http://localhost:5000\`
 Despliegue en Render

### Pasos para desplegar:

1. Crear cuenta en [Render](https://render.com)
2. Conectar tu repositorio de GitHub
3. Crear un nuevo PostgreSQL database
4. Crear un nuevo Web Service
5. Configurar las variables de entorno

### Variables de entorno necesarias:
- \`DATABASE_URL\`: URL de conexión a PostgreSQL (proporcionada por Render)

##  Ejemplos de uso

### Crear una tarea

  https://todo-api-jtw8.onrender.com/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Completar proyecto", "done": false}'


### Obtener todas las tareas

 https://todo-api-jtw8.onrender.comtasks


### Actualizar una tarea

 https://todo-api-jtw8.onrender.com/1 \\
  -H "Content-Type: application/json" \\
  -d '{"done": true}'


### Eliminar una tarea

 DELETE https://todo-api-jtw8.onrender.coms/1


##  Estructura del proyecto

\`\`\`
todo-backend/
├── app.py              # Aplicación Flask principal
├── models.py           # Modelos de base de datos
├── requirements.txt    # Dependencias Python
└── README.md          # Documentación
\`\`\`

 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

Licencia

Este proyecto está bajo la Licencia MIT.

---

# Todo App Frontend - HTML + JavaScript + Bootstrap

Una interfaz web moderna y responsiva para gestionar tareas (To-Do List) construida con HTML, CSS, JavaScript puro y Bootstrap 5.

 Características

- Interfaz moderna y responsiva con Bootstrap 5
- Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar)
- Confirmación modal para eliminación de tareas
- Indicadores visuales de estado (completada/pendiente)
- Contador de tareas en tiempo real
- Manejo de errores y mensajes de éxito
- Animaciones suaves y efectos hover
- Compatible con dispositivos móviles


 Tecnologías utilizadas

- HTML5
- CSS3 (con animaciones y gradientes)
- JavaScript ES6+ (Vanilla JS)
- Bootstrap 5.3.0
- Font Awesome 6.0.0


 Funcionalidades

- ✅ Agregar nuevas tareas
- ✅ Marcar tareas como completadas/pendientes
- ✅ Eliminar tareas con confirmación
- ✅ Contador de tareas (total, completadas, pendientes)
- ✅ Interfaz responsiva para móviles
- ✅ Manejo de estados de carga
- ✅ Mensajes de error y éxito
- ✅ Validación de formularios

 Configuración

### Configurar la URL de la API

Antes de usar la aplicación, debes configurar la URL de tu API backend en el archivo \`script.js\`:

javascript
const API_BASE_URL = 'https://todo-api-jtw8.onrender.com'; //

Estructura de archivos


todo-frontend/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # Lógica de la aplicación
└── README.md          # Documentación


 Despliegue en GitHub Pages

 Pasos para desplegar:

1. **Crear un repositorio en GitHub:**
   - Ve a [GitHub](https://github.com) y crea un nuevo repositorio
   - Nómbralo \`todo-frontend\` o el nombre que prefieras
   - Marca la opción "Add a README file"

2. **Subir los archivos:**
 
   git clone https://crisdj23.github.io/todo-frontend
   cd todo-frontend
   # Copia todos los archivos del frontend aquí
   git add .
   git commit -m "Initial commit: Todo app frontend"
   git push origin main


3. **Activar GitHub Pages:**
   - Ve a la configuración del repositorio (Settings)
   - Busca la sección "Pages" en el menú lateral
   - En "Source", selecciona "Deploy from a branch"
   - Selecciona la rama \`main\` y la carpeta \`/ (root)\`
   - Haz clic en "Save"

4. **Acceder a tu aplicación:**
   - Tu aplicación estará disponible en: \`https://crisdj23.github.io/todo-frontend`

##  Uso de la aplicación

1. **Agregar tarea:** Escribe en el campo de texto y presiona "Agregar" o Enter
2. **Completar tarea:** Haz clic en el checkbox para marcar como completada
3. **Eliminar tarea:** Haz clic en el ícono de basura y confirma la eliminación
4. **Ver estadísticas:** El contador muestra tareas totales, completadas y pendientes

##  Personalización

### Cambiar colores
Puedes personalizar los colores editando las variables CSS en \`styles.css\`:

css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Color de botones */
background: linear-gradient(135deg, #28a745, #20c997);


### Agregar nuevas funcionalidades
El código está estructurado de manera modular. Puedes agregar nuevas funciones en \`script.js\`:

javascript
// Ejemplo: función para editar tareas
async function editTask(taskId, newTitle) {
    // Tu código aquí
}


##  Desarrollo local

Para probar la aplicación localmente:

1. Clona el repositorio
2. Abre \`index.html\` en tu navegador
3. Asegúrate de que tu API backend esté ejecutándose
4. Configura la URL correcta en \`script.js\`

## Soporte

Si encuentras algún problema:

1. Verifica que la URL de la API esté correcta
2. Revisa la consola del navegador para errores
3. Asegúrate de que el backend esté funcionando
4. Verifica que CORS esté habilitado en el backend

##  Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

##  Licencia

Este proyecto está bajo la Licencia MIT.
