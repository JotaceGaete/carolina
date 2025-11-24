'use client'

import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, LogIn, UserPlus, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState<string>('')
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      setError('Email y contraseña son requeridos')
      setIsPending(false)
      return
    }

    if (isSignup && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setIsPending(false)
      return
    }

    const supabase = createClient()

    try {
      if (isSignup) {
        console.log('📝 Intentando signup...')
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          console.error('❌ Error en signup:', error)
          setError(error.message)
          setIsPending(false)
          return
        }

        console.log('✅ Signup exitoso:', data.user?.email)
        console.log('🔑 Session:', data.session ? 'Creada' : 'No creada')
        
        // Redirigir al home
        router.push('/')
        router.refresh()
      } else {
        console.log('🔐 Intentando login...')
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          console.error('❌ Error en login:', error)
          setError(error.message)
          setIsPending(false)
          return
        }

        console.log('✅ Login exitoso:', data.user?.email)
        console.log('🔑 Session:', data.session ? 'Creada' : 'No creada')
        
        // Redirigir al home
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      console.error('❌ Error inesperado:', err)
      setError('Error inesperado. Por favor intenta de nuevo.')
      setIsPending(false)
    }
  }

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-dark">
      {/* Fondo con estrellas animadas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-gold" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gold mb-2">
            Diario Ritual 3-6-9
          </h1>
          <p className="text-gray-400 text-sm">
            {isSignup ? 'Crea tu cuenta para comenzar' : 'Ingresa para continuar tu ritual'}
          </p>
        </div>

        {/* Formulario */}
        <motion.div
          className="glass rounded-3xl p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isPending}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border-2 border-gray-700 focus:border-gold rounded-xl text-white placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  disabled={isPending}
                  minLength={6}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border-2 border-gray-700 focus:border-gold rounded-xl text-white placeholder-gray-600 outline-none transition-all disabled:opacity-50"
                  placeholder={isSignup ? 'Mínimo 6 caracteres' : '••••••••'}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-gold text-dark font-bold rounded-xl shadow-lg shadow-gold/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isPending ? (
                <motion.div
                  className="w-5 h-5 border-3 border-dark border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : isSignup ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  Registrarse
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Ingresar
                </>
              )}
            </button>
          </form>

          {/* Toggle entre Login/Signup */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup)
                setError('')
              }}
              disabled={isPending}
              className="text-gray-400 hover:text-gold transition-colors text-sm disabled:opacity-50"
            >
              {isSignup ? (
                <>
                  ¿Ya tienes cuenta? <span className="text-gold font-semibold">Ingresa aquí</span>
                </>
              ) : (
                <>
                  ¿No tienes cuenta? <span className="text-gold font-semibold">Regístrate aquí</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-gray-600 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Nada está afuera de tu alcance
        </motion.p>
      </motion.div>
    </div>
  )
}

