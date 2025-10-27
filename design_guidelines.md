# Meddy's Africana Buka - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern food delivery and restaurant platforms (Uber Eats, DoorDash, modern restaurant sites) while incorporating African design sensibilities through warm visual elements and bold, inviting layouts.

**Core Principles**:
- Appetite appeal through generous food imagery
- Intuitive navigation reflecting food categories
- Trust-building through reviews and branch visibility
- Seamless path from browsing to ordering

## Layout System

**Spacing Units**: Use Tailwind spacing of 2, 4, 6, 8, and 12 consistently throughout. Large section padding: py-12 to py-20 on desktop, py-8 to py-12 on mobile.

**Grid Structure**:
- Homepage hero: Full-width with contained content max-w-6xl
- Menu items: 3-column grid (lg:grid-cols-3) on desktop, 2-column (md:grid-cols-2) on tablet, single column on mobile
- Order form: Single column layout max-w-2xl for optimal form completion
- Reviews: 3-column grid with auto-scroll carousel fallback on mobile

**Container Strategy**: Use full-width sections with inner max-w-7xl containers for consistency

## Typography

**Font Families**: 
- Headings: Poppins (Bold 700, SemiBold 600) via Google Fonts - conveys modern confidence
- Body: Inter (Regular 400, Medium 500) via Google Fonts - excellent readability

**Type Scale**:
- Hero headline: text-5xl to text-6xl (desktop), text-4xl (mobile), font-bold
- Section titles: text-3xl to text-4xl, font-semibold
- Menu item names: text-xl, font-semibold
- Prices: text-lg, font-bold (red accent)
- Body text: text-base
- Form labels: text-sm, font-medium
- Buttons: text-base, font-semibold

## Color Application

**Brand Colors** (Red, Black, White, Yellow):
- Primary CTA buttons: Red background with white text
- Secondary accents: Yellow for highlights, badges, special offers
- Navigation and footer: Black background with white text
- Content backgrounds: White with subtle gray (neutral-50) sections for variation
- Price tags: Red text to draw attention
- Category badges: Yellow background with black text

**Application Pattern**: Use white as the dominant background, black for grounding elements (header/footer), red for action-oriented elements, yellow sparingly for emphasis and delight.

## Component Specifications

### Navigation Header
- Sticky position with black background
- Logo on left, navigation links center, branch selector and cart icon on right
- Mobile: Hamburger menu with slide-out drawer
- Height: h-16 to h-20

### Homepage Hero Section
- Full-width with gradient overlay on hero image
- Large hero image depicting restaurant ambiance or signature dish
- Headline and subheadline centered with primary CTA button
- Minimum height: 80vh on desktop, 60vh on mobile

### Automatic Carousel (Food/Pastry Images)
- Position: Directly below hero section
- Full-width container with max-w-7xl inner content
- Display 3-4 images simultaneously on desktop in horizontal scroll
- Auto-advance every 4 seconds with manual navigation dots
- Image aspect ratio: 4:3 or 16:9, rounded-lg corners
- Smooth fade transitions between slides

### Menu Page Layout
- Search bar: Prominent sticky bar below header, full-width with max-w-2xl, rounded-full with shadow
- Category filter tabs: Horizontal scroll-able pill buttons (African, Intercontinental, Pastries, Grills)
- Menu items: Card-based grid with hover elevation
- Each card: Image (aspect-ratio-square), item name, brief description, price, add-to-cart button
- Card styling: White background, rounded-xl, shadow-sm with hover:shadow-lg transition

### Order Form
- Accordion-style category sections (expandable/collapsible)
- Each category header: Bold with item count badge
- Item rows: Checkbox/quantity selector, item name, price right-aligned
- Running total: Sticky footer bar showing current total with "Send Order" CTA
- Form max-width: max-w-2xl, centered with generous padding

### Review Section
- 3-column grid of testimonial cards
- Each card: Customer quote, star rating (5 yellow stars), customer name, subtle border
- Smooth horizontal scroll animation on desktop (infinite loop)
- Cards: White background, rounded-lg, p-6, shadow-md

### Branch Selection
- Dropdown or radio button group near order form
- Display branch names with location icons
- Visual indication of selected branch

### Shopping Cart
- Slide-out panel from right side
- List of added items with quantities and prices
- Subtotal display
- "Proceed to Order" button linking to order form

### Buttons
- Primary (Red): Solid background, white text, rounded-lg, px-6 py-3
- Secondary (Black outlined): Border-2, transparent background, black text
- Buttons on images: Semi-transparent white background with backdrop-blur-md, dark text
- All buttons: No hover animations, rely on browser defaults

### Icons
- Use Heroicons via CDN (outline style for navigation, solid for actions)
- Cart icon with badge counter
- Star icons for reviews (solid fill)
- Location pin for branches
- Search icon for search bar

## Images

**Required Images**:

1. **Hero Image** (Homepage): Large, appetizing wide-angle shot of restaurant interior with food being served or a beautifully plated signature African dish. Should convey warmth and authenticity. Position: Full-width hero section background with gradient overlay.

2. **Carousel Images** (Homepage): 6-8 high-quality images rotating:
   - Jollof rice with grilled chicken and plantain
   - Assorted pastries display (meat pies, bread)
   - Egusi soup with pounded yam
   - Grilled fish platter
   - Intercontinental pasta dish
   - Fresh bakery counter shot
   - Restaurant ambiance with customers

3. **Menu Item Images**: Individual dish photos for each menu category:
   - African dishes: Jollof rice, fried rice, egusi soup, okra soup, etc.
   - Intercontinental: Spaghetti, Chinese rice, etc.
   - Pastries: Meat pies, chicken pies, bread varieties
   - Grills: Asun, suya, grilled chicken, fish
   - All square aspect ratio (1:1), high quality, well-lit, appetizing presentation

4. **Review Section**: Small circular avatar placeholders (can use initials or generic silhouettes)

**Image Treatment**: All food images should be vibrant, well-lit, with warm tones. Apply subtle rounded corners (rounded-lg to rounded-xl) to all images for modern feel.

## Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column grids, adjusted spacing)
- Desktop: > 1024px (3-column grids, full layouts)

**Mobile Optimizations**:
- Hamburger menu for navigation
- Single-column menu grid
- Carousel shows 1 image at a time with swipe
- Order form sections stack vertically
- Sticky cart summary bar at bottom

## Animations

**Limited Animation Scope**:
- Review section: Slow horizontal auto-scroll (speed: 30-40 seconds per full cycle)
- Carousel: Smooth fade transitions (duration: 0.5s)
- Menu cards: Subtle elevation on hover (shadow transition only)
- Form accordion: Smooth expand/collapse (duration: 0.3s)

**No Animations**: Page load effects, scroll-triggered animations, parallax effects

## Accessibility

- Maintain WCAG AA contrast ratios (white text on black, black text on white)
- Form inputs with visible labels and focus states
- Keyboard navigation for all interactive elements
- Alt text for all food images describing the dish
- ARIA labels for cart counter, branch selector, search functionality

This design creates an immersive, appetizing experience that guides users from discovery through menu exploration to seamless WhatsApp ordering, while celebrating African cuisine with modern web design patterns.