// Nombre: no vacío y al menos 3 caracteres
export function validarNombre(nombre: string): boolean {
  return nombre.trim().length >= 3;
}

// Correo: no vacío y contiene @
export function validarCorreo(correo: string): boolean {
  return correo.trim().length > 0 && correo.includes('@');
}

// Edad: número entero entre 15 y 80
export function validarEdad(edad: string): boolean {
  const numero = Number(edad);
  return Number.isInteger(numero) && numero >= 15 && numero <= 80;
}

// Curso: no vacío y al menos 3 caracteres
export function validarCurso(curso: string): boolean {
  return curso.trim().length >= 3;
}
