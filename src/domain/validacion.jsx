function validacion(age, username, password) {
  const errors = [];

  
  if (typeof age !== "number") {
    errors.push("La edad debe ser un número.");
  } else {
    if (age < 18) errors.push("Edad mínima 18 años.");
    if (age > 65) errors.push("Edad máxima 65 años.");
  }

  
  if (typeof username !== "string") {
    errors.push("El nombre de usuario debe ser texto.");
  } else {
    if (username.length < 3) errors.push("Nombre de usuario demasiado corto (mínimo 3).");
    if (username.length > 15) errors.push("Nombre de usuario demasiado largo (máximo 15).");
  }

  if (typeof password !== "string") {
    errors.push("La contraseña debe ser texto.");
  } else {
    if (password.length < 8) errors.push("Contraseña demasiado corta (mínimo 8).");
    if (password.length > 20) errors.push("Contraseña demasiado larga (máximo 20).");
    if (!/\d/.test(password)) errors.push("La contraseña debe contener al menos un dígito.");
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validacion };
