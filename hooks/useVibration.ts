import { useCallback } from 'react'

/**
 * Hook para manejar la vibración del dispositivo
 * @returns Función para vibrar con patrón personalizado
 */
export function useVibration() {
  const vibrate = useCallback((pattern: number | number[]) => {
    // Verificar si la API de vibración está disponible
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern)
      } catch (error) {
        console.warn('Error al vibrar:', error)
      }
    }
  }, [])

  const vibrateSuccess = useCallback(() => {
    vibrate([100, 50, 100]) // Patrón de éxito: vibra-pausa-vibra
  }, [vibrate])

  const vibrateError = useCallback(() => {
    vibrate([200, 100, 200, 100, 200]) // Patrón de error: más largo
  }, [vibrate])

  const vibrateTap = useCallback(() => {
    vibrate(50) // Vibración corta para feedback táctil
  }, [vibrate])

  return {
    vibrate,
    vibrateSuccess,
    vibrateError,
    vibrateTap,
  }
}

