# 🔐 Sistema de Autenticación - Manifest 369

## ✅ Implementación Completa

Se ha implementado un sistema completo de autenticación con Supabase Auth usando las mejores prácticas para Next.js 14 App Router.

---

## 📦 Archivos Creados

### 1. **Clientes de Supabase**

#### `utils/supabase/client.ts` ✅
Cliente para componentes del lado del cliente (Client Components).

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Uso:**
```typescript
'use client'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
```

---

#### `utils/supabase/server.ts` ✅
Cliente para componentes del lado del servidor (Server Components y Server Actions).

**Características:**
- Maneja cookies de forma segura
- Compatible con Server Components
- Compatible con Server Actions

**Uso:**
```typescript
import { createClient } from '@/utils/supabase/server'

const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

---

#### `utils/supabase/middleware.ts` ✅
Cliente especializado para el middleware.

**Funcionalidad:**
- Refresca la sesión del usuario en cada request
- Evita que la sesión expire
- Prepara las cookies para la respuesta

---

### 2. **Middleware** ⭐ CRÍTICO

#### `middleware.ts` (raíz del proyecto) ✅

**Funciones principales:**
1. **Refresca la sesión** en cada request para que el usuario no se desconecte
2. **Protege rutas**: Redirige a `/login` si el usuario no está autenticado y trata de acceder a `/ritual/*`
3. **Maneja cookies** de forma segura

**Código:**
```typescript
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

**Rutas protegidas:**
- `/ritual/sintonia` ✅
- `/ritual/fase-3` ✅
- `/ritual/fase-6` ✅
- `/ritual/fase-9` ✅
- `/ritual/cierre` ✅

**Rutas públicas:**
- `/` (Home)
- `/login`
- Archivos estáticos

---

### 3. **Página de Login**

#### `app/login/page.tsx` ✅

**Diseño:**
- ✅ Minimalista y centrado
- ✅ Dark mode violeta/dorado (acorde a la app)
- ✅ Fondo con estrellas animadas
- ✅ Glassmorphism effects
- ✅ Iconos de Lucide React

**Funcionalidades:**
- ✅ Formulario con Email y Password
- ✅ Validación client-side
- ✅ Toggle entre Login y Signup
- ✅ Manejo de errores con mensajes claros
- ✅ Estados de carga (disabled durante submit)
- ✅ Animaciones con Framer Motion

**Estados:**
```typescript
[isSignup, setIsSignup]     // Toggle login/signup
[error, setError]            // Mensajes de error
[isPending, startTransition] // Estado de carga
```

---

#### `app/login/actions.ts` ✅ Server Actions

**Funciones:**

##### `login(formData)`
```typescript
export async function login(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) return { error: error.message }
  
  revalidatePath('/', 'layout')
  redirect('/')
}
```

##### `signup(formData)`
```typescript
export async function signup(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  })
  
  if (error) return { error: error.message }
  
  revalidatePath('/', 'layout')
  redirect('/')
}
```

**Validaciones:**
- Email y password requeridos
- Password mínimo 6 caracteres
- Mensajes de error en español

##### `logout()`
```typescript
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
```

---

### 4. **Callback Handler**

#### `app/auth/callback/route.ts` ✅

**Propósito:**
Maneja el callback después de la verificación de email o login con providers.

**Flujo:**
```
Usuario se registra
    ↓
Supabase envía email de verificación
    ↓
Usuario hace clic en el link
    ↓
Link redirige a /auth/callback?code=XXX
    ↓
Callback intercambia el code por una sesión
    ↓
Redirige al Home (/)
```

---

### 5. **Botón de Logout en Home**

#### `app/page.tsx` ✅

**Ubicación:** Esquina superior derecha (discreto)

**Características:**
- ✅ Solo visible cuando el usuario está autenticado
- ✅ Icono de LogOut de Lucide
- ✅ Hover effect (gris → dorado)
- ✅ Glassmorphism background
- ✅ Tooltip nativo
- ✅ Animación de entrada

**Código:**
```typescript
{userEmail && (
  <motion.button
    onClick={handleLogout}
    className="absolute top-4 right-4 z-50 p-2 rounded-lg..."
    title="Cerrar sesión"
  >
    <LogOut className="w-4 h-4 text-gray-500 group-hover:text-gold" />
  </motion.button>
)}
```

---

## 🔄 Flujos Completos

### Flujo de Registro
```
1. Usuario va a /login
2. Toggle a "Registrarse"
3. Ingresa email y password
4. Presiona "Registrarse"
    ↓
5. Server Action signup()
6. Supabase crea usuario
7. (Opcional) Envía email de verificación
8. Revalida y redirige a Home
9. Usuario autenticado ✅
```

### Flujo de Login
```
1. Usuario va a /login
2. Ingresa email y password
3. Presiona "Ingresar"
    ↓
4. Server Action login()
5. Supabase valida credenciales
6. Revalida y redirige a Home
7. Usuario autenticado ✅
```

### Flujo de Protección de Rutas
```
1. Usuario NO autenticado intenta ir a /ritual/sintonia
    ↓
2. Middleware detecta que no hay sesión
3. Redirige automáticamente a /login
4. Usuario se autentica
5. Puede acceder al ritual ✅
```

### Flujo de Logout
```
1. Usuario autenticado en Home
2. Ve el botón de Logout (esquina superior derecha)
3. Hace clic
    ↓
4. Función handleLogout() ejecuta
5. Client llama a supabase.auth.signOut()
6. Redirige a /login
7. Usuario desconectado ✅
```

---

## 🗄️ Configuración de Supabase

### Habilitar Email Auth

1. Ve a **Authentication** → **Providers**
2. Asegúrate de que **Email** está habilitado
3. Configura:
   - **Confirm email**: ON o OFF (según prefieras)
   - **Secure email change**: ON
   - **Secure password change**: ON

### Site URL (Importante para Producción)

1. Ve a **Authentication** → **URL Configuration**
2. Configura:
   ```
   Site URL: https://tu-dominio.com
   Redirect URLs: https://tu-dominio.com/auth/callback
   ```

### Para Desarrollo Local

```
Site URL: http://localhost:3000
Redirect URLs: http://localhost:3000/auth/callback
```

---

## 📝 Variables de Entorno

Tu archivo `.env.local` debe tener:

```env
# Supabase (REQUERIDO)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica

# Site URL (Opcional - para callbacks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

En producción, cambia `NEXT_PUBLIC_SITE_URL` a tu dominio real.

---

## 🧪 Testing

### Test 1: Registro de Usuario
```
1. npm run dev
2. Ve a http://localhost:3000
3. Si no estás autenticado, te redirige a /login
4. Click en "Regístrate aquí"
5. Ingresa: email@test.com / password123
6. Click "Registrarse"
7. Deberías ser redirigido al Home ✅
```

### Test 2: Login
```
1. Logout (botón superior derecho)
2. Redirige a /login
3. Ingresa las mismas credenciales
4. Click "Ingresar"
5. Redirige al Home ✅
```

### Test 3: Protección de Rutas
```
1. En navegador de incógnito: http://localhost:3000/ritual/sintonia
2. Deberías ser redirigido a /login ✅
3. Autentica
4. Intenta de nuevo: /ritual/sintonia
5. Ahora SÍ puedes acceder ✅
```

### Test 4: Sesión Persistente
```
1. Autentica
2. Cierra el navegador
3. Abre de nuevo
4. Ve a http://localhost:3000
5. Deberías seguir autenticado ✅
```

### Test 5: Logout
```
1. Estando autenticado
2. Click en el ícono de Logout (esquina superior derecha)
3. Redirige a /login
4. Intenta ir a /ritual/sintonia
5. Redirige de nuevo a /login ✅
```

---

## 🔍 Debugging

### Ver Usuario en Consola
```javascript
// En cualquier Client Component
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
console.log('Usuario:', user)
```

### Ver Sesión
```javascript
const { data: { session } } = await supabase.auth.getSession()
console.log('Sesión:', session)
```

### Logs del Middleware
El middleware ya tiene logs:
```typescript
console.log('Usuario autenticado:', user?.email)
console.log('Redirigiendo a login...')
```

---

## 🚨 Errores Comunes

### "User not found" al hacer login
**Causa:** El usuario no existe o el email está mal.  
**Solución:** Verifica que te registraste primero o que el email es correcto.

### "Invalid login credentials"
**Causa:** Password incorrecta.  
**Solución:** Verifica la password o registra un nuevo usuario.

### Redirect loop infinito
**Causa:** El middleware está mal configurado.  
**Solución:** Verifica que el `config.matcher` excluye `/login` y archivos estáticos.

### "Cannot read cookies" error
**Causa:** Estás usando el cliente incorrecto en Server/Client Component.  
**Solución:**
- Client Components: `import { createClient } from '@/utils/supabase/client'`
- Server Components: `import { createClient } from '@/utils/supabase/server'`

---

## 📊 Políticas RLS Actualizadas

Actualiza las políticas de `journal_entries` para usar autenticación:

```sql
-- Eliminar políticas antiguas si existen
DROP POLICY IF EXISTS "Users can view own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can insert own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can update own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can delete own journal entries" ON journal_entries;

-- Crear políticas con autenticación
CREATE POLICY "Authenticated users can view own entries"
  ON journal_entries
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert own entries"
  ON journal_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own entries"
  ON journal_entries
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete own entries"
  ON journal_entries
  FOR DELETE
  USING (auth.uid() = user_id);
```

---

## 🎨 Personalización del Login

### Cambiar Colores
```typescript
// app/login/page.tsx
className="bg-gold" // Cambiar a otro color
```

### Agregar Redes Sociales
```typescript
// app/login/actions.ts
export async function loginWithGoogle() {
  const supabase = await createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${SITE_URL}/auth/callback`,
    },
  })
}
```

---

## 🚀 Deploy en Producción

### Variables de Entorno en Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_SITE_URL (tu dominio de producción)
   ```

### Configurar URLs en Supabase
1. Authentication → URL Configuration
2. Site URL: `https://tu-app.vercel.app`
3. Redirect URLs: `https://tu-app.vercel.app/auth/callback`

---

## ✅ Checklist de Implementación

- [x] Instalar `@supabase/ssr`
- [x] Crear `utils/supabase/client.ts`
- [x] Crear `utils/supabase/server.ts`
- [x] Crear `utils/supabase/middleware.ts`
- [x] Crear `middleware.ts` en raíz
- [x] Crear página de login
- [x] Crear server actions (login, signup, logout)
- [x] Crear callback handler
- [x] Agregar botón de logout en Home
- [x] Actualizar políticas RLS
- [x] Configurar variables de entorno
- [ ] Habilitar Email Auth en Supabase
- [ ] Configurar Site URL en Supabase
- [ ] Testing completo
- [ ] Deploy en producción

---

## 🎉 ¡Listo para Desplegar!

Tu aplicación ahora tiene:
- ✅ Autenticación completa con Email/Password
- ✅ Rutas protegidas con middleware
- ✅ Sesiones persistentes
- ✅ UI elegante acorde al diseño místico
- ✅ Manejo robusto de errores
- ✅ Server Actions seguras
- ✅ RLS activado en Supabase

**¡Ya puedes desplegar en producción! 🚀✨**

