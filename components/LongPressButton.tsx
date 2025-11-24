'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

interface LongPressButtonProps {
  onComplete: () => void
  duration?: number // en milisegundos
  label?: string
}

export function LongPressButton({ 
  onComplete, 
  duration = 3000,
  label = "Mantén presionado"
}: LongPressButtonProps) {
  const [isPressing, setIsPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  // Vibración (si está disponible)
  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }

  const handleStart = () => {
    setIsPressing(true)
    startTimeRef.current = Date.now()
    vibrate(50) // Vibración corta al iniciar

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        handleComplete()
      }
    }, 16) // ~60fps
  }

  const handleEnd = () => {
    setIsPressing(false)
    setProgress(0)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const handleComplete = () => {
    handleEnd()
    setShowSuccess(true)
    vibrate([100, 50, 100]) // Patrón de vibración de éxito
    
    setTimeout(() => {
      onComplete()
      setShowSuccess(false)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      {/* Botón principal */}
      <motion.button
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className="relative w-48 h-48 rounded-full bg-gradient-to-br from-violet-deep to-violet-dark border-4 border-gold shadow-2xl shadow-gold/30 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          touchAction: 'none', // Prevenir scroll en móvil
        }}
      >
        {/* Progreso circular */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="rgba(255, 215, 0, 0.2)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#gold-gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            style={{
              transition: 'stroke-dashoffset 0.016s linear',
            }}
          />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ffed4e" />
            </linearGradient>
          </defs>
        </svg>

        {/* Contenido del botón */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={isPressing ? {
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            } : {}}
            transition={{
              duration: 1,
              repeat: isPressing ? Infinity : 0,
              ease: "linear",
            }}
          >
            <Sparkles className="w-16 h-16 text-gold mb-2" />
          </motion.div>
          
          <span className="text-white font-semibold text-sm text-center px-4">
            {isPressing ? 'Visualizando...' : label}
          </span>
          
          {isPressing && (
            <motion.span 
              className="text-gold text-2xl font-bold mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.floor(progress)}%
            </motion.span>
          )}
        </div>

        {/* Partículas al presionar */}
        {isPressing && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gold rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 8) * 100,
                  y: Math.sin((i * Math.PI * 2) / 8) * 100,
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.button>

      {/* Efecto de éxito */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="w-48 h-48 rounded-full bg-gold/20 border-4 border-gold flex items-center justify-center">
              <Sparkles className="w-20 h-20 text-gold" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ondas al presionar */}
      {isPressing && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold"
              initial={{ width: 0, height: 0, opacity: 0.5 }}
              animate={{
                width: 400,
                height: 400,
                opacity: 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

