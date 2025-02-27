import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://ynyfqcdbvmgyxjaklxev.supabase.co'
const supabaseAnonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlueWZxY2Ridm1neXhqYWtseGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzM2NTgsImV4cCI6MjA1MzE0OTY1OH0.Oc3TLTy3kMd0q_GFiBtYYcrOXYDqGrSm7jfKm0EEZ0c';

export const supabase = createClient(supabaseUrl,supabaseAnonkey);