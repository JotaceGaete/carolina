import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  console.log('🔄 Middleware ejecutándose para:', request.nextUrl.pathname)
  
  // Crear response que se puede modificar
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = request.cookies.getAll()
          console.log('📦 Total cookies:', cookies.length)
          // Log de cookies de Supabase específicamente
          const sbCookies = cookies.filter(c => c.name.includes('sb-'))
          console.log('🔐 Cookies de Supabase:', sbCookies.length)
          return cookies
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Intentar obtener el usuario
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) {
    console.error('❌ Error obteniendo usuario:', error.message)
  }

  // Debug: Log para rutas protegidas
  if (request.nextUrl.pathname.startsWith('/ritual')) {
    console.log('🔐 Middleware - Ruta protegida:', request.nextUrl.pathname)
    console.log('👤 Usuario:', user ? user.email : 'No autenticado')
    
    if (!user) {
      // Intentar con getSession como fallback
      const { data: { session } } = await supabase.auth.getSession()
      console.log('🔍 Intentando con getSession:', session ? 'Sesión encontrada' : 'No hay sesión')
      
      if (session) {
        console.log('✅ Sesión encontrada, permitiendo acceso')
        return response
      }
    }
  }

  // Si el usuario NO está autenticado y trata de acceder al ritual, redirigir a login
  if (!user && request.nextUrl.pathname.startsWith('/ritual')) {
    console.log('❌ Redirigiendo a /login - No hay sesión')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && request.nextUrl.pathname.startsWith('/ritual')) {
    console.log('✅ Acceso permitido al ritual')
  }

  return response
}

