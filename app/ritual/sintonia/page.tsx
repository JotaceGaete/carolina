'use client'

import { motion } from 'framer-motion'
import { Music, Play, Pause, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRitualStore } from '@/store/useRitualStore'
import { useRouter } from 'next/navigation'
import { ritualDays } from '@/lib/manifestationData'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function SintoniaPageContent() {
  const router = useRouter()
  const { musicPlaying, setMusicPlaying, setPhase } = useRitualStore()
  const [canContinue, setCanContinue] = useState(false)
  const [currentDay, setCurrentDay] = useState(1)
  const [currentDayData, setCurrentDayData] = useState(ritualDays[0])

  useEffect(() => {
    setPhase('sintonia')
    
    // Obtener el día actual desde localStorage
    const savedDay = localStorage.getItem('manifest369_currentDay')
    const day = savedDay ? parseInt(savedDay) : 1
    setCurrentDay(day)
    
    // Obtener datos del día
    const dayData = ritualDays.find(d => d.day === day) || ritualDays[0]
    setCurrentDayData(dayData)
  }, [setPhase])

  const handlePlayMusic = () => {
    setMusicPlaying(!musicPlaying)
    
    // Habilitar el botón continuar después de reproducir
    if (!musicPlaying) {
      setCanContinue(true)
    }
  }

  const handleContinue = () => {
    if (canContinue) {
      router.push('/ritual/fase-3')
    }
  }

  return (
    <div className="h-dvh w-full flex flex-col relative overflow-hidden bg-dark">
      {/* Fondo con ondas de sonido */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="relative z-10 pt-12 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <p className="text-gold text-sm font-semibold mb-2">Día {currentDay} • Paso 1 de 4</p>
          <h1 className="text-3xl font-bold text-white mb-2">Sintonización</h1>
          <p className="text-gray-400 text-sm">
            Conecta con tu energía interior
          </p>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 relative z-10">
        {/* Reproductor de música simulado */}
        <motion.div
          className="glass rounded-3xl p-8 w-full max-w-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Icono de música animado */}
          <motion.div
            className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-deep to-violet-dark flex items-center justify-center"
            animate={musicPlaying ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 1,
              repeat: musicPlaying ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <Music className="w-16 h-16 text-gold" />
          </motion.div>

          {/* Información de la canción */}
          <div className="text-center mb-6">
            <h3 className="text-white font-semibold text-lg mb-1">
              {currentDayData.song.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {currentDayData.song.artist}
            </p>
          </div>

          {/* Barra de progreso simulada */}
          <div className="mb-6">
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: '0%' }}
                animate={musicPlaying ? { width: '100%' } : { width: '0%' }}
                transition={{
                  duration: 30,
                  ease: "linear",
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0:00</span>
              <span>3:00</span>
            </div>
          </div>

          {/* Botón de reproducción */}
          <motion.button
            onClick={handlePlayMusic}
            className="w-20 h-20 mx-auto rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {musicPlaying ? (
              <Pause className="w-8 h-8 text-dark" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 text-dark ml-1" fill="currentColor" />
            )}
          </motion.button>
        </motion.div>

        {/* Letra de la canción */}
        {currentDayData.song.lyricsSnippet && (
          <motion.div
            className="glass rounded-2xl p-5 mt-8 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gold text-xs font-semibold mb-2 uppercase text-center">
              Fragmento de la letra
            </p>
            <p className="text-gray-300 text-sm text-center italic leading-relaxed">
              "{currentDayData.song.lyricsSnippet}"
            </p>
          </motion.div>
        )}

        {/* Instrucción */}
        <motion.p
          className="text-gray-400 text-xs text-center mt-6 max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Reproduce la música para conectar con la energía del día
        </motion.p>
      </div>

      {/* Botón Continuar */}
      <motion.div
        className="relative z-10 pb-8 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className={`
            w-full py-5 rounded-2xl font-semibold text-lg
            flex items-center justify-center gap-3
            transition-all duration-300
            ${canContinue
              ? 'bg-gold text-dark shadow-lg shadow-gold/30 active:scale-95'
              : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Continuar
          <ArrowRight className="w-5 h-5" />
        </button>
        
        {!canContinue && (
          <p className="text-gray-600 text-xs text-center mt-3">
            Dale Play a la música para continuar
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default function SintoniaPage() {
  return (
    <ProtectedRoute>
      <SintoniaPageContent />
    </ProtectedRoute>
  )
}

