
export class LocalDb {
  private static getStorageKey(table: string) {
    return `skillsynq_db_${table}`;
  }

  static get<T>(table: string): T[] {
    const data = localStorage.getItem(this.getStorageKey(table));
    return data ? JSON.parse(data) : [];
  }

  static save<T>(table: string, data: T[]): void {
    localStorage.setItem(this.getStorageKey(table), JSON.stringify(data));
  }

  static insert<T extends { id?: string }>(table: string, item: T): T {
    const data = this.get<T>(table);
    const newItem = { 
      ...item, 
      id: item.id || crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    data.push(newItem as T);
    this.save(table, data);
    return newItem as T;
  }

  static update<T extends { id: string }>(table: string, id: string, updates: Partial<T>): T | null {
    const data = this.get<T>(table);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) return null;

    const updatedItem = { 
      ...data[index], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    data[index] = updatedItem;
    this.save(table, data);
    return updatedItem;
  }

  static delete<T extends { id: string }>(table: string, id: string): void {
    const data = this.get<T>(table);
    const filteredData = data.filter(item => item.id !== id);
    this.save(table, filteredData);
  }

  static findOne<T>(table: string, predicate: (item: T) => boolean): T | null {
    const data = this.get<T>(table);
    return data.find(predicate) || null;
  }

  static findMany<T>(table: string, predicate?: (item: T) => boolean): T[] {
    const data = this.get<T>(table);
    return predicate ? data.filter(predicate) : data;
  }

  static seed(): void {
    const users = this.get('users');
    if (users.length > 0) return;

    // Seed Users
    const marioId = crypto.randomUUID();
    const luigiId = crypto.randomUUID();

    this.save('users', [
      { id: marioId, email: 'mario@test.com', password: 'password123' },
      { id: luigiId, email: 'luigi@test.com', password: 'password123' }
    ]);

    // Seed Profiles
    this.save('profiles', [
      { 
        id: marioId, 
        user_id: marioId, 
        nickname: 'Super Mario', 
        user_type: 'mentor',
        avatar_url: 'mario',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      { 
        id: luigiId, 
        user_id: luigiId, 
        nickname: 'Green Luigi', 
        user_type: 'student',
        avatar_url: 'luigi',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]);

    // Seed Stories
    this.save('stories', [
      {
        id: crypto.randomUUID(),
        user_id: marioId,
        author_name: 'Super Mario',
        title: 'Mastering the Pipes',
        content: 'I spent years learning the ins and outs of plumbing. It takes patience and the right tools! Always remember to check the washers first.',
        skill: 'Plumbing',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: crypto.randomUUID(),
        user_id: luigiId,
        author_name: 'Green Luigi',
        title: 'Overcoming Stage Fright',
        content: 'I used to be very shy, but by practicing communication skills in small groups, I became much more confident. You can do it too!',
        skill: 'Communication',
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      }
    ]);

    // Seed some likes
    this.save('story_likes', []);
    this.save('story_replies', []);
  }
}

// Automatically seed on load
LocalDb.seed();
