
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
}
