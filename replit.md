# Meddy's Africana Buka - Restaurant Website

## Overview
A modern, full-featured restaurant website for Meddy's Africana Buka, offering authentic African cuisine, intercontinental dishes, and fresh pastries. The site enables customers to browse menus, add items to cart, customize orders, and place orders via WhatsApp integration with branch-specific phone numbers.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, Node.js
- **State Management**: React hooks, localStorage for cart persistence
- **UI Components**: Shadcn UI components
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.tsx      # Navigation with cart & branch selector
│   │   │   ├── Footer.tsx      # Footer with location info
│   │   │   ├── Carousel.tsx    # Auto-scrolling image carousel
│   │   │   ├── ReviewsSection.tsx  # Animated customer reviews
│   │   │   └── MenuItemCard.tsx    # Menu item display card
│   │   ├── pages/              # Route pages
│   │   │   ├── HomePage.tsx    # Hero, carousel, features, reviews
│   │   │   ├── MenuPage.tsx    # Searchable menu with categories
│   │   │   └── OrderPage.tsx   # Order form with cart management
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useCart.ts      # Cart state management
│   │   └── utils/              # Utility functions
│   │       └── whatsapp.ts     # WhatsApp message generation
├── public/
│   └── data.json              # Menu items, branches, reviews data
├── shared/
│   └── schema.ts              # TypeScript types and Zod schemas
└── attached_assets/
    └── generated_images/      # AI-generated food images
```

## Features

### Core Functionality
1. **Homepage**
   - Hero section with restaurant ambiance
   - Auto-scrolling carousel showcasing dishes
   - Feature highlights (Authentic Cuisine, Fast Service, Multiple Locations)
   - Animated customer reviews section with infinite scroll

2. **Menu Page**
   - Search bar for finding items by name
   - Category filters (African Dishes, Intercontinental, Pastries, Grills, etc.)
   - Grid layout with food images
   - Quick add-to-cart from menu items with toast notifications

3. **Order Page**
   - Categorized accordion menu (Soups, Swallow, Proteins, Food, Pastries)
   - Quantity controls (+/-) for each item
   - Live cart summary with running total
   - Customer info fields (optional name and phone)
   - Remove items from cart

4. **Cart & Checkout**
   - Persistent cart using localStorage
   - Cart item count badge in navbar
   - WhatsApp integration for order placement
   - Branch-specific phone numbers

5. **Branch Selection**
   - Three branches: Egbeda, Cement Bus Stop, Baruwa
   - Each branch has unique WhatsApp number
   - Branch selector in navbar
   - Orders routed to selected branch

### Design System
- **Colors**: Red (primary), Black (text/nav), White (background), Yellow (accents)
- **Typography**: 
  - Headings: Poppins (bold, semibold)
  - Body: Inter (regular, medium)
- **Brand Identity**: Modern, appetizing, authentic African aesthetic

## Data Structure

### Menu Items (data.json)
```json
{
  "id": "unique-id",
  "name": "Item Name",
  "category": "African Dishes | Intercontinental | Pastries | Grills | Soups | Swallow | Proteins | Food",
  "price": 2500,
  "image": "/assets/generated_images/...",
  "description": "Item description"
}
```

### Branches
```json
{
  "id": "branch-id",
  "name": "Branch Name",
  "whatsappNumber": "+234XXXXXXXXXX"
}
```

## Key User Flows

1. **Browse and Quick Add**
   - User navigates to Menu page
   - Searches or filters by category
   - Clicks "+" button on menu item card
   - Item added to cart with toast notification

2. **Custom Order Building**
   - User navigates to Order page
   - Expands category sections in accordion
   - Adds items with quantity controls
   - Reviews cart summary
   - Places order via WhatsApp

3. **WhatsApp Order Placement**
   - User fills cart with desired items
   - Selects branch from navbar dropdown
   - Optionally enters name and phone
   - Clicks "Send Order via WhatsApp"
   - Opens WhatsApp with formatted message to branch

## Recent Changes (October 24, 2025)
- Implemented complete frontend with all pages and components
- Created comprehensive menu data with 30+ items across 8 categories
- Generated AI images for food items and carousel
- Configured design tokens (red/black/white/yellow theme)
- Built cart management with localStorage persistence
- Integrated WhatsApp ordering with branch-specific numbers
- Added search and category filtering on menu page
- Created animated reviews section with infinite scroll
- Implemented responsive design for mobile, tablet, and desktop

## Running the Project
```bash
npm run dev
```
Starts the Express backend and Vite frontend on the same port.

## Environment
- Development database: Not required (using localStorage for cart)
- No authentication needed
- Static menu data loaded from public/data.json
