# ⚡ Inicio Rápido - Manifest 369

## 🏃‍♂️ En 3 Pasos

### 1️⃣ Instalar

```bash
npm install
```

### 2️⃣ Iniciar

```bash
npm run dev
```

### 3️⃣ Abrir

Navega a: **http://localhost:3000**

---

## 🎨 Crear Iconos PWA

Necesitas 2 imágenes en la carpeta `public/`:

- **icon-192.png** (192x192 píxeles)
- **icon-512.png** (512x512 píxeles)

### Opción 1: Generador Online
1. Ve a https://www.pwabuilder.com/imageGenerator
2. Sube una imagen
3. Descarga los iconos generados
4. Colócalos en `public/`

### Opción 2: Herramienta de Línea de Comandos
```bash
# Si tienes ImageMagick instalado
convert logo.png -resize 192x192 public/icon-192.png
convert logo.png -resize 512x512 public/icon-512.png
```

### Opción 3: Diseño Sugerido
Crea un fondo violeta (#1a0b2e) con el texto "369" en dorado (#ffd700) usando cualquier editor de imágenes.

---

## 📱 Probar en Móvil

### En tu red local:

1. Encuentra tu IP:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. En tu móvil, abre:
   ```
   http://TU_IP:3000
   ```

3. Agrega a pantalla de inicio

---

## ⚙️ Configuración Opcional (Supabase)

Si quieres persistencia en la nube:

1. Crea cuenta en [supabase.com](https://supabase.com)
2. Crea un proyecto
3. Copia las credenciales
4. Crea `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
   ```
5. Ejecuta el SQL del archivo `README.md`

> **Sin Supabase la app funciona perfectamente con LocalStorage**

---

## 🚀 Build para Producción

```bash
npm run build
npm start
```

---

## 📚 Más Información

- **Guía Completa**: `GUIA_COMPLETA.md`
- **Instalación Detallada**: `INSTALACION.md`
- **README**: `README.md`

---

## ❓ FAQ Rápido

**¿Necesito Supabase obligatoriamente?**
No, la app funciona con LocalStorage.

**¿Funciona offline?**
Una vez instalada como PWA, las páginas cacheadas funcionan offline.

**¿Puedo cambiar los colores?**
Sí, edita `tailwind.config.ts` y `app/globals.css`.

**¿Cómo despliego en producción?**
Sube a GitHub y conecta con Vercel (automático).

---

## 🎯 Estructura de Navegación

```
Home (/)
  ↓ Clic en "Iniciar Ritual"
Sintonización (/ritual/sintonia)
  ↓ Play música + Continuar
Fase 3 (/ritual/fase-3)
  ↓ Escribir + 3 visualizaciones
Fase 6 (/ritual/fase-6)
  ↓ Escribir + 6 visualizaciones
Fase 9 (/ritual/fase-9)
  ↓ Escribir + 9 visualizaciones
Cierre (/ritual/cierre)
  ↓ Sellar en el Universo
Home (/) - Día incrementado
```

---

¡Eso es todo! Comienza a manifestar 🔮✨

