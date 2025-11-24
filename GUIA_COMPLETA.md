# 🔮 Guía Completa - Manifest 369

## 📖 Índice
1. [Instalación](#instalación)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Flujo de Usuario](#flujo-de-usuario)
4. [Componentes Principales](#componentes-principales)
5. [Estado Global](#estado-global)
6. [Personalización](#personalización)
7. [Despliegue](#despliegue)

---

## 🚀 Instalación

### Paso 1: Instalar Dependencias

```bash
npm install
```

### Paso 2: Configurar Variables de Entorno (Opcional)

Crea un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_aqui
```

> **Nota**: Sin Supabase, la app funciona perfectamente con LocalStorage.

### Paso 3: Iniciar Desarrollo

```bash
npm run dev
```

La app estará en: http://localhost:3000

---

## 📁 Estructura del Proyecto

```
carolina/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal con PWA meta tags
│   ├── page.tsx                 # Home (progreso y botón iniciar)
│   ├── globals.css              # Estilos globales + tema
│   ├── not-found.tsx            # Página 404 personalizada
│   └── ritual/                  # Páginas del ritual
│       ├── sintonia/
│       │   └── page.tsx         # Paso 1: Reproductor de música
│       ├── fase-3/
│       │   └── page.tsx         # Paso 2: Deseo (3 repeticiones)
│       ├── fase-6/
│       │   └── page.tsx         # Paso 3: Intención (6 repeticiones)
│       ├── fase-9/
│       │   └── page.tsx         # Paso 4: Resultado (9 repeticiones)
│       └── cierre/
│           └── page.tsx         # Paso 5: Resumen y guardado
├── components/
│   └── LongPressButton.tsx      # Botón de visualización (long press)
├── store/
│   └── useRitualStore.ts        # Estado global con Zustand
├── lib/
│   ├── utils.ts                 # Utilidades (cn)
│   └── supabase.ts              # Cliente Supabase + funciones
├── hooks/
│   ├── useVibration.ts          # Hook para vibración
│   └── useLocalStorage.ts       # Hook para localStorage reactivo
├── public/
│   └── manifest.json            # Configuración PWA
└── package.json
```

---

## 🎯 Flujo de Usuario

### 1. **Home** (`/`)
- Muestra progreso circular (Día X de 21)
- Botón "Iniciar Ritual"
- Si ya se completó hoy: "Portal Cerrado"

### 2. **Sintonización** (`/ritual/sintonia`)
- Reproductor de música simulado
- Botón "Continuar" deshabilitado hasta reproducir
- Ondas de sonido animadas

### 3. **Fase 3 - Deseo** (`/ritual/fase-3`)
- Textarea para escribir el deseo (1 vez)
- Vista de visualización con LongPressButton
- Contador: 3 repeticiones
- Avanza automáticamente al completar

### 4. **Fase 6 - Intención** (`/ritual/fase-6`)
- Textarea para escribir la intención (1 vez)
- Vista de visualización con LongPressButton
- Contador: 6 repeticiones
- Avanza automáticamente al completar

### 5. **Fase 9 - Resultado** (`/ritual/fase-9`)
- Textarea para escribir el resultado (1 vez)
- Vista de visualización con LongPressButton
- Contador: 9 repeticiones
- Avanza automáticamente al completar

### 6. **Cierre** (`/ritual/cierre`)
- Resumen del ritual completo
- Botón "Sellar en el Universo"
- Guarda en Supabase + LocalStorage
- Redirige al Home

---

## 🧩 Componentes Principales

### LongPressButton

Botón circular para visualizaciones con:
- Progreso circular visual
- Vibración al iniciar y completar
- Partículas animadas
- Contador de porcentaje
- Efecto de éxito al terminar

**Props:**
```typescript
interface LongPressButtonProps {
  onComplete: () => void
  duration?: number // milisegundos (default: 3000)
  label?: string    // texto del botón
}
```

**Uso:**
```tsx
<LongPressButton 
  onComplete={() => incrementVisualizacion('3')}
  duration={3000}
  label="Mantén para Visualizar"
/>
```

---

## 🗃️ Estado Global (Zustand)

### useRitualStore

Maneja todo el estado del ritual:

```typescript
// Estados
currentPhase: 'sintonia' | '3' | '6' | '9' | 'cierre' | null
deseo: string
intencion: string
resultado: string
deseoVisualizaciones: number
intencionVisualizaciones: number
resultadoVisualizaciones: number
musicPlaying: boolean

// Acciones
setPhase(phase)
setDeseo(text)
setIntencion(text)
setResultado(text)
incrementVisualizacion(phase)
setMusicPlaying(playing)
resetRitual()
```

**Uso en componente:**
```tsx
const { deseo, setDeseo, incrementVisualizacion } = useRitualStore()
```

---

## 🎨 Personalización

### Colores

Edita `tailwind.config.ts`:

```typescript
colors: {
  'violet-deep': '#1a0b2e',  // Violeta profundo
  'violet-dark': '#0f0518',  // Violeta oscuro
  'gold': '#ffd700',         // Dorado
  'dark': '#0a0a0a',         // Negro
}
```

### Animaciones

Las animaciones están en `app/globals.css`:

```css
/* Gradiente animado */
.gradient-bg {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a0b2e 50%, #0f0518 100%);
  background-size: 200% 200%;
  animation: gradient-shift 15s ease infinite;
}

/* Efecto cristal */
.glass {
  background: rgba(26, 11, 46, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 215, 0, 0.1);
}
```

### Duración de Visualizaciones

En cada componente de fase, cambia:

```tsx
<LongPressButton 
  duration={3000}  // Cambia esto (en milisegundos)
/>
```

---

## 📱 Características PWA

### Instalable
- Android: Desde Chrome → Menú → "Agregar a pantalla de inicio"
- iOS: Desde Safari → Compartir → "Agregar a pantalla de inicio"
- Desktop: Icono de instalación en la barra de direcciones

### Funciona Offline
Para habilitar modo offline, agrega un Service Worker en `public/sw.js`:

```javascript
// Service Worker básico
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('manifest369-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png',
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

Registra en `app/layout.tsx`:

```tsx
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
}, [])
```

---

## 🚀 Despliegue

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa en [Vercel](https://vercel.com)
3. Agrega variables de entorno (si usas Supabase)
4. Deploy automático

### Netlify

```bash
npm run build
```

Sube la carpeta `.next` a Netlify.

### Dominio Propio

Para que funcione como PWA en producción:
- **HTTPS es obligatorio**
- Configura los DNS correctamente
- El manifest.json debe ser accesible

---

## 🗄️ Base de Datos (Supabase)

### Crear Tabla

En el SQL Editor de Supabase:

```sql
create table rituals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users default auth.uid(),
  day integer not null,
  deseo text not null,
  intencion text not null,
  resultado text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table rituals enable row level security;

create policy "Users can view own rituals"
  on rituals for select
  using (auth.uid() = user_id);

create policy "Users can insert own rituals"
  on rituals for insert
  with check (auth.uid() = user_id);
```

### Funciones Disponibles

```typescript
import { saveRitual, getRituals, getLastRitual } from '@/lib/supabase'

// Guardar ritual
await saveRitual({
  day: 1,
  deseo: "...",
  intencion: "...",
  resultado: "..."
})

// Obtener todos los rituales
const { data } = await getRituals()

// Obtener último ritual
const { data } = await getLastRitual()
```

---

## 🐛 Problemas Comunes

### La app no se instala como PWA
- Verifica que estés en HTTPS (excepto localhost)
- Asegúrate de que los iconos existan en `public/`
- Revisa el manifest.json en DevTools

### Las animaciones van lentas
- Reduce el número de partículas en los fondos
- Desactiva blur effects en móviles antiguos

### El localStorage no funciona
- Verifica que el navegador permita cookies
- Modo incógnito puede bloquear localStorage

### Supabase no guarda datos
- Verifica las credenciales en `.env.local`
- Revisa las políticas RLS en Supabase
- La app funcionará igual con solo LocalStorage

---

## 📈 Próximas Características

- [ ] Sistema de autenticación completo
- [ ] Historial de rituales pasados
- [ ] Gráficas de progreso
- [ ] Notificaciones push para recordatorios
- [ ] Modo oscuro/claro configurable
- [ ] Exportar rituales a PDF
- [ ] Música integrada con Spotify/SoundCloud
- [ ] Compartir en redes sociales

---

## 📄 Licencia

MIT - Haz lo que quieras con este código ✨

---

**¿Preguntas?** Revisa el código, está bien comentado. Happy manifesting! 🔮

