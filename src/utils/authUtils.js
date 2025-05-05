// Almacenamos la contraseña en una constante
// En un entorno de producción real, esto debería ser más seguro
export const PASSWORD = "0409";

// Verificar si la contraseña es correcta
export function verifyPassword(password) {
  return password === PASSWORD;
}

// Verificar si hay una sesión activa
export function isLoggedIn() {
  // Solo ejecutamos esta función en el cliente, no en SSR
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    return localStorage.getItem('isAuthenticated') === 'true';
  } catch (error) {
    console.error('Error al acceder a localStorage:', error);
    return false;
  }
}

// Iniciar sesión
export function login() {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('isAuthenticated', 'true');
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
}

// Cerrar sesión
export function logout() {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem('isAuthenticated');
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error);
  }
}