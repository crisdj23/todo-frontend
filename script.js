// Configuración de la API
const API_BASE_URL = "https://tu-api.onrender.com" // Cambia esto por tu URL de Render

// Elementos del DOM
const taskForm = document.getElementById("taskForm")
const taskInput = document.getElementById("taskInput")
const tasksList = document.getElementById("tasksList")
const loadingSpinner = document.getElementById("loadingSpinner")
const errorAlert = document.getElementById("errorAlert")
const errorMessage = document.getElementById("errorMessage")
const successAlert = document.getElementById("successAlert")
const successMessage = document.getElementById("successMessage")
const emptyState = document.getElementById("emptyState")
const deleteModalElement = document.getElementById("deleteModal")
const deleteModal = new bootstrap.Modal(deleteModalElement)
const taskToDelete = document.getElementById("taskToDelete")
const confirmDeleteBtn = document.getElementById("confirmDelete")

// Variable para almacenar el ID de la tarea a eliminar
let taskToDeleteId = null

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  loadTasks()

  // Event listeners
  taskForm.addEventListener("submit", handleAddTask)
  confirmDeleteBtn.addEventListener("click", handleConfirmDelete)
})

// Mostrar/ocultar spinner de carga
function showLoading() {
  loadingSpinner.classList.remove("d-none")
}

function hideLoading() {
  loadingSpinner.classList.add("d-none")
}

// Mostrar mensajes de error
function showError(message) {
  errorMessage.textContent = message
  errorAlert.classList.remove("d-none")
  setTimeout(() => {
    errorAlert.classList.add("d-none")
  }, 5000)
}

// Mostrar mensajes de éxito
function showSuccess(message) {
  successMessage.textContent = message
  successAlert.classList.remove("d-none")
  setTimeout(() => {
    successAlert.classList.add("d-none")
  }, 3000)
}

// Cargar todas las tareas
async function loadTasks() {
  showLoading()
  hideError()

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const tasks = await response.json()
    renderTasks(tasks)
  } catch (error) {
    console.error("Error loading tasks:", error)
    showError("Error al cargar las tareas. Verifica tu conexión a internet.")
  } finally {
    hideLoading()
  }
}

// Renderizar las tareas en el DOM
function renderTasks(tasks) {
  tasksList.innerHTML = ""

  if (tasks.length === 0) {
    emptyState.classList.remove("d-none")
    return
  }

  emptyState.classList.add("d-none")

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task)
    tasksList.appendChild(taskElement)
  })

  // Mostrar contador de tareas
  updateTaskCount(tasks)
}

// Crear elemento HTML para una tarea
function createTaskElement(task) {
  const taskDiv = document.createElement("div")
  taskDiv.className = `task-item p-3 d-flex align-items-center fade-in ${task.done ? "completed" : ""}`
  taskDiv.dataset.taskId = task.id

  taskDiv.innerHTML = `
        <input 
            type="checkbox" 
            class="task-checkbox form-check-input" 
            ${task.done ? "checked" : ""}
            onchange="toggleTask(${task.id}, this.checked)"
        >
        <span class="task-title">${escapeHtml(task.title)}</span>
        <button 
            class="btn-delete ms-auto" 
            onclick="showDeleteModal(${task.id}, '${escapeHtml(task.title)}')"
            title="Eliminar tarea"
        >
            <i class="fas fa-trash-alt"></i>
        </button>
    `

  return taskDiv
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// Manejar el envío del formulario para agregar tarea
async function handleAddTask(event) {
  event.preventDefault()

  const title = taskInput.value.trim()
  if (!title) {
    showError("Por favor, escribe una tarea.")
    return
  }

  await addTask(title)
}

// Agregar nueva tarea
async function addTask(title) {
  showLoading()
  hideError()

  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, done: false }),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const newTask = await response.json()
    taskInput.value = ""
    showSuccess("Tarea agregada exitosamente")
    loadTasks() // Recargar todas las tareas
  } catch (error) {
    console.error("Error adding task:", error)
    showError("Error al agregar la tarea. Inténtalo de nuevo.")
  } finally {
    hideLoading()
  }
}

// Alternar estado de completado de una tarea
async function toggleTask(taskId, done) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done }),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const updatedTask = await response.json()

    // Actualizar la UI
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`)
    if (taskElement) {
      if (done) {
        taskElement.classList.add("completed")
        showSuccess("Tarea marcada como completada")
      } else {
        taskElement.classList.remove("completed")
        showSuccess("Tarea marcada como pendiente")
      }
    }
  } catch (error) {
    console.error("Error toggling task:", error)
    showError("Error al actualizar la tarea.")
    // Revertir el checkbox
    const checkbox = document.querySelector(`[data-task-id="${taskId}"] .task-checkbox`)
    if (checkbox) {
      checkbox.checked = !done
    }
  }
}

// Mostrar modal de confirmación para eliminar
function showDeleteModal(taskId, title) {
  taskToDeleteId = taskId
  taskToDelete.textContent = title
  deleteModal.show()
}

// Manejar confirmación de eliminación
async function handleConfirmDelete() {
  if (taskToDeleteId) {
    await deleteTask(taskToDeleteId)
    deleteModal.hide()
    taskToDeleteId = null
  }
}

// Eliminar tarea
async function deleteTask(taskId) {
  showLoading()
  hideError()

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    showSuccess("Tarea eliminada exitosamente")
    loadTasks() // Recargar todas las tareas
  } catch (error) {
    console.error("Error deleting task:", error)
    showError("Error al eliminar la tarea. Inténtalo de nuevo.")
  } finally {
    hideLoading()
  }
}

// Actualizar contador de tareas
function updateTaskCount(tasks) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.done).length
  const pendingTasks = totalTasks - completedTasks

  // Crear o actualizar el contador
  let countElement = document.getElementById("taskCount")
  if (!countElement) {
    countElement = document.createElement("div")
    countElement.id = "taskCount"
    countElement.className = "task-count text-center"
    tasksList.appendChild(countElement)
  }

  countElement.innerHTML = `
        <small class="text-muted">
            <i class="fas fa-list-ul me-1"></i>
            Total: ${totalTasks} | 
            <i class="fas fa-check-circle me-1 text-success"></i>
            Completadas: ${completedTasks} | 
            <i class="fas fa-clock me-1 text-warning"></i>
            Pendientes: ${pendingTasks}
        </small>
    `
}

// Ocultar mensajes de error
function hideError() {
  errorAlert.classList.add("d-none")
}
