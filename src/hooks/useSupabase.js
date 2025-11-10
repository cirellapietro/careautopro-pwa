import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

export const useSupabase = (tableName, options = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let query = supabase.from(tableName).select('*')
      
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending || false })
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

  const insertData = async (itemData) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from(tableName)
        .insert([itemData])
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
  }, [tableName])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    insertData,
    deleteData
  }
}