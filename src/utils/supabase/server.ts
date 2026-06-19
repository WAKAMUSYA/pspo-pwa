import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  // 開発用に常にバイパス（Supabase連携を切る）
  const bypass = true;
  console.log('[DEBUG] Development mode: Supabase auth bypassed unconditionally');
  
  if (bypass) {
    const mockClient = {
      auth: {
        getUser: async () => {
          console.log('[DEBUG] Mocked getUser called');
          return { 
            data: { user: { id: 'admin', email: 'admin@pspo.jp' } }, 
            error: null 
          };
        },
        signOut: async () => {
          console.log('[DEBUG] Mocked signOut called');
        }
      },
      from: (table: string) => {
        const builder = {
          select: () => builder,
          eq: () => builder,
          order: () => builder,
          limit: () => builder,
          single: async () => ({
            data: table === 'profiles' ? { role: 'admin', total_stamps: 99 } : {},
            error: null
          }),
          // This makes the builder awaitable directly
          then: (resolve: any) => {
            if (table === 'profiles') {
              resolve({ data: [{ role: 'admin', total_stamps: 99 }], error: null });
            } else {
              resolve({ data: [], error: null });
            }
          }
        };
        return builder;
      }
    };
    return mockClient as unknown as typeof client;
  }

  return client
}
