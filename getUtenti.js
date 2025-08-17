import { createClient } from '@supabase/supabase-js'

// Inserisci i tuoi dati
const supabaseUrl = "https://https://jamttxwhexlvbkjccrqm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUz"
// Inizializzazione client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Esempio: leggere dati da una tabella "utenti"
async function getUtenti() {
  const { data, error } = await supabase.from("utenti").select("*")
  if (error) {
    console.error("Errore:", error)
  } else {
    console.log("Utenti:", data)
  }
}

getUtenti()