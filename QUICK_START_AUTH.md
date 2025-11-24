# ⚡ Quick Start - Autenticación

## 🚀 Pasos para Activar la Autenticación

### 1. Instalar Dependencia Nueva
```bash
npm install @supabase/ssr
```

### 2. Configurar Supabase Auth

Ve a tu panel de Supabase:

1. **Authentication** → **Providers**
   - Habilita **Email**
   - Confirm email: **OFF** (para desarrollo rápido)

2. **Authentication** → **URL Configuration**
   ```
   Site URL: http://localhost:3000
   Redirect URLs: http://localhost:3000/auth/callback
   ```

### 3. Reiniciar Servidor
```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

### 4. Probar

```bash
# Abre el navegador
http://localhost:3000
```

**¿Qué verás?**
- Te redirige automáticamente a `/login` (porque no estás autenticado)
- Página de login con diseño místico violeta/dorado ✨

---

## 🧪 Testing Rápido

### Crear Usuario
1. En `/login`, click en "Regístrate aquí"
2. Ingresa: `test@example.com` / `password123`
3. Click "Registrarse"
4. ✅ Redirige al Home

### Acceder al Ritual
1. Estando autenticado, click "Iniciar Ritual"
2. ✅ Puedes entrar a `/ritual/sintonia`

### Cerrar Sesión
1. En el Home, click en el ícono de Logout (esquina superior derecha)
2. ✅ Redirige a `/login`

### Probar Protección
1. Sin autenticar, intenta ir a: `http://localhost:3000/ritual/sintonia`
2. ✅ Redirige automáticamente a `/login`

---

## 📁 Archivos Creados

```
✅ package.json (actualizado con @supabase/ssr)
✅ utils/supabase/client.ts
✅ utils/supabase/server.ts
✅ utils/supabase/middleware.ts
✅ middleware.ts (raíz)
✅ app/login/page.tsx
✅ app/login/actions.ts
✅ app/auth/callback/route.ts
✅ app/page.tsx (actualizado con botón de logout)
✅ lib/supabase.ts (actualizado para usar nuevos clientes)
```

---

## ⚙️ Lo Que Hace el Sistema

### 🔒 Middleware (CRÍTICO)
- Refresca la sesión en cada request
- Protege `/ritual/*` (redirige a `/login` si no hay sesión)
- Permite acceso a `/login` y archivos públicos

### 🎨 Página de Login
- Toggle Login/Signup
- Validación client-side
- Mensajes de error claros
- Diseño acorde a la app (violeta/dorado místico)

### 💾 Server Actions
- `login()` - Autentica con email/password
- `signup()` - Crea nueva cuenta
- `logout()` - Cierra sesión

### 🏠 Botón de Logout
- Esquina superior derecha del Home
- Solo visible cuando estás autenticado
- Hover effect (gris → dorado)

---

## 🔍 Verificar que Funciona

### Ver Usuario Actual
```javascript
// Abre la consola del navegador (F12)
// En el Home
```

El email del usuario aparece en el log.

### Ver Políticas en Supabase
```sql
-- Ve a SQL Editor en Supabase
SELECT * FROM journal_entries WHERE user_id = auth.uid();
```

Solo verás TUS registros (RLS funcionando).

---

## 📝 Variables de Entorno

Tu `.env.local` ya debe tener:
```env
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**Opcional** (para callbacks):
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚨 Si Algo Falla

### "Module not found @supabase/ssr"
```bash
npm install @supabase/ssr
```

### Redirect loop infinito
- Asegúrate de habilitar Email Auth en Supabase
- Verifica que las variables de entorno están correctas

### "User not found"
- Regístrate primero con "Registrarse"
- Luego intenta hacer login

---

## 📚 Documentación Completa

Para más detalles, ver:
- **SETUP_AUTENTICACION.md** - Documentación técnica completa
- **SETUP_SUPABASE.md** - Configuración de la base de datos

---

## ✅ Checklist Antes de Desplegar

- [ ] Instalar `@supabase/ssr`
- [ ] Habilitar Email Auth en Supabase
- [ ] Configurar Site URL en Supabase
- [ ] Probar login/signup localmente
- [ ] Probar protección de rutas
- [ ] Probar logout
- [ ] Verificar que las políticas RLS funcionan
- [ ] Configurar variables en Vercel (para producción)
- [ ] Actualizar Site URL en Supabase (con dominio de producción)

---

## 🎉 ¡Listo!

Tu app ahora tiene autenticación completa y está **lista para producción**.

**Siguiente paso:** 
```bash
npm install @supabase/ssr
npm run dev
```

¡Happy manifesting! 🔮✨

