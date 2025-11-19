import { z } from "zod";

// Menu Item Schema
export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum([
    "African Dishes",
    "Intercontinental",
    "Pastries",
    "Grills",
    "Soups",
    "Swallow",
    "Proteins",
    "Food",
    "Drinks",
    "Snacks",
    "Side Dish",
  ]),
  price: z.number(),
  image: z.string(),
  description: z.string().optional(),
});

export type MenuItem = z.infer<typeof menuItemSchema>;

// Order Item Schema
export const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum([
    "African Dishes",
    "Intercontinental",
    "Pastries",
    "Grills",
    "Soups",
    "Swallow",
    "Proteins",
    "Food",
    "Drinks",
    "Snacks",
    "Side Dish",
  ]),
  price: z.number(),
  image: z.string(),
  description: z.string().optional(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

// Cart Item Schema
export const cartItemSchema = z.object({
  menuItemId: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});

export type CartItem = z.infer<typeof cartItemSchema>;

// Branch Schema – UPDATED with lat/lng
export const branchSchema = z.object({
  id: z.string(),
  name: z.string(),
  whatsappNumber: z.string()
});

export type Branch = z.infer<typeof branchSchema>;

// Order Schema
export const orderSchema = z.object({
  items: z.array(cartItemSchema),
  branch: branchSchema,
  total: z.number(),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
});

export type Order = z.infer<typeof orderSchema>;

// Review Schema
export const reviewSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  date: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;
