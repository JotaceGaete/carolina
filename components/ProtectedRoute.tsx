'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session }, error } = await supabase.auth.getSession()

      console.log('🔐 [ProtectedRoute] Verificando sesión...')
      console.log('  Session:', session ? 'Existe' : 'No existe')
      console.log('  Error:', error?.message || 'Ninguno')

      if (!session || error) {
        console.log('❌ [ProtectedRoute] No autenticado - Redirigiendo a /login')
        router.push('/login')
      } else {
        console.log('✅ [ProtectedRoute] Autenticado - Permitiendo acceso')
        setIsAuthenticated(true)
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [router])

  if (isChecking) {
    return (
      <div className="h-dvh w-full flex flex-col items-center justify-center bg-dark">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-gold" />
        </motion.div>
        <p className="text-gray-400 mt-4">Verificando autenticación...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

