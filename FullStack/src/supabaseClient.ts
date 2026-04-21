import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// CRITICAL: Make sure 'export' is here!
export const verifyConnection = async () => {
  try {
    const { data, error } = await supabase.from('research_repos').select('*').limit(1);
    if (error) throw error;
    return { success: true, message: "✅ Connected to Supabase!" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};