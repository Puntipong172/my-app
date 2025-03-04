import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://capxflzstylrgzpvkktt.supabase.co'
const supabaseAnonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhcHhmbHpzdHlscmd6cHZra3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTc3MjAsImV4cCI6MjA1NjY5MzcyMH0.lJ7i9fey8KpuKseR9-cEnJysxGmaPmktfrPgk40od7w';

export const supabase = createClient(supabaseUrl,supabaseAnonkey);