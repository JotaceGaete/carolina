# Manifest 369 - PWA de Manifestación

Una Progressive Web App (PWA) para el ritual diario de manifestación basado en el método 3-6-9.

## 🌟 Características

- **PWA completa**: Instalable en móvil y desktop
- **Diseño híbrido**: Full screen en móvil, contenedor centrado en desktop
- **Dark Mode nativo**: Paleta violeta profunda con acentos dorados
- **Animaciones fluidas**: Powered by Framer Motion
- **Ritual guiado**: Experiencia step-by-step sin distracciones
- **Persistencia**: LocalStorage + Supabase

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Estilos**: Tailwind CSS
- **Componentes**: Shadcn/UI (adaptados a móvil)
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Backend**: Supabase (Auth + Database)
- **Estado**: Zustand

## 📦 Instalación

1. Clona el repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Copia `.env.local.example` a `.env.local` y configura tus variables:

```bash
cp .env.local.example .env.local
```

4. Configura Supabase:
   - Crea una cuenta en [Supabase](https://supabase.com)
   - Crea un nuevo proyecto
   - Copia la URL y la clave pública a `.env.local`
   - Ejecuta el siguiente SQL en el editor de Supabase:

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

-- Habilitar Row Level Security
alter table rituals enable row level security;

-- Política: Los usuarios solo pueden ver sus propios rituales
create policy "Users can view own rituals"
  on rituals for select
  using (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar sus propios rituales
create policy "Users can insert own rituals"
  on rituals for insert
  with check (auth.uid() = user_id);
```

5. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 📱 Instalación como PWA

### En Android:
1. Abre la app en Chrome
2. Toca el menú (⋮)
3. Selecciona "Agregar a pantalla de inicio"

### En iOS:
1. Abre la app en Safari
2. Toca el botón de compartir
3. Selecciona "Agregar a pantalla de inicio"

### En Desktop:
1. Abre la app en Chrome/Edge
2. Haz clic en el icono de instalación en la barra de direcciones
3. Confirma la instalación

## 🎨 Iconos PWA

Los iconos de la PWA deben colocarse en la carpeta `public/`:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

Recomendación: Usa un diseño dorado sobre fondo violeta oscuro para mantener la estética de la app.

## 🔮 Método 3-6-9

El método de manifestación 3-6-9 se basa en escribir y visualizar:
- **3 veces** tu deseo por la mañana
- **6 veces** tu intención durante el día
- **9 veces** tu resultado por la noche

Esta app guía el proceso completo con un ritual de ~3 minutos.

## 📄 Licencia

MIT

---

Creado con ✨ y el poder de la manifestación

