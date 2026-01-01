
// A mock Supabase client to prevent runtime errors for the UI demo.
// In a real app, you would import createClient from '@supabase/supabase-js'
// and use process.env variables.

const mockSupabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
  },
  functions: {
    invoke: async () => ({ data: null, error: null }),
  },
};

export const supabase = mockSupabase as any;
