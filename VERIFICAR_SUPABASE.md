# 🔍 Verificación de Configuración Supabase

## Error: "Invalid login credentials"

Este error ocurre cuando intentas hacer LOGIN con un usuario que NO existe.

---

## ✅ Solución Rápida

### Opción 1: Registrarse Primero

1. En la pantalla de login, click en **"Regístrate aquí"**
2. Ingresa tu email y contraseña
3. Click en **"Registrarse"**
4. ✅ Ahora SÍ podrás hacer login con esas credenciales

---

## 🔧 Verificar Configuración de Supabase

### 1. Variables de Entorno

Verifica que tu archivo `.env.local` tenga:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_key
```

### 2. Habilitar Email Auth

Ve a tu proyecto en [Supabase](https://app.supabase.com):

**Authentication → Providers**
- ✅ **Email** debe estar HABILITADO
- Confirm email: **OFF** (para desarrollo rápido)

### 3. Configurar Site URL

**Authentication → URL Configuration**
```
Site URL: http://localhost:3002
Redirect URLs: http://localhost:3002/auth/callback
```

---

## 🧪 Prueba Paso a Paso

### Paso 1: Crear Usuario en Supabase

**Opción A: Desde la App**
1. Ve a http://localhost:3002
2. Serás redirigido a `/login`
3. Click "Regístrate aquí"
4. Email: `test@example.com`
5. Password: `password123`
6. Click "Registrarse"

**Opción B: Desde Supabase Dashboard**
1. Ve a **Authentication → Users**
2. Click "Add user"
3. Email: `test@example.com`
4. Password: `password123`
5. Click "Create user"

### Paso 2: Hacer Login

Ahora SÍ puedes hacer login:
1. Email: `test@example.com`
2. Password: `password123`
3. Click "Ingresar"
4. ✅ Deberías ser redirigido al Home

---

## 🔍 Verificar en Supabase Dashboard

### Ver Usuarios Registrados

1. Ve a tu proyecto en Supabase
2. **Authentication → Users**
3. Deberías ver la lista de usuarios registrados

Si no ves ningún usuario, significa que el signup no funcionó.

---

## 🚨 Problemas Comunes

### "Invalid login credentials"
**Causa**: Usuario no existe  
**Solución**: Regístrate primero

### "User already registered"
**Causa**: El email ya está en uso  
**Solución**: Usa otro email o haz login

### No redirige después de registrarse
**Causa**: Error en Supabase Auth  
**Solución**: Verifica las variables de entorno y que Email Auth está habilitado

### "Failed to fetch"
**Causa**: Variables de entorno incorrectas o Supabase no accesible  
**Solución**: Verifica `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📝 Checklist de Verificación

- [ ] Variables de entorno correctas en `.env.local`
- [ ] Email Auth habilitado en Supabase
- [ ] Site URL configurado en Supabase
- [ ] Puerto correcto (3002 en tu caso)
- [ ] Primero REGISTRARSE, luego LOGIN

---

## 🎯 Resumen

**El error que tienes es normal**: estás intentando hacer login con un usuario que no existe.

**Solución**: 
1. Click en "Regístrate aquí"
2. Crea tu cuenta
3. Luego podrás hacer login

---

## 🔐 Credenciales de Prueba

Después de registrarte, usa:
```
Email: test@example.com
Password: password123
```

---

¡Eso debería resolver el problema! 🔮✨

