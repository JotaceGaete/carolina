'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function TestAuthPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      
      // Obtener usuario
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('👤 Usuario desde cliente:', user)
      console.log('❌ Error usuario:', userError)
      setUser(user)

      // Obtener sesión
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      console.log('🔐 Sesión desde cliente:', session)
      console.log('❌ Error sesión:', sessionError)
      setSession(session)

      setLoading(false)
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gold mb-8">🔍 Test de Autenticación</h1>
        
        <div className="space-y-6">
          {/* Usuario */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">👤 Usuario</h2>
            {user ? (
              <div className="space-y-2">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Creado:</strong> {new Date(user.created_at).toLocaleString()}</p>
              </div>
            ) : (
              <p className="text-red-400">❌ No hay usuario autenticado</p>
            )}
          </div>

          {/* Sesión */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">🔐 Sesión</h2>
            {session ? (
              <div className="space-y-2">
                <p><strong>Access Token:</strong> {session.access_token.substring(0, 20)}...</p>
                <p><strong>Expira:</strong> {new Date(session.expires_at! * 1000).toLocaleString()}</p>
                <p><strong>Token Type:</strong> {session.token_type}</p>
              </div>
            ) : (
              <p className="text-red-400">❌ No hay sesión activa</p>
            )}
          </div>

          {/* Cookies */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">🍪 Cookies</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Abre la consola del navegador (F12) para ver los detalles</p>
              <button
                onClick={() => {
                  console.log('🍪 Todas las cookies:', document.cookie)
                }}
                className="px-4 py-2 bg-gold text-dark rounded-lg"
              >
                Ver Cookies en Consola
              </button>
            </div>
          </div>

          {/* Acciones */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">⚡ Acciones</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-3 bg-violet-deep hover:bg-violet-dark text-white rounded-lg transition-colors"
              >
                ← Volver al Home
              </button>
              
              <button
                onClick={() => router.push('/ritual/sintonia')}
                className="w-full px-4 py-3 bg-gold hover:bg-yellow-500 text-dark rounded-lg font-semibold transition-colors"
              >
                🎵 Ir a Ritual (Protegido)
              </button>

              <button
                onClick={async () => {
                  const supabase = createClient()
                  await supabase.auth.signOut()
                  router.push('/login')
                }}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

