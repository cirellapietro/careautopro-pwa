import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useSupabase = (tableName, options = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [config, setConfig] = useState(null)

  // Fetch configurazione AdSense/AdMob
  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('config')
        .select('*')
        .eq('chiave', 'ads_config')
        .single()

      if (!error && data) {
        setConfig(data.valore)
      }
    } catch (err) {
      console.log('Config non trovata:', err.message)
    }
  }

  // Fetch dati principali
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let query = supabase.from(tableName).select('*')
      
      // Aggiungi ordering se specificato
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending || false })
      }
      
      // Aggiungi filtri se specificati
      if (options.filters) {
        options.filters.forEach(filter => {
          query = query.eq(filter.column, filter.value)
        })
      }

      const { data, error } = await query

      if (error) throw error
      setData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Insert con gestione UUID automatica
  const insertData = async (itemData) => {
    try {
      setLoading(true)
      setError(null)
      
      // Rimuovi id se presente (verrà generato dal trigger)
      const { id, ...cleanData } = itemData
      
      const { data, error } = await supabase
        .from(tableName)
        .insert([cleanData])
        .select()

      if (error) throw error
      
      await fetchData()
      return data[0]
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Update
  const updateData = async (id, updates) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error
      
      await fetchData()
      return data[0]
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Delete
  const deleteData = async (id) => {
    try {
      setLoading(true)
      setError(null)
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchData()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    fetchConfig()
  }, [tableName])

  return {
    data,
    loading,
    error,
    config,
    refetch: fetchData,
    insertData,
    updateData,
    deleteData,
    refreshConfig: fetchConfig
  }
}