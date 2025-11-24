import { create } from 'zustand'

interface RitualState {
  // Fase actual del ritual
  currentPhase: 'sintonia' | '3' | '6' | '9' | 'cierre' | null
  
  // Datos del ritual
  deseo: string
  intencion: string
  resultado: string
  
  // Progreso de visualizaciones
  deseoVisualizaciones: number
  intencionVisualizaciones: number
  resultadoVisualizaciones: number
  
  // Estado de la música
  musicPlaying: boolean
  
  // Acciones
  setPhase: (phase: RitualState['currentPhase']) => void
  setDeseo: (text: string) => void
  setIntencion: (text: string) => void
  setResultado: (text: string) => void
  incrementVisualizacion: (phase: '3' | '6' | '9') => void
  setMusicPlaying: (playing: boolean) => void
  resetRitual: () => void
}

export const useRitualStore = create<RitualState>((set) => ({
  currentPhase: null,
  deseo: '',
  intencion: '',
  resultado: '',
  deseoVisualizaciones: 0,
  intencionVisualizaciones: 0,
  resultadoVisualizaciones: 0,
  musicPlaying: false,

  setPhase: (phase) => set({ currentPhase: phase }),
  
  setDeseo: (text) => set({ deseo: text }),
  
  setIntencion: (text) => set({ intencion: text }),
  
  setResultado: (text) => set({ resultado: text }),
  
  incrementVisualizacion: (phase) => set((state) => {
    switch (phase) {
      case '3':
        return { deseoVisualizaciones: state.deseoVisualizaciones + 1 }
      case '6':
        return { intencionVisualizaciones: state.intencionVisualizaciones + 1 }
      case '9':
        return { resultadoVisualizaciones: state.resultadoVisualizaciones + 1 }
      default:
        return state
    }
  }),
  
  setMusicPlaying: (playing) => set({ musicPlaying: playing }),
  
  resetRitual: () => set({
    currentPhase: null,
    deseo: '',
    intencion: '',
    resultado: '',
    deseoVisualizaciones: 0,
    intencionVisualizaciones: 0,
    resultadoVisualizaciones: 0,
    musicPlaying: false,
  }),
}))

