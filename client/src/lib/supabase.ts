import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://frgeojgbfbnngkxsreze.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZ2VvamdiZmJubmdreHNyZXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzQ1MjEsImV4cCI6MjA5ODkxMDUyMX0.ZHp1jrfIfWrR10o4e58ahm2owvwrok5MMOtGN4jEQTA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
