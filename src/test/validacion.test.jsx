// userValidation.test.js
const { validacion } = require("../domain/validacion");

// Edad
test("Edad menor a 18 -> inválido", () => {
  const result = validacion(17, "abc", "passw0rd");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("Edad mínima 18 años.");
});

test("Edad límite inferior 18 -> válido", () => {
  const result = validacion(18, "abc", "passw0rd");
  expect(result.valid).toBe(true);
});

test("Edad mayor a 65 -> inválido", () => {
  const result = validacion(66, "abc", "passw0rd");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("Edad máxima 65 años.");
});

// Username
test("Username demasiado corto -> inválido", () => {
  const result = validacion(30, "ab", "passw0rd");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("Nombre de usuario demasiado corto (mínimo 3).");
});

test("Username límite 3 -> válido", () => {
  const result = validacion(30, "abc", "passw0rd");
  expect(result.valid).toBe(true);
});

test("Username demasiado largo -> inválido", () => {
  const longname = "a".repeat(16);
  const result = validacion(30, longname, "passw0rd");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("Nombre de usuario demasiado largo (máximo 15).");
});

// Password
test("Password demasiado corta -> inválido", () => {
  const result = validacion(30, "abc", "p4ss7");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("Contraseña demasiado corta (mínimo 8).");
});

test("Password sin dígito -> inválido", () => {
  const result = validacion(30, "abc", "password!");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("La contraseña debe contener al menos un dígito.");
});

test("Password límite y válido -> válido", () => {
  const result = validacion(30, "abc", "passw0rd");
  expect(result.valid).toBe(true);
});

test("Todos límites superiores válidos -> válido", () => {
  const username = "a".repeat(15);
  const password = "A12345678";
  const result = validacion(65, username, password);
  expect(result.valid).toBe(true);
});

test("Password demasiado larga -> inválido", () => {
  const password = "1" + "a".repeat(20); // 21 chars
  const result = validacion(30, "abc", password);
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("Contraseña demasiado larga (máximo 20).");
});


test("Edad no número -> inválido", () => {
  const result = validacion("veinte", "abc", "passw0rd");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("La edad debe ser un número.");
});

test("Username no string -> inválido", () => {
  const result = validacion(25, 12345, "passw0rd");
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("El nombre de usuario debe ser texto.");
});

test("Password no string -> inválido", () => {
  const result = validacion(25, "abc", 12345678);
  expect(result.valid).toBe(false);
  expect(result.errors).toContain("La contraseña debe ser texto.");
});
