# 🗄️ Configuración de Supabase - Manifest 369

## ✅ Cambios Realizados

Se ha actualizado la aplicación para guardar los rituales en **Supabase** usando la tabla `journal_entries`.

---

## 📋 Pasos para Configurar Supabase

### 1. Crear la Tabla `journal_entries`

Ve al **SQL Editor** en tu panel de Supabase y ejecuta el siguiente script:

```sql
-- Crear tabla journal_entries
CREATE TABLE journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  day INTEGER NOT NULL,
  deseo TEXT NOT NULL,
  intencion TEXT NOT NULL,
  resultado TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_day ON journal_entries(day);
CREATE INDEX idx_journal_entries_created_at ON journal_entries(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver sus propios rituales
CREATE POLICY "Users can view own journal entries"
  ON journal_entries
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios pueden insertar sus propios rituales
CREATE POLICY "Users can insert own journal entries"
  ON journal_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden actualizar sus propios rituales
CREATE POLICY "Users can update own journal entries"
  ON journal_entries
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios pueden eliminar sus propios rituales
CREATE POLICY "Users can delete own journal entries"
  ON journal_entries
  FOR DELETE
  USING (auth.uid() = user_id);
```

---

### 2. Configurar Variables de Entorno

Crea o actualiza tu archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_aqui
```

**¿Dónde encontrar estos valores?**
1. Ve a tu proyecto en [app.supabase.com](https://app.supabase.com)
2. Ve a **Settings** → **API**
3. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### 3. Reiniciar el Servidor de Desarrollo

```bash
# Detén el servidor (Ctrl+C)
# Inicia de nuevo
npm run dev
```

---

## 🔄 Cambios en el Código

### **lib/supabase.ts** ✅

**Cambios realizados:**
- ✅ Cambió el nombre de la tabla de `rituals` a `journal_entries`
- ✅ Renombró la interface `RitualEntry` a `JournalEntry`
- ✅ Mejoró el manejo de errores con try/catch
- ✅ Agregó mensajes de log más descriptivos
- ✅ Agregó `.select()` al insert para obtener el registro creado
- ✅ Nueva función `getRitualByDay(day)` para buscar por día específico

**Funciones disponibles:**
```typescript
// Guardar un ritual
await saveRitual({
  day: 1,
  deseo: "Mi deseo...",
  intencion: "Mi intención...",
  resultado: "Mi resultado..."
})

// Obtener todos los rituales
const { data } = await getRituals()

// Obtener el último ritual
const { data } = await getLastRitual()

// Obtener ritual de un día específico
const { data } = await getRitualByDay(5)
```

---

### **app/ritual/cierre/page.tsx** ✅

**Cambios realizados:**
- ✅ Guarda en **Supabase** usando `saveRitual()`
- ✅ Guarda en **localStorage** como respaldo
- ✅ Muestra mensajes de estado durante el guardado
- ✅ Manejo robusto de errores
- ✅ Si falla Supabase, continúa con localStorage sin interrumpir el flujo
- ✅ Feedback visual con mensajes de éxito/error

**Flujo de guardado:**
```
Usuario presiona "Sellar en el Universo"
    ↓
Muestra: "Conectando con el universo..."
    ↓
Muestra: "Guardando en Supabase..."
    ↓
├─ Éxito: "✨ Guardado en Supabase exitosamente"
│  └─ También guarda en localStorage como backup
│
└─ Error: "⚠️ Error en Supabase - Guardado en local"
   └─ Guarda solo en localStorage
    ↓
Incrementa el día (currentDay + 1)
    ↓
Marca fecha de última completación
    ↓
Animación de éxito
    ↓
Redirige al Home
```

---

## 📊 Estructura de la Tabla

```
journal_entries
├── id (UUID, PK)              - ID único del registro
├── user_id (UUID, FK)         - ID del usuario (de auth.users)
├── day (INTEGER)              - Día del ritual (1-21)
├── deseo (TEXT)               - Texto del deseo (Fase 3)
├── intencion (TEXT)           - Texto de la intención (Fase 6)
├── resultado (TEXT)           - Texto del resultado (Fase 9)
└── created_at (TIMESTAMP)     - Fecha y hora de creación
```

---

## 🔐 Seguridad (RLS)

Las políticas de Row Level Security garantizan que:

- ✅ Los usuarios **solo pueden ver** sus propios rituales
- ✅ Los usuarios **solo pueden insertar** rituales con su propio user_id
- ✅ Los usuarios **solo pueden actualizar** sus propios rituales
- ✅ Los usuarios **solo pueden eliminar** sus propios rituales

**Importante:** El `user_id` se asigna automáticamente usando `auth.uid()`, por lo que no es necesario pasarlo desde el frontend.

---

## 🧪 Testing

### Probar el Guardado

1. **Completa un ritual**:
   - Ve al Home
   - Presiona "Iniciar Ritual"
   - Completa todas las fases
   - Presiona "Sellar en el Universo"

2. **Verifica en Supabase**:
   - Ve a **Table Editor** → `journal_entries`
   - Deberías ver tu ritual guardado

3. **Verifica en localStorage**:
   ```javascript
   // Abre la consola del navegador (F12)
   localStorage.getItem('manifest369_ritual_day_1')
   ```

### Probar Errores

Para simular un error de Supabase:

1. **Desactiva temporalmente las credenciales**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=invalid_url
   ```

2. **Completa un ritual**:
   - Deberías ver el mensaje: "⚠️ Error en Supabase - Guardado en local"
   - El ritual se guarda en localStorage
   - El flujo continúa sin interrumpirse

3. **Restaura las credenciales** correctas

---

## 📝 Mensajes de Estado

Durante el guardado, verás estos mensajes:

### ✅ Éxito
```
"Conectando con el universo..."
↓
"Guardando en Supabase..."
↓
"✨ Guardado en Supabase exitosamente"
↓
"¡Sellado con Éxito!"
"Tu manifestación ha sido guardada en el universo"
```

### ⚠️ Error
```
"Conectando con el universo..."
↓
"Guardando en Supabase..."
↓
"⚠️ Error en Supabase - Guardado en local"
↓
"¡Sellado con Éxito!"
"Guardado localmente. Intenta sincronizar más tarde."
```

---

## 💾 Backup Automático en localStorage

Cada vez que completas un ritual, se guarda en localStorage con la clave:

```
manifest369_ritual_day_[número]
```

**Ejemplo:**
```javascript
{
  "day": 1,
  "deseo": "Mi deseo...",
  "intencion": "Mi intención...",
  "resultado": "Mi resultado...",
  "date": "Mon Nov 23 2025"
}
```

Esto sirve como respaldo en caso de que falle Supabase.

---

## 🔍 Verificar Logs

Abre la **Consola del Navegador** (F12) para ver los logs:

### Éxito:
```
✅ Guardado exitosamente en Supabase: [{...}]
```

### Error:
```
⚠️ Error en Supabase, continuando con localStorage: {...}
```

---

## 🚀 Funcionalidades Adicionales (Opcional)

### 1. Sincronización Automática

Podrías agregar una función para sincronizar los datos de localStorage a Supabase cuando la conexión se recupere:

```typescript
async function syncLocalToSupabase() {
  for (let day = 1; day <= 21; day++) {
    const localData = localStorage.getItem(`manifest369_ritual_day_${day}`)
    if (localData) {
      const ritual = JSON.parse(localData)
      // Verificar si ya existe en Supabase
      const { data } = await getRitualByDay(day)
      if (!data) {
        // No existe, sincronizar
        await saveRitual(ritual)
      }
    }
  }
}
```

### 2. Exportar Rituales

Agregar una función para exportar todos los rituales del usuario:

```typescript
async function exportRituals() {
  const { data } = await getRituals()
  if (data) {
    const json = JSON.stringify(data, null, 2)
    // Descargar como archivo JSON
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mis-rituales-369.json'
    a.click()
  }
}
```

---

## ❓ FAQ

**¿Qué pasa si no configuro Supabase?**
La app funciona perfectamente con solo localStorage. Supabase es opcional pero recomendado para sincronización entre dispositivos.

**¿Los datos están seguros?**
Sí, gracias a Row Level Security (RLS), cada usuario solo puede acceder a sus propios datos.

**¿Puedo usar autenticación?**
Actualmente la app usa autenticación anónima. Para autenticación completa, necesitarías implementar Supabase Auth.

**¿Qué pasa si un usuario no está autenticado?**
El `user_id` será `NULL` y se guardará en la tabla, pero el usuario no podrá recuperar esos datos si se autentica después. Se recomienda implementar autenticación.

---

## ✅ Checklist de Configuración

- [ ] Crear tabla `journal_entries` en Supabase
- [ ] Configurar políticas RLS
- [ ] Copiar URL y anon key
- [ ] Crear archivo `.env.local`
- [ ] Pegar credenciales en `.env.local`
- [ ] Reiniciar servidor (`npm run dev`)
- [ ] Probar completando un ritual
- [ ] Verificar en Table Editor de Supabase
- [ ] Verificar logs en consola del navegador

---

## 🎉 ¡Listo!

Tu app ahora guarda los rituales en Supabase con manejo robusto de errores y respaldo automático en localStorage.

**¡Feliz manifestación! 🔮✨**

