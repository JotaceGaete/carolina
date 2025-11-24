'use client'

import { motion } from 'framer-motion'
import { Sparkles, Lock, Music, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ritualDays, appConfig } from '@/lib/manifestationData'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [currentDay, setCurrentDay] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const totalDays = appConfig.totalDays
  
  // Obtener datos del día actual
  const currentDayData = ritualDays.find(d => d.day === currentDay) || ritualDays[0]

  useEffect(() => {
    // Cargar progreso desde localStorage
    const savedDay = localStorage.getItem('manifest369_currentDay')
    const savedDate = localStorage.getItem('manifest369_lastCompleted')
    
    if (savedDay) setCurrentDay(parseInt(savedDay))
    if (savedDate) {
      setLastCompletedDate(savedDate)
      // Verificar si ya se completó hoy
      const today = new Date().toDateString()
      if (savedDate === today) {
        setIsCompleted(true)
      }
    }

    // Obtener usuario actual
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUserEmail(user.email)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const progressPercentage = (currentDay / totalDays) * 100

  const handleStartRitual = () => {
    if (!isCompleted) {
      // Navegar a la página de sintonización (música)
      router.push('/ritual/sintonia')
    }
  }

  return (
    <div className="h-dvh w-full flex flex-col relative overflow-hidden">
      {/* Botón de Logout (discreto, arriba a la derecha) */}
      {userEmail && (
        <motion.button
          onClick={handleLogout}
          className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700/50 transition-all group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          title="Cerrar sesión"
        >
          <LogOut className="w-4 h-4 text-gray-500 group-hover:text-gold transition-colors" />
        </motion.button>
      )}

      {/* Fondo animado con estrellas */}
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

      {/* Header */}
      <motion.div 
        className="relative z-10 pt-12 pb-8 px-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Sparkles className="w-12 h-12 text-gold" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gold mb-2">
          {appConfig.title}
        </h1>
        <p className="text-gray-400 text-sm">
          {appConfig.welcomeMessage}
        </p>
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative z-10">
        {/* Progreso circular */}
        <motion.div 
          className="relative mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <svg className="w-48 h-48 transform -rotate-90">
            {/* Círculo de fondo */}
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="rgba(255, 215, 0, 0.1)"
              strokeWidth="12"
              fill="none"
            />
            {/* Círculo de progreso */}
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 88}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 88 * (1 - progressPercentage / 100)
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#ffed4e" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Texto central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gold">{currentDay}</span>
            <span className="text-gray-400 text-sm">de {totalDays} días</span>
          </div>
        </motion.div>

        {/* Estado del ritual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          {isCompleted ? (
            <div className="glass rounded-2xl px-6 py-4 inline-flex items-center gap-3">
              <Lock className="w-5 h-5 text-gold" />
              <div className="text-left">
                <p className="text-gold font-semibold">Portal Cerrado</p>
                <p className="text-gray-400 text-xs">Regresa mañana para continuar</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-2">Tu ritual de hoy te espera</p>
              <p className="text-xs text-gray-500">3 minutos de manifestación consciente</p>
            </div>
          )}
        </motion.div>

        {/* Botón principal */}
        <motion.button
          onClick={handleStartRitual}
          disabled={isCompleted}
          className={`
            relative px-12 py-5 rounded-full text-lg font-bold text-dark
            transition-all duration-300 overflow-hidden
            ${isCompleted 
              ? 'bg-gray-700 cursor-not-allowed opacity-50' 
              : 'btn-primary active:scale-95'
            }
          `}
          whileHover={!isCompleted ? { scale: 1.05 } : {}}
          whileTap={!isCompleted ? { scale: 0.95 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {isCompleted ? 'Completado Hoy' : 'Iniciar Ritual'}
        </motion.button>

        {/* Canción del día */}
        {!isCompleted && currentDayData && (
          <motion.div
            className="glass rounded-2xl px-6 py-4 mt-8 max-w-xs mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-gold flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-gold font-semibold uppercase">Canción de Hoy</p>
                <p className="text-white text-sm font-medium">{currentDayData.song.title}</p>
                <p className="text-gray-400 text-xs">{currentDayData.song.artist}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Frase inspiradora */}
        <motion.p
          className="text-gray-500 text-xs text-center mt-6 max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {currentDayData?.quote || "Lo que piensas, lo creas. Lo que sientes, lo atraes. Lo que imaginas, lo vives."}
        </motion.p>
      </div>

      {/* Footer con autor */}
      <motion.div 
        className="relative z-10 pb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <p className="text-gray-600 text-xs">{appConfig.author}</p>
        <p className="text-gray-700 text-xs mt-1">v1.0.0</p>
      </motion.div>
    </div>
  )
}

