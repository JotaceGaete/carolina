'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TestCookiesPage() {
  const router = useRouter()
  const [cookies, setCookies] = useState<string>('')
  const [parsedCookies, setParsedCookies] = useState<any[]>([])

  useEffect(() => {
    // Obtener todas las cookies
    const allCookies = document.cookie
    setCookies(allCookies)

    // Parsear cookies
    const cookieArray = allCookies.split(';').map(cookie => {
      const [name, ...valueParts] = cookie.trim().split('=')
      return {
        name: name.trim(),
        value: valueParts.join('='),
        isSupabase: name.includes('sb-')
      }
    }).filter(c => c.name)

    setParsedCookies(cookieArray)

    console.log('🍪 Todas las cookies:', allCookies)
    console.log('📦 Cookies parseadas:', cookieArray)
  }, [])

  return (
    <div className="min-h-screen bg-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gold mb-8">🍪 Test de Cookies</h1>

        <div className="space-y-6">
          {/* Cookies Raw */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">📄 Cookies Raw</h2>
            <pre className="text-xs bg-gray-900 p-4 rounded overflow-x-auto">
              {cookies || 'No hay cookies'}
            </pre>
          </div>

          {/* Cookies Parseadas */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">📊 Cookies Parseadas</h2>
            {parsedCookies.length > 0 ? (
              <div className="space-y-2">
                {parsedCookies.map((cookie, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded ${
                      cookie.isSupabase
                        ? 'bg-green-900/30 border border-green-500/30'
                        : 'bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm">
                          <span className={cookie.isSupabase ? 'text-green-400' : 'text-gray-400'}>
                            {cookie.name}
                          </span>
                        </p>
                        <p className="font-mono text-xs text-gray-500 truncate mt-1">
                          {cookie.value}
                        </p>
                      </div>
                      {cookie.isSupabase && (
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                          Supabase ✅
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No se encontraron cookies</p>
            )}
          </div>

          {/* Estadísticas */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">📈 Estadísticas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 p-4 rounded">
                <p className="text-gray-400 text-sm">Total de Cookies</p>
                <p className="text-3xl font-bold text-white">{parsedCookies.length}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded">
                <p className="text-gray-400 text-sm">Cookies de Supabase</p>
                <p className="text-3xl font-bold text-green-400">
                  {parsedCookies.filter(c => c.isSupabase).length}
                </p>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">⚡ Acciones</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  console.log('🍪 document.cookie:', document.cookie)
                  alert('Ver consola del navegador (F12)')
                }}
                className="w-full px-4 py-3 bg-gold hover:bg-yellow-500 text-dark rounded-lg font-semibold"
              >
                Ver en Consola
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-3 bg-violet-deep hover:bg-violet-dark text-white rounded-lg"
              >
                ← Volver al Home
              </button>

              <button
                onClick={() => router.push('/test-auth')}
                className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Ir a Test Auth
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

