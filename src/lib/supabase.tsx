import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

let supabaseClient: SupabaseClient | null = null;

export const useSupabase = () => {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
        realtime: {
          heartbeatIntervalMs: 5000,
        },
      }
    );
  }
  return supabaseClient;
};

export const useSupabaseWithServiceRole = () => {
  supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE as string,
    {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      realtime: {
        heartbeatIntervalMs: 5000,
      },
    }
  );
  return supabaseClient;
};
