// Uso de JSONBin para almacenar datos en la nube sin configuración complicada
// Esta solución no requiere instalación de paquetes adicionales
// Archivo de servicios (src/jsonbin/client.js)
// Regístrate en JSONBin.io para obtener una API key
const API_KEY = '$2a$10$/wLqY1wNeLVwYB5kWhkOBOd42sDd79L6ltW1I9WE4lxNkBYLN8uC'; // Reemplaza con tu API key de JSONBin
const BIN_ID = '$68194ede8561e97a500e7730'; // Crear un nuevo bin en JSONBin.io y usar ese ID
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Función para obtener todos los datos
async function getAllData() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-Master-Key': API_KEY
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.record || { reminders: [], likes: [] };
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    return { reminders: [], likes: [] };
  }
}

// Función para guardar todos los datos
async function saveAllData(data) {
  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error guardando datos:", error);
    return false;
  }
}

// FUNCIONES PARA RECORDATORIOS
// Función para obtener los recordatorios
export async function getReminders() {
  try {
    const data = await getAllData();
    return data.reminders || [];
  } catch (error) {
    console.error("Error obteniendo recordatorios:", error);
    return [];
  }
}

// Función para guardar la lista completa de recordatorios
export async function saveReminders(remindersList) {
  try {
    const currentData = await getAllData();
    const updatedData = { ...currentData, reminders: remindersList };
    return await saveAllData(updatedData);
  } catch (error) {
    console.error("Error guardando recordatorios:", error);
    return false;
  }
}

// Función para añadir un nuevo recordatorio
export async function addReminder(text) {
  try {
    // Obtener la lista actual
    const currentList = await getReminders();
    // Crear el nuevo elemento con ID único
    const newItem = {
      id: Date.now().toString(),
      text: text,
      createdAt: new Date().toISOString()
    };
    // Añadir a la lista y guardar
    const updatedList = [...currentList, newItem];
    await saveReminders(updatedList);
    return newItem;
  } catch (error) {
    console.error("Error añadiendo recordatorio:", error);
    throw error;
  }
}

// Función para eliminar un recordatorio
export async function deleteReminder(id) {
  try {
    // Obtener la lista actual
    const currentList = await getReminders();
    // Filtrar el elemento a eliminar
    const updatedList = currentList.filter(item => item.id !== id);
    // Guardar la lista actualizada
    await saveReminders(updatedList);
    return true;
  } catch (error) {
    console.error("Error eliminando recordatorio:", error);
    throw error;
  }
}

// FUNCIONES PARA LIKES
// Función para obtener la lista de likes
export async function getLikes() {
  try {
    const data = await getAllData();
    return data.likes || [];
  } catch (error) {
    console.error("Error obteniendo likes:", error);
    return [];
  }
}

// Función para guardar la lista completa de likes
export async function saveLikes(likesList) {
  try {
    const currentData = await getAllData();
    const updatedData = { ...currentData, likes: likesList };
    return await saveAllData(updatedData);
  } catch (error) {
    console.error("Error guardando likes:", error);
    return false;
  }
}

// Función para añadir un nuevo like
export async function addLike(text) {
  try {
    // Obtener la lista actual
    const currentList = await getLikes();
    // Crear el nuevo elemento con ID único
    const newItem = {
      id: Date.now().toString(),
      text: text,
      createdAt: new Date().toISOString()
    };
    // Añadir a la lista y guardar
    const updatedList = [...currentList, newItem];
    await saveLikes(updatedList);
    return newItem;
  } catch (error) {
    console.error("Error añadiendo like:", error);
    throw error;
  }
}

// Función para eliminar un like
export async function deleteLike(id) {
  try {
    // Obtener la lista actual
    const currentList = await getLikes();
    // Filtrar el elemento a eliminar
    const updatedList = currentList.filter(item => item.id !== id);
    // Guardar la lista actualizada
    await saveLikes(updatedList);
    return true;
  } catch (error) {
    console.error("Error eliminando like:", error);
    throw error;
  }
}