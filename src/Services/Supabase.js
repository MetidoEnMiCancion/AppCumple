import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://teufjqwjgkidubgqhxxf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRldWZqcXdqZ2tpZHViZ3FoeHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjAzODIsImV4cCI6MjA2NDUzNjM4Mn0.k0Hdbn2tkKKu8xoxvEqgbPSZY42UiBpR38dpR9sVIh0'

export const supabase = createClient(supabaseUrl, supabaseKey)