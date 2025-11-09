# Reservation Modal - Visual Guide

## Modal Appearance

### Desktop View (Light Mode)
```
┌─────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║  Reserve Your PG Stay                              ✕      ║  │ ← Blue gradient header
│  ╚═══════════════════════════════════════════════════════════╝  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  GoNest Hostel Bengaluru                                │    │ ← Hostel info (light blue bg)
│  │  Starting from  ₹1,500  per month                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Full Name *                                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Enter your full name                                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Email Address *                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ your.email@example.com                                  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Phone Number *                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ +91 XXXXX XXXXX                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Check-in Date *              Check-out Date *                   │
│  ┌──────────────────────┐    ┌──────────────────────┐          │
│  │ 📅 Select date       │    │ 📅 Select date       │          │
│  └──────────────────────┘    └──────────────────────┘          │
│                                                                   │
│  Number of Guests *           Number of Rooms *                  │
│  ┌──────────────────────┐    ┌──────────────────────┐          │
│  │ 1 Guest         ▼    │    │ 1 Room          ▼    │          │
│  └──────────────────────┘    └──────────────────────┘          │
│                                                                   │
│  Special Requests (Optional)                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Any special requirements or preferences...              │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║  🏷️  We Price Match                                  ▼   ║  │ ← Yellow gradient button
│  ╚═══════════════════════════════════════════════════════════╝  │
│                                                                   │
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║           Complete Reservation                            ║  │ ← Blue gradient button
│  ╚═══════════════════════════════════════════════════════════╝  │
└─────────────────────────────────────────────────────────────────┘
```

### Price Match Expanded View
```
┌─────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║  🏷️  We Price Match                                  ▲   ║  │ ← Clicked to expand
│  ╚═══════════════════════════════════════════════════════════╝  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Best Price Guarantee                                   │    │
│  │  We compare prices from top booking platforms to        │    │
│  │  ensure you get the best deal!                          │    │
│  │                                                          │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ 🌙 HostelFinder.com    [Best Price!]  ₹1,500  │    │    │ ← Green highlight
│  │  │                         Save ₹150              │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ 🏠 Agoda                           ₹1,650      │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ 🏨 Booking.com                     ₹1,700      │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ 🎯 Goibibo                         ₹1,750      │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ 🌍 Hostelworld                     ₹1,850      │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ ✈️ MakeMyTrip                      ₹1,900      │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │                                                          │    │
│  │  ─────────────────────────────────────────────────      │    │
│  │  ✓ Prices updated in real-time                          │    │
│  │  ✓ No hidden fees                                       │    │
│  │  ✓ Best price guaranteed or we'll refund the difference │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Loading State
```
┌─────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║  🏷️  We Price Match                                  ▲   ║  │
│  ╚═══════════════════════════════════════════════════════════╝  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │                        ⟳                                │    │ ← Spinning loader
│  │                                                          │    │
│  │           Comparing prices across platforms...          │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Dark Mode View

### Desktop View (Dark Mode)
```
┌─────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║  Reserve Your PG Stay                              ✕      ║  │ ← Blue gradient header
│  ╚═══════════════════════════════════════════════════════════╝  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  GoNest Hostel Bengaluru                                │    │ ← Dark blue bg (#1a3a4a)
│  │  Starting from  ₹1,500  per month                       │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Full Name *                                                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Enter your full name                                    │    │ ← Dark input (#333)
│  └─────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [All form fields with dark backgrounds and light text]          │
│                                                                   │
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║  🏷️  We Price Match                                  ▼   ║  │ ← Yellow gradient
│  ╚═══════════════════════════════════════════════════════════╝  │
│                                                                   │
│  ╔═══════════════════════════════════════════════════════════╗  │
│  ║           Complete Reservation                            ║  │ ← Blue gradient
│  ╚═══════════════════════════════════════════════════════════╝  │
└─────────────────────────────────────────────────────────────────┘
```

## Mobile View (Portrait)

### Mobile Layout
```
┌───────────────────────────┐
│ ╔═══════════════════════╗ │
│ ║ Reserve Your PG  ✕    ║ │ ← Smaller header
│ ╚═══════════════════════╝ │
│                           │
│ ┌───────────────────────┐ │
│ │ GoNest Hostel         │ │
│ │ ₹1,500 per month      │ │
│ └───────────────────────┘ │
│                           │
│ Full Name *               │
│ ┌───────────────────────┐ │
│ │ Enter name            │ │
│ └───────────────────────┘ │
│                           │
│ Email *                   │
│ ┌───────────────────────┐ │
│ │ email@example.com     │ │
│ └───────────────────────┘ │
│                           │
│ Phone *                   │
│ ┌───────────────────────┐ │
│ │ +91 XXXXX XXXXX       │ │
│ └───────────────────────┘ │
│                           │
│ Check-in Date *           │
│ ┌───────────────────────┐ │
│ │ 📅 Select date        │ │
│ └───────────────────────┘ │
│                           │
│ Check-out Date *          │
│ ┌───────────────────────┐ │
│ │ 📅 Select date        │ │
│ └───────────────────────┘ │
│                           │
│ Guests *                  │
│ ┌───────────────────────┐ │
│ │ 1 Guest          ▼    │ │
│ └───────────────────────┘ │
│                           │
│ Rooms *                   │
│ ┌───────────────────────┐ │
│ │ 1 Room           ▼    │ │
│ └───────────────────────┘ │
│                           │
│ Special Requests          │
│ ┌───────────────────────┐ │
│ │ Optional...           │ │
│ └───────────────────────┘ │
│                           │
│ ╔═══════════════════════╗ │
│ ║ 🏷️ We Price Match ▼  ║ │
│ ╚═══════════════════════╝ │
│                           │
│ ╔═══════════════════════╗ │
│ ║ Complete Reservation  ║ │
│ ╚═══════════════════════╝ │
└───────────────────────────┘
```

## Animation States

### Modal Opening
```
Frame 1 (0ms):     Frame 2 (100ms):   Frame 3 (200ms):   Frame 4 (300ms):
Invisible          Fading in          Sliding up         Fully visible
opacity: 0         opacity: 0.3       opacity: 0.7       opacity: 1
translateY(30px)   translateY(20px)   translateY(10px)   translateY(0)
scale(0.95)        scale(0.97)        scale(0.99)        scale(1)
```

### Close Button Hover
```
Normal:            Hover:
    ✕              ⤫ (rotated 90°)
```

### Price Match Toggle
```
Collapsed:                    Expanded:
╔═══════════════════════╗    ╔═══════════════════════╗
║ 🏷️ We Price Match ▼  ║    ║ 🏷️ We Price Match ▲  ║
╚═══════════════════════╝    ╚═══════════════════════╝
                             ┌───────────────────────┐
                             │ [Price comparison]    │
                             └───────────────────────┘
```

### Submit Button States
```
Normal:                    Hover:                     Active:
╔═══════════════════╗     ╔═══════════════════╗     ╔═══════════════════╗
║ Complete          ║     ║ Complete          ║     ║ Complete          ║
║ Reservation       ║     ║ Reservation       ║     ║ Reservation       ║
╚═══════════════════╝     ╚═══════════════════╝     ╚═══════════════════╝
                          (elevated 2px)             (back to normal)
                          (darker gradient)
```

## Color Scheme

### Light Mode
- **Background**: White (#fff)
- **Text**: Dark gray (#262626)
- **Primary**: Blue (#0071c2)
- **Accent**: Yellow (#febb02)
- **Success**: Green (#28a745)
- **Borders**: Light gray (#e7e7e7)
- **Hover**: Light blue (#f0f8ff)

### Dark Mode
- **Background**: Dark gray (#2a2a2a)
- **Text**: Light gray (#e0e0e0)
- **Primary**: Light blue (#4da6ff)
- **Accent**: Yellow (#febb02)
- **Success**: Green (#28a745)
- **Borders**: Medium gray (#444)
- **Hover**: Darker gray (#333)

## Interactive Elements

### Form Input Focus
```
Before Focus:              After Focus:
┌─────────────────────┐   ┌─────────────────────┐
│ Enter your name     │   │ Enter your name▊    │ ← Blue glow
└─────────────────────┘   └─────────────────────┘
Border: #e7e7e7           Border: #0071c2
                          Shadow: 0 0 0 3px rgba(0,113,194,0.1)
```

### Price Comparison Item Hover
```
Before Hover:                    After Hover:
┌──────────────────────────┐    ┌──────────────────────────┐
│ 🏨 Booking.com  ₹1,700   │    │ 🏨 Booking.com  ₹1,700   │ ← Slides right 4px
└──────────────────────────┘    └──────────────────────────┘
Border: #e7e7e7                  Border: #0071c2
```

### Best Price Highlight
```
┌────────────────────────────────────────┐
│ 🌙 HostelFinder.com  [Best Price!]    │ ← Green gradient background
│                      ₹1,500            │
│                      Save ₹150         │ ← Green text
└────────────────────────────────────────┘
Background: linear-gradient(135deg, #e8f5e9, #c8e6c9)
Border: #28a745
Shadow: 0 4px 12px rgba(40,167,69,0.2)
```

## Responsive Breakpoints

### Desktop (> 768px)
- Modal width: 700px max
- Two-column layout for date/guest fields
- Full padding and spacing

### Tablet (768px - 480px)
- Modal width: 95%
- Single-column layout
- Reduced padding

### Mobile (< 480px)
- Modal: Full screen
- No border radius
- Minimal padding
- Touch-optimized inputs
- Larger tap targets

## Accessibility Features

### Keyboard Navigation
- Tab through all form fields
- Enter to submit
- Escape to close modal
- Arrow keys in dropdowns

### Screen Reader Support
- Proper label associations
- ARIA labels where needed
- Focus management
- Semantic HTML structure

### Visual Indicators
- Focus outlines on all interactive elements
- High contrast in both themes
- Clear error states
- Loading indicators

## User Flow

1. **User clicks "Reserve Your PG Stay" button**
   - Modal fades in with slide-up animation
   - Backdrop blurs background
   - Focus moves to first input

2. **User fills out form**
   - Real-time validation
   - Date picker for check-in/out
   - Dropdowns for guests/rooms
   - Optional special requests

3. **User clicks "We Price Match"**
   - Section expands smoothly
   - Loading spinner appears
   - After 1.5s, prices display
   - Best price highlighted

4. **User reviews prices**
   - Can see savings amount
   - Platform logos visible
   - Sorted by price
   - Can collapse section

5. **User submits form**
   - Validation checks
   - Success message
   - Modal closes
   - Confirmation alert

## Success Indicators

✅ Modal opens smoothly
✅ Form is fully functional
✅ Price match works correctly
✅ Responsive on all devices
✅ Dark mode supported
✅ Animations are smooth
✅ Accessible to all users
✅ Professional appearance
