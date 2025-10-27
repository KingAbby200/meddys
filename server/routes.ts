import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Meddy's Africana Buka uses client-side cart management with localStorage
  // and static menu data from public/data.json
  // No API routes required for MVP
  
  // Future API endpoints could include:
  // - POST /api/orders - Save order history
  // - GET /api/menu - Dynamic menu updates
  // - POST /api/feedback - Customer feedback submission

  const httpServer = createServer(app);

  return httpServer;
}
