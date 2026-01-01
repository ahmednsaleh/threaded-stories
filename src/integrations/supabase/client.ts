import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://fmwtgtmdtgnctrrckaab.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd3RndG1kdGduY3RycmNrYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjcxNjMsImV4cCI6MjA3MzQ0MzE2M30.0xh6C3-3t_uqk90vUkqafnzSjIHiELOlwd86H6H-Rac';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
