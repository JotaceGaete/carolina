import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = document.cookie.split(';').map(cookie => {
            const [name, ...value] = cookie.trim().split('=')
            return { name, value: value.join('=') }
          }).filter(c => c.name)
          console.log('🍪 [Cliente] Leyendo cookies:', cookies.length)
          return cookies
        },
        setAll(cookiesToSet) {
          console.log('🍪 [Cliente] Guardando cookies:', cookiesToSet.length)
          cookiesToSet.forEach(({ name, value, options }) => {
            console.log('  →', name, ':', value ? 'Presente' : 'Vacío')
            
            let cookieString = `${name}=${value}`
            
            if (options?.maxAge) {
              cookieString += `; max-age=${options.maxAge}`
            }
            if (options?.path) {
              cookieString += `; path=${options.path}`
            }
            if (options?.domain) {
              cookieString += `; domain=${options.domain}`
            }
            if (options?.sameSite) {
              cookieString += `; samesite=${options.sameSite}`
            }
            if (options?.secure) {
              cookieString += '; secure'
            }
            
            document.cookie = cookieString
            console.log('  ✅ Cookie guardada:', cookieString.substring(0, 50) + '...')
          })
        },
      },
    }
  )
}

