'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  // Validar datos
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('❌ Error en login:', error.message)
    return { error: error.message }
  }

  console.log('✅ Login exitoso:', data.user?.email)
  console.log('🔑 Session creada:', data.session ? 'Sí' : 'No')
  
  if (data.session) {
    // Guardar la sesión manualmente en cookies como respaldo
    const cookieStore = await cookies()
    const expires = new Date(data.session.expires_at! * 1000)
    
    console.log('🍪 Guardando sesión en cookies...')
    console.log('📅 Expira:', expires.toISOString())
    
    // Guardar access token
    cookieStore.set('sb-access-token', data.session.access_token, {
      expires,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    
    // Guardar refresh token
    cookieStore.set('sb-refresh-token', data.session.refresh_token, {
      expires,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    
    console.log('✅ Cookies guardadas manualmente')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  // Validar datos
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener al menos 6 caracteres' }
  }

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error) {
    console.error('❌ Error en signup:', error.message)
    return { error: error.message }
  }

  console.log('✅ Signup exitoso:', data.user?.email)

  if (data.session) {
    // Guardar la sesión manualmente en cookies
    const cookieStore = await cookies()
    const expires = new Date(data.session.expires_at! * 1000)
    
    console.log('🍪 Guardando sesión en cookies después de signup...')
    
    cookieStore.set('sb-access-token', data.session.access_token, {
      expires,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    
    cookieStore.set('sb-refresh-token', data.session.refresh_token, {
      expires,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    
    console.log('✅ Cookies guardadas manualmente después de signup')
  }

  // Redirigir con mensaje de éxito
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

