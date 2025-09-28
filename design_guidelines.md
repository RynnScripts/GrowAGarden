# Design Guidelines for Roblox Pet Giveaway Website

## Design Approach: Reference-Based (Gaming/Entertainment)
Drawing inspiration from popular gaming platforms like Steam, Epic Games Store, and Roblox's own interface, combined with modern giveaway/prize websites to create an exciting, clickbait-style experience.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Background: 15 15% 8% (dark charcoal)
- Surface: 220 25% 12% (dark blue-gray)
- Primary accent: 280 85% 65% (vibrant purple)
- Success/claim: 145 75% 55% (bright green)

**Secondary Colors:**
- Warning/urgency: 25 95% 60% (orange-red)
- Text primary: 0 0% 95% (near white)
- Text secondary: 0 0% 70% (light gray)

**Gradients:**
- Hero background: Purple to blue diagonal gradient (280 85% 65% to 220 85% 55%)
- Button gradients: Primary color with slight brightness variation
- Card hover effects: Subtle purple glow overlays

### B. Typography
**Primary Font:** Inter (Google Fonts)
- Headers: Bold weights (700-800) for impact
- Body text: Medium (500) and Regular (400)
- Clickbait elements: Extra bold (800) with larger sizes

**Hierarchy:**
- Hero title: 4xl-6xl, extra bold, gradient text
- Section headers: 2xl-3xl, bold
- Card titles: lg-xl, semibold
- Body text: base, medium
- Captions/metadata: sm, regular

### C. Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, 16
- Consistent padding: p-4, p-6, p-8
- Margins: m-2, m-4, m-8
- Gaps: gap-4, gap-6, gap-8

**Grid System:**
- Main content: max-width container with responsive breakpoints
- Pet grid: 3-4 columns on desktop, 2 on tablet, 1 on mobile
- Activity feed: Single column with fixed width sidebar

### D. Component Library

**Navigation:**
- Dark header with purple accent branding
- Minimal navigation links
- User profile indicator when logged in

**Cards:**
- Pet cards: Rounded corners, subtle glow on hover
- Dark backgrounds with purple accent borders
- Prominent "ADD" buttons with gradient styling

**Forms:**
- Dark input fields with purple focus states
- Rounded corners and subtle shadows
- Clear validation states with colored borders

**Buttons:**
- Primary: Purple gradient with white text
- Secondary: Outline style with purple border
- Claim button: Large, prominent green gradient
- Loading states with animated spinners

**Activity Feed:**
- Real-time notifications with slide-in animations
- User avatars and pet thumbnails
- Timestamp and claim status indicators

### E. Visual Impact Elements

**Clickbait Features:**
- Urgency indicators: "Limited time!" badges
- Live counters: "X pets claimed in last hour"
- Scarcity messaging: "Only Y left!" warnings
- Flashing or pulsing elements for high-value pets

**Animations:**
- Subtle card hover effects with transform and glow
- Button click feedback with scale transforms
- Loading states with smooth spinners
- Success confirmations with check mark animations

**Hero Section:**
- Large background with Roblox-style 3D elements
- Bold, attention-grabbing headline about free pets
- Prominent "START CLAIMING" call-to-action
- Live activity ticker showing recent claims

## Images
- **Hero Background:** Large gaming-themed background with Roblox aesthetic (pets, coins, gaming elements)
- **Pet Thumbnails:** High-quality Roblox pet images for the selection grid
- **User Avatars:** Roblox profile pictures for activity feed
- **Success Icons:** Checkmarks, gift boxes, and celebration graphics

The website should feel exciting and urgent while maintaining usability, creating a compelling experience that encourages users to claim pets while building trust through professional execution.