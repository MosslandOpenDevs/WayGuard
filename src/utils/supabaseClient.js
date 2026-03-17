import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || ''

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabaseAuthSetupMessage = 'Supabase URL과 anon key를 .env에 설정해 주세요.'

const fallbackUrl = 'https://placeholder-url.supabase.co'
const fallbackAnonKey = 'placeholder-anon-key'

export const supabase = createClient(
    isSupabaseConfigured ? supabaseUrl : fallbackUrl,
    isSupabaseConfigured ? supabaseAnonKey : fallbackAnonKey,
)
