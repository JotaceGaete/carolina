'use server'

import { createClient } from '@/utils/supabase/server'

export interface JournalEntry {
  id?: string
  user_id?: string
  day: number
  deseo: string
  intencion: string
  resultado: string
  created_at?: string
}

// Función para guardar un ritual completado
export async function saveRitual(entry: JournalEntry) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('journal_entries')
      .insert([
        {
          day: entry.day,
          deseo: entry.deseo,
          intencion: entry.intencion,
          resultado: entry.resultado,
          created_at: new Date().toISOString(),
        }
      ])
      .select()
    
    if (error) {
      console.error('Error guardando en Supabase:', error)
      return { 
        success: false, 
        error,
        message: `Error al guardar: ${error.message}` 
      }
    }
    
    console.log('✅ Guardado exitosamente en Supabase:', data)
    return { success: true, data, message: 'Guardado exitosamente' }
  } catch (error) {
    console.error('Error inesperado al guardar:', error)
    return { 
      success: false, 
      error,
      message: 'Error inesperado al conectar con la base de datos' 
    }
  }
}

// Función para obtener todos los rituales del usuario
export async function getRituals() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('day', { ascending: true })
    
    if (error) {
      console.error('Error obteniendo rituales:', error)
      return { success: false, error, data: [] }
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Error inesperado al obtener rituales:', error)
    return { success: false, error, data: [] }
  }
}

// Función para obtener el último ritual
export async function getLastRitual() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('day', { ascending: false })
      .limit(1)
      .single()
    
    if (error) {
      console.error('Error obteniendo último ritual:', error)
      return { success: false, error, data: null }
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Error inesperado al obtener último ritual:', error)
    return { success: false, error, data: null }
  }
}

// Función para obtener un ritual por día
export async function getRitualByDay(day: number) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('day', day)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No se encontró registro, esto es normal
        return { success: true, data: null }
      }
      console.error('Error obteniendo ritual del día:', error)
      return { success: false, error, data: null }
    }
    
    return { success: true, data }
  } catch (error) {
    console.error('Error inesperado al obtener ritual del día:', error)
    return { success: false, error, data: null }
  }
}

