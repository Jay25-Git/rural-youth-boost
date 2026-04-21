
import { LocalDb } from '@/lib/localDb';
import { LocalAuth } from '@/lib/localAuth';

// This is a mock Supabase client that uses localStorage
const mockSupabase = {
  auth: {
    onAuthStateChange: (callback: any) => {
      const session = LocalAuth.getSession();
      if (session) {
        callback('SIGNED_IN', session);
      }
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signInWithPassword: async ({ email, password }: any) => {
      return LocalAuth.signIn(email, password);
    },
    signUp: async ({ email, password, options }: any) => {
      return LocalAuth.signUp(email, password, options?.data);
    },
    signOut: async () => {
      return LocalAuth.signOut();
    },
    getSession: async () => {
      return { data: { session: LocalAuth.getSession() }, error: null };
    },
    getUser: async () => {
      const session = LocalAuth.getSession();
      return { data: { user: session?.user || null }, error: null };
    }
  },
  from: (table: string) => ({
    select: (query = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          const item = LocalDb.findOne(table, (i: any) => i[column] === value);
          return { data: item, error: item ? null : { code: 'PGRST116', message: 'Not found' } };
        },
        order: (col: string, { ascending = true } = {}) => ({
          async then(resolve: any) {
            let data = LocalDb.findMany(table, (i: any) => i[column] === value);
            data.sort((a: any, b: any) => ascending ? (a[col] > b[col] ? 1 : -1) : (a[col] < b[col] ? 1 : -1));
            resolve({ data, error: null });
          }
        }),
        async then(resolve: any) {
           const data = LocalDb.findMany(table, (i: any) => i[column] === value);
           resolve({ data, error: null });
        }
      }),
      order: (column: string, { ascending = true } = {}) => ({
        async then(resolve: any) {
          let data = LocalDb.get(table);
          data.sort((a: any, b: any) => ascending ? (a[column] > b[column] ? 1 : -1) : (a[column] < b[column] ? 1 : -1));
          resolve({ data, error: null });
        }
      }),
      async then(resolve: any) {
        resolve({ data: LocalDb.get(table), error: null });
      }
    }),
    insert: (item: any) => ({
      async then(resolve: any) {
        const newItem = LocalDb.insert(table, item);
        resolve({ data: newItem, error: null });
      }
    }),
    update: (updates: any) => ({
      eq: (column: string, value: any) => ({
        async then(resolve: any) {
          const item = LocalDb.findOne(table, (i: any) => i[column] === value);
          if (item) {
            const updated = LocalDb.update(table, (item as any).id, updates);
            resolve({ data: updated, error: null });
          } else {
            resolve({ data: null, error: { message: 'Not found' } });
          }
        }
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        async then(resolve: any) {
          const items = LocalDb.findMany(table, (i: any) => i[column] === value);
          items.forEach((item: any) => LocalDb.delete(table, item.id));
          resolve({ error: null });
        }
      })
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        // Mock upload by creating a data URL or just storing the name
        // For simplicity, we'll just store the path
        return { data: { path }, error: null };
      },
      remove: async (paths: string[]) => {
        return { error: null };
      },
      getPublicUrl: (path: string) => {
        // Return a placeholder image or a local blob URL if we had one
        // For now, return a random dicebear avatar if it's an avatar
        if (bucket === 'avatars') {
          return { data: { publicUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${path}` } };
        }
        return { data: { publicUrl: path } };
      }
    })
  },
  functions: {
    invoke: async (name: string, options: any) => {
      if (name === 'smart-mario-chat') {
        return { 
          data: { 
            text: "Wahoo! I'm Smart Mario, your local guide. Since we're running in local mode, I'm just simulating this chat. How can I help you with your skills today?" 
          }, 
          error: null 
        };
      }
      return { data: null, error: { message: 'Function not implemented locally' } };
    }
  }
};

export const supabase = mockSupabase as any;