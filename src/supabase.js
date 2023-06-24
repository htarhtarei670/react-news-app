import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xkgvnlgeautlnvucwwaf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZ3ZubGdlYXV0bG52dWN3d2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcxODQ5ODYsImV4cCI6MjAwMjc2MDk4Nn0.dqtahW1okgombqhUO-EKDbNPutd-OlReAzJd9XoRkTQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;