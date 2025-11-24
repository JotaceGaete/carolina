'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRitualStore } from '@/store/useRitualStore'
import { useRouter } from 'next/navigation'
import { LongPressButton } from '@/components/LongPressButton'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function Fase3PageContent() {
  const router = useRouter()
  const { 
    deseo, 
    setDeseo, 
    deseoVisualizaciones, 
    incrementVisualizacion,
    setPhase 
  } = useRitualStore()
  
  const [hasWritten, setHasWritten] = useState(false)
  const [showVisualization, setShowVisualization] = useState(false)
  const [currentDay, setCurrentDay] = useState(1)
  const totalVisualizaciones = 3
  const remainingVisualizaciones = totalVisualizaciones - deseoVisualizaciones

  useEffect(() => {
    setPhase('3')
    
    // Obtener el día actual desde localStorage
    const savedDay = localStorage.getItem('manifest369_currentDay')
    setCurrentDay(savedDay ? parseInt(savedDay) : 1)
  }, [setPhase])

  useEffect(() => {
    if (deseo.trim().length > 0) {
      setHasWritten(true)
    }
  }, [deseo])

  useEffect(() => {
    if (deseoVisualizaciones >= totalVisualizaciones) {
      // Pequeña demora antes de avanzar automáticamente
      setTimeout(() => {
        router.push('/ritual/fase-6')
      }, 1000)
    }
  }, [deseoVisualizaciones, router])

  const handleVisualizationComplete = () => {
    incrementVisualizacion('3')
  }

  const handleContinueToVisualization = () => {
    if (hasWritten && deseo.trim().length > 0) {
      setShowVisualization(true)
    }
  }

  return (
    <div className="h-dvh w-full flex flex-col relative overflow-hidden bg-dark">
      {/* Fondo con partículas doradas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
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
          <p className="text-gold text-sm font-semibold mb-2">Día {currentDay} • Paso 2 de 4 • Fase 3</p>
          <h1 className="text-3xl font-bold text-white mb-2">Tu Deseo</h1>
          <p className="text-gray-400 text-sm">
            Escribe lo que deseas manifestar
          </p>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!showVisualization ? (
            // Vista de escritura
            <motion.div
              key="writing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              {/* Contador de repeticiones */}
              <motion.div
                className="flex justify-center gap-2 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[...Array(totalVisualizaciones)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < deseoVisualizaciones ? 'bg-gold' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </motion.div>

              {/* Instrucciones */}
              <motion.div
                className="glass rounded-2xl p-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-300">
                    <p className="font-semibold text-white mb-1">¿Cómo escribir tu deseo?</p>
                    <ul className="space-y-1 text-gray-400">
                      <li>• Escribe en tiempo presente</li>
                      <li>• Sé específico y claro</li>
                      <li>• Expresa con emoción positiva</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Textarea */}
              <motion.div
                className="flex-1 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="text-gray-400 text-sm mb-2 font-medium">
                  Mi deseo es...
                </label>
                <textarea
                  value={deseo}
                  onChange={(e) => setDeseo(e.target.value)}
                  placeholder="Ejemplo: Estoy viviendo en abundancia y prosperidad. Mi vida está llena de amor y gratitud..."
                  className="flex-1 bg-gray-900/50 border-2 border-gray-700 focus:border-gold rounded-2xl px-5 py-4 text-white placeholder-gray-600 resize-none outline-none transition-all"
                  maxLength={500}
                />
                <p className="text-gray-600 text-xs text-right mt-2">
                  {deseo.length}/500 caracteres
                </p>
              </motion.div>

              {/* Botón continuar */}
              <motion.button
                onClick={handleContinueToVisualization}
                disabled={!hasWritten || deseo.trim().length === 0}
                className={`
                  w-full py-5 rounded-2xl font-semibold text-lg mt-6
                  flex items-center justify-center gap-3
                  transition-all duration-300
                  ${hasWritten && deseo.trim().length > 0
                    ? 'bg-gold text-dark shadow-lg shadow-gold/30 active:scale-95'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Comenzar Visualización
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ) : (
            // Vista de visualización
            <motion.div
              key="visualization"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full flex flex-col items-center justify-center py-8"
            >
              {/* Contador */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <div className="text-center">
                  <span className="text-gold text-6xl font-bold">
                    {remainingVisualizaciones}
                  </span>
                  <p className="text-gray-400 text-sm mt-2">
                    {remainingVisualizaciones === 1 ? 'visualización restante' : 'visualizaciones restantes'}
                  </p>
                </div>
              </motion.div>

              {/* Tu deseo */}
              <motion.div
                className="glass rounded-2xl p-6 mb-8 max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs text-gold font-semibold mb-2 uppercase">Tu Deseo</p>
                <p className="text-white text-center leading-relaxed">
                  {deseo}
                </p>
              </motion.div>

              {/* Botón de long press */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <LongPressButton 
                  onComplete={handleVisualizationComplete}
                  duration={3000}
                  label="Mantén para Visualizar"
                />
              </motion.div>

              {/* Instrucción */}
              <motion.p
                className="text-gray-400 text-sm text-center mt-8 max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Cierra los ojos, respira profundo y visualiza tu deseo cumplido mientras mantienes presionado
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer con indicador de progreso */}
      {showVisualization && (
        <motion.div 
          className="relative z-10 pb-8 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="glass rounded-xl px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Progreso</span>
              <span className="text-gold font-semibold">
                {deseoVisualizaciones}/{totalVisualizaciones}
              </span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: `${(deseoVisualizaciones / totalVisualizaciones) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function Fase3Page() {
  return (
    <ProtectedRoute>
      <Fase3PageContent />
    </ProtectedRoute>
  )
}

