# 📦 Instrucciones de Instalación - Manifest 369

## Paso 1: Instalar Dependencias

Ejecuta el siguiente comando en la terminal (asegúrate de estar en la carpeta del proyecto):

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Lucide React (iconos)
- Zustand (estado)
- Supabase (backend)
- Y más...

## Paso 2: Configurar Variables de Entorno

1. Crea un archivo `.env.local` en la raíz del proyecto
2. Agrega las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_publica_aqui
```

> **Nota**: Si aún no tienes una cuenta de Supabase, puedes omitir esto por ahora. La app funcionará con LocalStorage solamente.

## Paso 3: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## Paso 4 (Opcional): Configurar Supabase

Si deseas usar la persistencia en la nube:

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. En el panel de Supabase, ve a **SQL Editor** y ejecuta:

```sql
-- Crear tabla de rituales
create table rituals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users default auth.uid(),
  day integer not null,
  deseo text not null,
  intencion text not null,
  resultado text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar seguridad a nivel de fila
alter table rituals enable row level security;

-- Los usuarios pueden ver sus propios rituales
create policy "Users can view own rituals"
  on rituals for select
  using (auth.uid() = user_id);

-- Los usuarios pueden insertar sus propios rituales
create policy "Users can insert own rituals"
  on rituals for insert
  with check (auth.uid() = user_id);
```

4. Copia la **Project URL** y la **anon/public key** desde **Project Settings > API**
5. Pégalas en tu archivo `.env.local`

## Paso 5: Generar Iconos para PWA

Necesitas crear dos iconos y colocarlos en la carpeta `public/`:

- **icon-192.png** (192x192 píxeles)
- **icon-512.png** (512x512 píxeles)

**Sugerencia de diseño**: 
- Fondo violeta oscuro (#1a0b2e)
- Símbolo dorado (#ffd700)
- Puede ser el número "369" estilizado o un símbolo de manifestación

## 🎉 ¡Listo!

Tu PWA Manifest 369 está lista para usar. Abre http://localhost:3000 en tu navegador.

### Para probar en móvil:

1. Encuentra tu IP local (ejecuta `ipconfig` en Windows o `ifconfig` en Mac/Linux)
2. Abre `http://TU_IP:3000` en tu teléfono
3. Agrega a pantalla de inicio para la experiencia completa de PWA

---

## 🐛 Solución de Problemas

### Error: "Module not found"
```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error: Port 3000 ya está en uso
```bash
# Usa un puerto diferente
npm run dev -- -p 3001
```

### La app no se ve bien en móvil
- Asegúrate de estar usando Chrome o Safari
- La barra de direcciones debe ocultarse cuando se instala como PWA
- En iOS, debes agregar a pantalla de inicio desde Safari

---

¿Necesitas ayuda? Revisa el archivo README.md para más información.

