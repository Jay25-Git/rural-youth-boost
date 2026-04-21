
import { LocalDb } from './localDb';

export interface LocalUser {
  id: string;
  email: string;
  password?: string;
  user_metadata?: any;
}

export interface LocalSession {
  user: LocalUser;
  access_token: string;
  expires_at: number;
}

export class LocalAuth {
  private static SESSION_KEY = 'skillsynq_session';

  static async signUp(email: string, password?: string, data?: any) {
    const existingUser = LocalDb.findOne<LocalUser>('users', u => u.email === email);
    if (existingUser) {
      return { data: null, error: { message: 'User already exists' } };
    }

    const newUser = LocalDb.insert<LocalUser>('users', {
      email,
      password, // In a real app, hash this!
      user_metadata: data
    });

    // Also create a profile for the user
    LocalDb.insert('profiles', {
      id: newUser.id,
      user_id: newUser.id,
      nickname: data?.nickname || email.split('@')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    const session = this.createSession(newUser);
    return { data: { user: newUser, session }, error: null };
  }

  static async signIn(email: string, password?: string) {
    const user = LocalDb.findOne<LocalUser>('users', u => u.email === email && u.password === password);
    if (!user) {
      return { data: null, error: { message: 'Invalid credentials' } };
    }

    const session = this.createSession(user);
    return { data: { user, session }, error: null };
  }

  static async signOut() {
    localStorage.removeItem(this.SESSION_KEY);
    return { error: null };
  }

  static getSession(): LocalSession | null {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    if (session.expires_at < Date.now() / 1000) {
      localStorage.removeItem(this.SESSION_KEY);
      return null;
    }
    return session;
  }

  private static createSession(user: LocalUser): LocalSession {
    const session: LocalSession = {
      user,
      access_token: 'local-token-' + Math.random().toString(36).substring(7),
      expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour
    };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return session;
  }
}
