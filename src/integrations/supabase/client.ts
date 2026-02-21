import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://fmwtgtmdtgnctrrckaab.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd3RndG1kdGduY3RycmNrYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMzQxMDYsImV4cCI6MjA4NTY5NDEwNn0.-oNFKXsDmVM-ZFlSClnHoVfRoKYcR64Qgld-XDn5PLw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
