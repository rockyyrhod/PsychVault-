import { createClient } from '@supabase/supabase-js'

// Using Vite's import.meta.env to securely access your keys
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase Environment Variables. Check your .env or Netlify settings.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * PRODUCTION CONNECTION CHECK
 * We only select the error to satisfy TypeScript's strict "unused variable" rule
 */
const checkConnection = async () => {
  try {
    const { error } = await supabase.from('research_repos').select('id').limit(1)
    
    if (error) {
      // If the table doesn't exist yet, this might error, but the connection is still alive
      if (error.code === 'PGRST116') {
        console.log('✅ Supabase Connected (Table is empty or not found).')
      } else {
        console.warn('Supabase Connection Warning:', error.message)
      }
    } else {
      console.log('✅ PsychVault Database: Online')
    }
  } catch (err) {
    console.error('Unexpected Connection Error:', err)
  }
}

checkConnection()