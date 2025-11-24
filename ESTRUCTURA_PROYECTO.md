# 📁 Estructura del Proyecto - Manifest 369

## 🗂️ Árbol de Archivos

```
carolina/
│
├── 📱 app/                              # Next.js App Router
│   ├── layout.tsx                      # Layout principal + PWA meta tags
│   ├── page.tsx                        # 🏠 Home (progreso circular)
│   ├── globals.css                     # 🎨 Estilos globales + tema dark
│   ├── not-found.tsx                   # 404 personalizada
│   │
│   └── 🔮 ritual/                       # Flujo del ritual (wizard)
│       ├── sintonia/
│       │   └── page.tsx               # 1️⃣ Reproductor de música
│       ├── fase-3/
│       │   └── page.tsx               # 2️⃣ Deseo (3 repeticiones)
│       ├── fase-6/
│       │   └── page.tsx               # 3️⃣ Intención (6 repeticiones)
│       ├── fase-9/
│       │   └── page.tsx               # 4️⃣ Resultado (9 repeticiones)
│       └── cierre/
│           └── page.tsx               # 5️⃣ Resumen + guardado
│
├── 🧩 components/
│   └── LongPressButton.tsx            # Botón circular de visualización
│
├── 🗃️ store/
│   └── useRitualStore.ts              # Estado global (Zustand)
│
├── 📚 lib/
│   ├── utils.ts                       # Función cn() para clases
│   └── supabase.ts                    # Cliente Supabase + helpers
│
├── 🪝 hooks/
│   ├── useVibration.ts                # Hook para vibración
│   └── useLocalStorage.ts             # Hook localStorage reactivo
│
├── 🌐 public/
│   ├── manifest.json                  # Configuración PWA ⭐
│   ├── icon-192.png                   # (Crear) Icono 192x192
│   └── icon-512.png                   # (Crear) Icono 512x512
│
├── ⚙️ Configuración
│   ├── package.json                   # Dependencias
│   ├── tsconfig.json                  # TypeScript
│   ├── tailwind.config.ts             # Tailwind + colores custom
│   ├── postcss.config.js              # PostCSS
│   ├── next.config.js                 # Next.js
│   └── .gitignore                     # Git ignore
│
└── 📖 Documentación
    ├── README.md                      # Documentación principal
    ├── INSTALACION.md                 # Guía de instalación
    ├── GUIA_COMPLETA.md               # Guía técnica completa
    ├── INICIO_RAPIDO.md               # Quick start
    └── ESTRUCTURA_PROYECTO.md         # Este archivo
```

---

## 🎯 Responsabilidades por Archivo

### 📱 App Router

#### `app/layout.tsx`
- Layout raíz de la aplicación
- Meta tags para PWA (iOS y Android)
- Contenedor híbrido (full screen móvil, centrado desktop)
- Font (Inter) y tema oscuro
- Gradiente de fondo animado

#### `app/page.tsx` (Home)
- Progreso circular (Día X de 21)
- Botón "Iniciar Ritual"
- Estado "Portal Cerrado" si ya completó hoy
- Persistencia con localStorage
- Estrellas animadas de fondo

#### `app/not-found.tsx`
- Página 404 con estilo de la app
- Botón para volver al home

---

### 🔮 Páginas del Ritual

#### `app/ritual/sintonia/page.tsx`
**Propósito**: Preparación musical
- Reproductor simulado (Frecuencia 432 Hz)
- Botón Play/Pause
- Barra de progreso animada
- Botón "Continuar" bloqueado hasta reproducir
- Ondas de sonido animadas

#### `app/ritual/fase-3/page.tsx`
**Propósito**: Escribir y visualizar el DESEO
- Textarea para escribir (1 vez)
- Vista de visualización con LongPressButton
- Total: 3 repeticiones (1 escrita + 2 visualizaciones)
- Avance automático al completar
- Contador visual de progreso

#### `app/ritual/fase-6/page.tsx`
**Propósito**: Escribir y visualizar la INTENCIÓN
- Textarea para escribir (1 vez)
- Vista de visualización con LongPressButton
- Total: 6 repeticiones (1 escrita + 5 visualizaciones)
- Avance automático al completar
- Círculos concéntricos animados

#### `app/ritual/fase-9/page.tsx`
**Propósito**: Escribir y visualizar el RESULTADO
- Textarea para escribir (1 vez)
- Vista de visualización con LongPressButton
- Total: 9 repeticiones (1 escrita + 8 visualizaciones)
- Avance automático al completar
- Rayos de energía animados

#### `app/ritual/cierre/page.tsx`
**Propósito**: Finalizar y guardar el ritual
- Resumen de deseo, intención y resultado
- Botón "Sellar en el Universo"
- Guardado en Supabase + localStorage
- Incremento de día
- Actualización de fecha de último completado
- Redirección al home

---

### 🧩 Componentes

#### `components/LongPressButton.tsx`
**Propósito**: Botón de visualización con long press
**Características**:
- Botón circular (192x192px)
- Progreso circular visual
- Detección de long press (mouse + touch)
- Vibración al inicio y fin
- Partículas animadas durante el press
- Efecto de éxito al completar
- Prevención de scroll en móvil

**Props**:
```typescript
{
  onComplete: () => void,    // Callback al completar
  duration?: number,         // Duración en ms (default: 3000)
  label?: string            // Texto del botón
}
```

---

### 🗃️ Estado Global

#### `store/useRitualStore.ts`
**Propósito**: Gestión de estado del ritual con Zustand
**Estado**:
```typescript
currentPhase: 'sintonia' | '3' | '6' | '9' | 'cierre' | null
deseo: string
intencion: string
resultado: string
deseoVisualizaciones: number       // 0-3
intencionVisualizaciones: number   // 0-6
resultadoVisualizaciones: number   // 0-9
musicPlaying: boolean
```

**Acciones**:
- `setPhase(phase)` - Cambiar fase actual
- `setDeseo(text)` - Guardar deseo
- `setIntencion(text)` - Guardar intención
- `setResultado(text)` - Guardar resultado
- `incrementVisualizacion(phase)` - +1 visualización
- `setMusicPlaying(playing)` - Toggle música
- `resetRitual()` - Reset completo

---

### 📚 Librerías

#### `lib/utils.ts`
**Propósito**: Utilidades generales
- `cn()` - Merge de clases Tailwind (clsx + tailwind-merge)

#### `lib/supabase.ts`
**Propósito**: Cliente y funciones de Supabase
**Funciones**:
- `saveRitual(entry)` - Guardar ritual completado
- `getRituals()` - Obtener todos los rituales
- `getLastRitual()` - Obtener último ritual
**Tipos**:
- `RitualEntry` - Interface del ritual

---

### 🪝 Hooks Personalizados

#### `hooks/useVibration.ts`
**Propósito**: Gestión de vibración del dispositivo
**Funciones**:
- `vibrate(pattern)` - Vibración personalizada
- `vibrateSuccess()` - Patrón de éxito
- `vibrateError()` - Patrón de error
- `vibrateTap()` - Feedback táctil

#### `hooks/useLocalStorage.ts`
**Propósito**: localStorage reactivo
**Uso**:
```typescript
const [value, setValue, removeValue] = useLocalStorage('key', initialValue)
```

---

### 🌐 Public

#### `public/manifest.json`
**Propósito**: Configuración PWA
```json
{
  "name": "Manifest 369",
  "short_name": "369",
  "display": "standalone",      // ⭐ Oculta barra navegador
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "orientation": "portrait",
  "icons": [...]
}
```

#### `public/icon-192.png` y `public/icon-512.png`
**Propósito**: Iconos de la PWA
**Estado**: ⚠️ Debes crearlos
**Sugerencia**: Violeta (#1a0b2e) + dorado (#ffd700)

---

## 🎨 Estilos

### `app/globals.css`

**Variables CSS**:
```css
--background: Negro profundo
--foreground: Blanco
--primary: Dorado (#ffd700)
--secondary: Violeta profundo
```

**Clases Personalizadas**:
- `.gradient-bg` - Fondo gradiente animado
- `.glass` - Efecto glassmorphism
- `.btn-primary` - Botón dorado con sombra
- `.hide-scrollbar` - Oculta scrollbar

**Animaciones**:
- `gradient-shift` - Movimiento de gradiente

---

## 🔄 Flujo de Datos

```
Usuario en Home
  ↓
Clic "Iniciar Ritual"
  ↓
useRitualStore.setPhase('sintonia')
  ↓
Navegar a /ritual/sintonia
  ↓
Usuario reproduce música
  ↓
useRitualStore.setMusicPlaying(true)
  ↓
Navegar a /ritual/fase-3
  ↓
Usuario escribe deseo
  ↓
useRitualStore.setDeseo(texto)
  ↓
Usuario presiona botón 3 veces
  ↓
useRitualStore.incrementVisualizacion('3') x3
  ↓
Auto-navegar a /ritual/fase-6
  ↓
[Repetir para fase 6 y 9]
  ↓
Navegar a /ritual/cierre
  ↓
Guardar en Supabase + localStorage
  ↓
localStorage.setItem('manifest369_lastCompleted', hoy)
localStorage.setItem('manifest369_currentDay', dia+1)
  ↓
useRitualStore.resetRitual()
  ↓
Navegar a Home (/)
  ↓
Mostrar "Portal Cerrado"
```

---

## 📦 Dependencias Clave

```json
{
  "next": "^14.2.0",              // Framework
  "react": "^18.3.0",             // UI
  "framer-motion": "^11.0.0",     // Animaciones ⭐
  "zustand": "^4.5.0",            // Estado global ⭐
  "tailwindcss": "^3.4.0",        // Estilos ⭐
  "lucide-react": "^0.344.0",     // Iconos
  "@supabase/supabase-js": "^2.39.0"  // Backend (opcional)
}
```

---

## 🎯 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (`LongPressButton.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useVibration.ts`)
- **Páginas**: kebab-case en carpetas (`fase-3/page.tsx`)
- **Funciones**: camelCase (`saveRitual`)
- **Constantes**: UPPER_SNAKE_CASE

### Organización
- Un componente = Un archivo
- Hooks personalizados en carpeta `hooks/`
- Utilidades compartidas en `lib/`
- Estado global en `store/`

### Estilos
- Tailwind para todo
- Clases custom solo en `globals.css`
- `cn()` para merge de clases condicionales

---

## 🚀 Próximos Pasos de Desarrollo

### Fase 1 - Mejoras Básicas ✅
- [x] Estructura completa del ritual
- [x] Animaciones fluidas
- [x] Persistencia con localStorage
- [x] Integración Supabase opcional

### Fase 2 - Características Adicionales
- [ ] Sistema de autenticación
- [ ] Historial de rituales
- [ ] Gráficas de progreso
- [ ] Exportar a PDF

### Fase 3 - Optimizaciones
- [ ] Service Worker para offline
- [ ] Lazy loading de componentes
- [ ] Optimización de animaciones
- [ ] Tests unitarios

### Fase 4 - Funcionalidades Avanzadas
- [ ] Notificaciones push
- [ ] Integración con Spotify real
- [ ] Share en redes sociales
- [ ] Temas personalizables

---

¿Preguntas sobre algún archivo específico? Revisa la **GUIA_COMPLETA.md** 📖

