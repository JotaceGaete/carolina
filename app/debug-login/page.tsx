'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function DebugLoginPage() {
  const router = useRouter()
  const [logs, setLogs] = useState<string[]>([])
  const [email, setEmail] = useState('artesellos@outlook.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleLogin = async () => {
    setLoading(true)
    setLogs([])
    
    try {
      addLog('🔵 PASO 1: Creando cliente de Supabase...')
      const supabase = createClient()
      addLog('✅ Cliente creado')

      addLog('🔵 PASO 2: Intentando login...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        addLog(`❌ Error: ${error.message}`)
        setLoading(false)
        return
      }

      addLog('✅ Login exitoso')
      addLog(`👤 Usuario: ${data.user?.email}`)
      addLog(`🔑 Session: ${data.session ? 'SÍ' : 'NO'}`)

      if (data.session) {
        addLog(`📅 Expira: ${new Date(data.session.expires_at! * 1000).toLocaleString()}`)
        addLog(`🎫 Access Token: ${data.session.access_token.substring(0, 20)}...`)
        addLog(`🔄 Refresh Token: ${data.session.refresh_token.substring(0, 20)}...`)
      }

      addLog('🔵 PASO 3: Esperando 2 segundos...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      addLog('🔵 PASO 4: Verificando cookies en document.cookie...')
      const allCookies = document.cookie
      addLog(`🍪 Cookies totales: ${allCookies.split(';').filter(c => c.trim()).length}`)
      
      const sbCookies = allCookies.split(';').filter(c => c.includes('sb-'))
      addLog(`🔐 Cookies de Supabase: ${sbCookies.length}`)
      
      sbCookies.forEach((cookie, i) => {
        const name = cookie.split('=')[0].trim()
        addLog(`  → Cookie ${i + 1}: ${name}`)
      })

      addLog('🔵 PASO 5: Verificando sesión de nuevo...')
      const { data: { session } } = await supabase.auth.getSession()
      addLog(session ? '✅ Sesión confirmada' : '❌ No hay sesión')

      if (session) {
        addLog('🎉 TODO FUNCIONÓ - Redirigiendo...')
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 2000)
      } else {
        addLog('⚠️ Login exitoso pero sesión no persiste')
      }

    } catch (err: any) {
      addLog(`❌ Error inesperado: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gold mb-8">🐛 Debug Login</h1>

        <div className="space-y-6">
          {/* Formulario */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">🔐 Credenciales</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 focus:border-gold rounded-xl text-white outline-none"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Caro1987*"
                  className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 focus:border-gold rounded-xl text-white outline-none"
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading || !email || !password}
                className="w-full py-4 bg-gold text-dark font-bold rounded-xl hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? '🔄 Procesando...' : '🔐 Iniciar Debug Login'}
              </button>
            </div>
          </div>

          {/* Logs */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">📋 Logs en Vivo</h2>
            <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
              {logs.length > 0 ? (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className={`mb-1 ${
                      log.includes('❌') ? 'text-red-400' :
                      log.includes('✅') || log.includes('🎉') ? 'text-green-400' :
                      log.includes('⚠️') ? 'text-yellow-400' :
                      log.includes('🔵') ? 'text-blue-400' :
                      'text-gray-300'
                    }`}
                  >
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center mt-8">
                  Ingresa tus credenciales y presiona "Iniciar Debug Login"
                </div>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gold">⚡ Acciones</h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/test-cookies')}
                className="w-full px-4 py-3 bg-violet-deep hover:bg-violet-dark text-white rounded-lg transition-colors"
              >
                Ver Cookies
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                ← Volver al Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

