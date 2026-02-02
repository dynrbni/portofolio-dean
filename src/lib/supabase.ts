import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || '';

let supabaseInstance: SupabaseClient | null = null;
let supabaseAdminInstance: SupabaseClient | null = null;

export const supabase = (() => {
    if (!supabaseInstance && supabaseUrl && supabaseAnonKey) {
        supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    }
    return supabaseInstance!;
})();

export const supabaseAdmin = (() => {
    if (!supabaseAdminInstance && supabaseUrl && supabaseServiceKey) {
        supabaseAdminInstance = createClient(supabaseUrl, supabaseServiceKey);
    }
    return supabaseAdminInstance!;
})();
