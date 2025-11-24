# ✅ Checklist - Manifest 369

## 📋 Antes de Empezar

- [ ] Node.js instalado (v18 o superior)
- [ ] npm o yarn instalado
- [ ] Editor de código (VS Code recomendado)

---

## 🚀 Setup Inicial

### Paso 1: Instalación
- [ ] Ejecutar `npm install`
- [ ] Esperar que se instalen todas las dependencias
- [ ] Verificar que no hay errores

### Paso 2: Iconos PWA (IMPORTANTE) ⭐
- [ ] Crear o descargar `icon-192.png` (192x192px)
- [ ] Crear o descargar `icon-512.png` (512x512px)
- [ ] Colocar ambos iconos en la carpeta `public/`
- [ ] Verificar que las rutas en `manifest.json` sean correctas

**Opciones para crear iconos**:
- 🌐 Online: [pwabuilder.com/imageGenerator](https://www.pwabuilder.com/imageGenerator)
- 🎨 Diseño: Fondo violeta (#1a0b2e) + texto "369" dorado (#ffd700)
- 🖼️ Canva/Figma: Crear diseño personalizado

### Paso 3: Iniciar Desarrollo
- [ ] Ejecutar `npm run dev`
- [ ] Abrir http://localhost:3000
- [ ] Verificar que la app carga correctamente

---

## 🧪 Testing Manual

### Home Page
- [ ] ✅ Aparece el progreso circular
- [ ] ✅ Muestra "Día 1 de 21"
- [ ] ✅ Botón "Iniciar Ritual" visible
- [ ] ✅ Animaciones de estrellas funcionan
- [ ] ✅ Diseño responsive (probar en móvil)

### Página de Sintonización
- [ ] ✅ Navega desde Home al hacer clic
- [ ] ✅ Reproductor de música visible
- [ ] ✅ Botón Play/Pause funciona
- [ ] ✅ Botón "Continuar" deshabilitado inicialmente
- [ ] ✅ Botón "Continuar" se habilita después de Play
- [ ] ✅ Animaciones de ondas funcionan

### Fase 3 (Deseo)
- [ ] ✅ Textarea para escribir visible
- [ ] ✅ Instrucciones claras
- [ ] ✅ Contador de caracteres funciona
- [ ] ✅ Botón "Comenzar Visualización" se habilita al escribir
- [ ] ✅ Cambia a vista de visualización
- [ ] ✅ LongPressButton aparece
- [ ] ✅ Contador muestra 3 repeticiones restantes
- [ ] ✅ Long press funciona (mantener 3 segundos)
- [ ] ✅ Vibración al presionar (si dispositivo lo permite)
- [ ] ✅ Progreso visual se actualiza
- [ ] ✅ Avanza automáticamente tras 3 repeticiones

### Fase 6 (Intención)
- [ ] ✅ Todo lo mismo que Fase 3
- [ ] ✅ Pero con 6 repeticiones
- [ ] ✅ Avanza automáticamente tras 6 repeticiones

### Fase 9 (Resultado)
- [ ] ✅ Todo lo mismo que Fase 3
- [ ] ✅ Pero con 9 repeticiones
- [ ] ✅ Avanza automáticamente tras 9 repeticiones

### Página de Cierre
- [ ] ✅ Muestra resumen completo
- [ ] ✅ Deseo visible
- [ ] ✅ Intención visible
- [ ] ✅ Resultado visible
- [ ] ✅ Botón "Sellar en el Universo" funciona
- [ ] ✅ Animación de carga al guardar
- [ ] ✅ Redirecciona al Home

### Home Después de Completar
- [ ] ✅ Muestra "Portal Cerrado"
- [ ] ✅ Botón deshabilitado
- [ ] ✅ Mensaje "Regresa mañana"

---

## 📱 Testing en Móvil

### Preparación
- [ ] Encontrar tu IP local
  - Windows: `ipconfig`
  - Mac/Linux: `ifconfig`
- [ ] En móvil, abrir `http://TU_IP:3000`

### Tests Móviles
- [ ] ✅ La app carga correctamente
- [ ] ✅ Diseño ocupa toda la pantalla
- [ ] ✅ Sin zoom no deseado en inputs
- [ ] ✅ Long press funciona con touch
- [ ] ✅ Vibración funciona (si está habilitada)
- [ ] ✅ Animaciones fluidas (sin lag)
- [ ] ✅ Scroll funciona correctamente

### Instalación como PWA
- [ ] Android Chrome: Menú → "Agregar a pantalla de inicio"
- [ ] iOS Safari: Compartir → "Agregar a pantalla de inicio"
- [ ] Verificar que el icono aparece correctamente
- [ ] Abrir desde el icono
- [ ] Verificar que se abre en fullscreen (sin barra navegador)

---

## 🔧 Configuración Opcional

### Supabase (Si quieres persistencia en la nube)
- [ ] Crear cuenta en supabase.com
- [ ] Crear nuevo proyecto
- [ ] Copiar Project URL y anon key
- [ ] Crear archivo `.env.local` con las credenciales
- [ ] En Supabase SQL Editor, ejecutar script de creación de tabla
- [ ] Verificar que las políticas RLS están activas
- [ ] Probar guardando un ritual

### Sin Supabase
- [ ] Verificar que funciona con localStorage
- [ ] Abrir DevTools → Application → Local Storage
- [ ] Verificar que se guarda `manifest369_currentDay`
- [ ] Verificar que se guarda `manifest369_lastCompleted`

---

## 🎨 Personalización (Opcional)

### Colores
- [ ] Editar `tailwind.config.ts`
- [ ] Cambiar `violet-deep`, `gold`, etc.
- [ ] Reiniciar dev server

### Duraciones
- [ ] Cambiar `duration={3000}` en LongPressButton
- [ ] Ajustar velocidades de animación en cada página

### Textos
- [ ] Cambiar frases inspiradoras
- [ ] Personalizar instrucciones
- [ ] Adaptar placeholders

---

## 🚀 Preparación para Producción

### Build
- [ ] Ejecutar `npm run build`
- [ ] Verificar que compila sin errores
- [ ] Ejecutar `npm start`
- [ ] Probar la versión de producción localmente

### Despliegue en Vercel
- [ ] Subir código a GitHub
- [ ] Crear cuenta en vercel.com
- [ ] Importar repositorio
- [ ] Agregar variables de entorno (si usas Supabase)
- [ ] Deploy automático
- [ ] Verificar que funciona en producción
- [ ] Probar instalación de PWA desde dominio público

### HTTPS (Obligatorio para PWA)
- [ ] Verificar que el dominio tiene HTTPS
- [ ] Confirmar que manifest.json es accesible
- [ ] Verificar que los iconos se cargan correctamente

---

## 🐛 Troubleshooting

Si algo no funciona:

### Dependencias
- [ ] Eliminar `node_modules` y `package-lock.json`
- [ ] Ejecutar `npm install` nuevamente
- [ ] Reiniciar servidor

### PWA no se instala
- [ ] Verificar HTTPS (o localhost)
- [ ] Confirmar que existen los iconos
- [ ] Revisar manifest.json en DevTools
- [ ] Verificar permisos del navegador

### Animaciones lentas
- [ ] Reducir número de partículas
- [ ] Desactivar blur en dispositivos antiguos
- [ ] Optimizar imágenes

### LocalStorage no funciona
- [ ] Verificar que no estás en modo incógnito
- [ ] Confirmar que el navegador permite cookies
- [ ] Limpiar cache y volver a intentar

---

## 📚 Documentación a Revisar

- [ ] README.md - Overview general
- [ ] INICIO_RAPIDO.md - Setup rápido
- [ ] INSTALACION.md - Instalación detallada
- [ ] GUIA_COMPLETA.md - Documentación técnica
- [ ] ESTRUCTURA_PROYECTO.md - Arquitectura

---

## ✨ Extras (Después de la v1.0)

- [ ] Agregar Service Worker para offline completo
- [ ] Implementar sistema de autenticación
- [ ] Crear historial de rituales
- [ ] Agregar gráficas de progreso
- [ ] Notificaciones push
- [ ] Integración con Spotify real
- [ ] Exportar rituales a PDF
- [ ] Compartir en redes sociales
- [ ] Tests automatizados
- [ ] Analytics

---

## 🎉 Finalización

Una vez completados todos los checks:

- [ ] ✅ App funciona en desarrollo
- [ ] ✅ App funciona en móvil
- [ ] ✅ PWA se instala correctamente
- [ ] ✅ Flujo completo probado
- [ ] ✅ Persistencia funciona
- [ ] ✅ Animaciones fluidas
- [ ] ✅ Sin errores de consola
- [ ] ✅ Build de producción exitoso

**¡Felicidades! Tu PWA Manifest 369 está lista 🔮✨**

---

## 📝 Notas

```
Fecha de inicio: _____________
Fecha de finalización: _____________
Versión: 1.0.0
```

¿Encontraste algún bug? Revisa el código, todo está bien documentado.

Happy manifesting! 🌟

