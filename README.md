# S10_PierreConca_DAM

**Desarrollo de Aplicaciones Móviles — S10 | AP5**  
Actividad Individual: Formularios y Validaciones  
React Native + Expo

---

## Descripción

Formulario móvil interactivo de **Registro de Curso** (Opción 5) implementado con React Native y Expo Router. Aplica manejo de estados con `useState`, captura de datos con `TextInput`, validaciones en tiempo real y feedback visual al usuario.

## Opción implementada

**Opción 5 — Registro de Curso**

| Campo | Validación |
|---|---|
| Nombre del estudiante | Obligatorio, mínimo 3 caracteres |
| Correo electrónico | Obligatorio, debe contener `@` |
| Curso | Obligatorio, mínimo 3 caracteres |
| Edad | Número entero entre 15 y 80 |

## Conceptos aplicados

- `useState` — estado de cada campo con flag `tocado` para validación progresiva
- `onChangeText` — validación en tiempo real mientras el usuario escribe
- `Pressable` — botón de envío con feedback visual (escala + color al presionar)
- Validaciones — 4 reglas aplicadas antes del envío
- Feedback UI — mensajes de error inline por campo + pantalla de éxito con resumen

## Estructura del proyecto

```
src/
├── app/
│   ├── _layout.tsx          # Configuración del Stack Navigator
│   └── index.tsx            # Pantalla principal del formulario
├── components/
│   └── common/
│       ├── app-input.tsx    # Input reutilizable con soporte de error visual
│       └── app-button.tsx   # Botón con Pressable y feedback táctil
├── constants/
│   ├── colors.ts            # Paleta de colores
│   └── theme.ts             # Espaciados, radios y tamaños de fuente
└── utils/
    └── validators.ts        # Funciones de validación puras
```

## Cómo ejecutar

```bash
npm install
npx expo start
```

Escanea el QR con **Expo Go** (SDK 57) desde tu dispositivo móvil.

## Capturas de pantalla

### Formulario principal
Pantalla principal con los 4 campos y panel de validaciones en tiempo real.

### Validaciones con errores
Al presionar "Registrar estudiante" con campos vacíos o inválidos, se muestran mensajes de error inline en rojo bajo cada campo.

### Registro exitoso
Al completar todos los campos correctamente, se muestra una pantalla de éxito con el resumen de los datos ingresados.

---

**Autor:** Pierre Conca  
**Curso:** Desarrollo de Aplicaciones Móviles  
**Entorno:** React Native CLI / Expo Go  
