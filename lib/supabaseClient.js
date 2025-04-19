
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zlsoyakuxgvajgaadaeu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpsc295YWt1eGd2YWpnYWFkYWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMTk4NDUsImV4cCI6MjA2MDU5NTg0NX0.FX3_RutYdWHwgGDyFIt_o3F9wclSuUSNJSTZw6kElZs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
