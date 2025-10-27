// Storage interface for Meddy's Africana Buka
// This application uses client-side localStorage for cart management
// and static JSON data for menu items, branches, and reviews.
// No server-side storage is required for the MVP.

export interface IStorage {
  // Future: Add methods here if server-side features are needed
  // Example: saveOrder, getOrderHistory, etc.
}

export class MemStorage implements IStorage {
  constructor() {
    // Minimal storage implementation
  }
}

export const storage = new MemStorage();
