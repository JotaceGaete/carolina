'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Download, CheckCircle, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRitualStore } from '@/store/useRitualStore'
import { useRouter } from 'next/navigation'
import { saveRitual } from '@/app/actions/ritual'

export default function CierrePage() {
  const router = useRouter()
  const { deseo, intencion, resultado, resetRitual, setPhase } = useRitualStore()
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string>('')
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    setPhase('cierre')
  }, [setPhase])

  const handleSellarUniverso = async () => {
    setIsSaving(true)
    setSaveError(false)
    setSaveMessage('Conectando con el universo...')

    try {
      // Obtener día actual del progreso
      const savedDay = localStorage.getItem('manifest369_currentDay')
      const currentDay = savedDay ? parseInt(savedDay) : 1

      // Guardar en Supabase
      setSaveMessage('Guardando en Supabase...')
      const result = await saveRitual({
        day: currentDay,
        deseo,
        intencion,
        resultado,
      })

      if (result.success) {
        // Éxito: guardar en Supabase funcionó
        setSaveMessage('✨ Guardado en Supabase exitosamente')
        console.log('✅ Datos guardados en Supabase:', result.data)
      } else {
        // Error en Supabase, pero continuamos con localStorage
        setSaveError(true)
        setSaveMessage(`⚠️ ${result.message || 'Error en Supabase'} - Guardado en local`)
        console.warn('⚠️ Error en Supabase, continuando con localStorage:', result.error)
      }

      // Siempre actualizar localStorage como respaldo
      const today = new Date().toDateString()
      localStorage.setItem('manifest369_lastCompleted', today)
      
      // Guardar también los datos del ritual en localStorage como backup
      const ritualData = {
        day: currentDay,
        deseo,
        intencion,
        resultado,
        date: today,
      }
      localStorage.setItem(`manifest369_ritual_day_${currentDay}`, JSON.stringify(ritualData))
      
      // Incrementar día si no ha llegado a 21
      if (currentDay < 21) {
        localStorage.setItem('manifest369_currentDay', (currentDay + 1).toString())
      }

      // Marcar como guardado
      setSaved(true)

      // Esperar animación y resetear
      setTimeout(() => {
        resetRitual()
        router.push('/')
      }, 2500)
    } catch (error) {
      console.error('❌ Error crítico al guardar:', error)
      setSaveError(true)
      setSaveMessage('Error al guardar. Guardado en local como respaldo.')
      
      // Aún así continuar con el proceso local
      const today = new Date().toDateString()
      const savedDay = localStorage.getItem('manifest369_currentDay')
      const currentDay = savedDay ? parseInt(savedDay) : 1
      
      localStorage.setItem('manifest369_lastCompleted', today)
      const ritualData = {
        day: currentDay,
        deseo,
        intencion,
        resultado,
        date: today,
      }
      localStorage.setItem(`manifest369_ritual_day_${currentDay}`, JSON.stringify(ritualData))
      
      if (currentDay < 21) {
        localStorage.setItem('manifest369_currentDay', (currentDay + 1).toString())
      }
      
      setSaved(true)
      setTimeout(() => {
        resetRitual()
        router.push('/')
      }, 2500)
    } finally {
      setIsSaving(false)
    }
  }

  const quotes = [
    "Tu manifestación está en camino hacia ti",
    "El universo ha escuchado tu llamado",
    "Tu energía está alineada con tu deseo",
    "La abundancia fluye hacia ti ahora",
    "Tu realidad está siendo reescrita",
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="h-dvh w-full flex flex-col relative overflow-hidden bg-dark">
      {/* Fondo con explosión de luz */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="w-full h-full bg-gradient-radial from-gold/30 via-violet-deep/20 to-transparent rounded-full" />
        </motion.div>

        {/* Partículas flotantes */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-50, 50],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {!saved ? (
          <>
            {/* Icono principal */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Sparkles className="w-32 h-32 text-gold" />
              </motion.div>
            </motion.div>

            {/* Título */}
            <motion.h1
              className="text-4xl font-bold text-white text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ritual Completo
            </motion.h1>

            {/* Frase inspiradora */}
            <motion.p
              className="text-gold text-lg text-center mb-12 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              "{randomQuote}"
            </motion.p>

            {/* Resumen */}
            <motion.div
              className="glass rounded-3xl p-6 mb-8 w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gold font-semibold mb-1 uppercase">Deseo (3x)</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{deseo}</p>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gold font-semibold mb-1 uppercase">Intención (6x)</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{intencion}</p>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-xs text-gold font-semibold mb-1 uppercase">Resultado (9x)</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{resultado}</p>
                </div>
              </div>
            </motion.div>

            {/* Mensaje de estado */}
            <AnimatePresence>
              {isSaving && saveMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-4 px-6 py-3 rounded-xl ${
                    saveError 
                      ? 'bg-orange-500/20 border border-orange-500/30' 
                      : 'bg-gold/20 border border-gold/30'
                  }`}
                >
                  <p className={`text-sm text-center ${saveError ? 'text-orange-300' : 'text-gold'}`}>
                    {saveMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botón Sellar */}
            <motion.button
              onClick={handleSellarUniverso}
              disabled={isSaving}
              className={`
                px-12 py-5 rounded-full text-lg font-bold text-dark
                bg-gold shadow-2xl shadow-gold/50
                transition-all duration-300
                ${isSaving ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={!isSaving ? { scale: 1.05 } : {}}
            >
              {isSaving ? (
                <span className="flex items-center gap-3">
                  <motion.div
                    className="w-5 h-5 border-3 border-dark border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Guardando...
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  Sellar en el Universo
                </span>
              )}
            </motion.button>
          </>
        ) : (
          // Vista de éxito
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              {saveError ? (
                <CheckCircle className="w-40 h-40 text-orange-400 mx-auto mb-6" />
              ) : (
                <Sparkles className="w-40 h-40 text-gold mx-auto mb-6" />
              )}
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-3">
              ¡Sellado con Éxito!
            </h2>
            <p className="text-gray-400 text-sm px-6">
              {saveError 
                ? 'Guardado localmente. Intenta sincronizar más tarde.' 
                : 'Tu manifestación ha sido guardada en el universo'}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Redirigiendo...
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      {!saved && (
        <motion.div
          className="relative z-10 pb-8 px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-gray-600 text-xs">
            Al sellar, tu manifestación será guardada en el universo
          </p>
        </motion.div>
      )}
    </div>
  )
}

