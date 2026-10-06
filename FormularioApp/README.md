# S10_PierreConca_DAM

**Desarrollo de Aplicaciones Moviles - S10 | AP5**  
Actividad Individual: Formularios y Validaciones  
React Native + Expo

---

## Descripcion

Formulario movil interactivo de **Registro de Curso** (Opcion 5) implementado con React Native y Expo Router.
Aplica manejo de estados con `useState`, captura de datos con `TextInput`, validaciones en tiempo real y feedback visual.

## Opcion implementada

**Opcion 5 - Registro de Curso**

| Campo | Validacion |
|---|---|
| Nombre del estudiante | Obligatorio, minimo 3 caracteres |
| Correo electronico | Obligatorio, debe contener `@` |
| Curso | Obligatorio, minimo 3 caracteres |
| Edad | Numero entero entre 15 y 80 |

## Conceptos aplicados

- `useState` - estado de cada campo con flag `tocado` para validacion progresiva
- `onChangeText` - validacion en tiempo real mientras el usuario escribe
- `Pressable` - boton de envio con feedback visual al presionar
- Validaciones - 4 reglas aplicadas antes del envio
- Feedback UI - mensajes de error inline por campo + pantalla de exito con resumen

## Estructura del proyecto

```
src/
??? app/
?   ??? _layout.tsx          # Configuracion del Stack Navigator
?   ??? index.tsx            # Pantalla principal del formulario
??? components/
?   ??? common/
?       ??? app-input.tsx    # Input reutilizable con soporte de error visual
?       ??? app-button.tsx   # Boton con Pressable y feedback tactil
??? constants/
?   ??? colors.ts            # Paleta de colores
?   ??? theme.ts             # Espaciados y tamanos
??? utils/
    ??? validators.ts        # Funciones de validacion puras
```

## Como ejecutar

```bash
npm install
npx expo start
```

Escanea el QR con **Expo Go** (SDK 57) desde tu dispositivo movil.

---

**Autor:** Pierre Conca  
**Curso:** Desarrollo de Aplicaciones Moviles  
**Entorno:** React Native CLI / Expo Go  
