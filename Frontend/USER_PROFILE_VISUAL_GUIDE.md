# User Profile System - Visual Guide

## Profile Icon in Navbar

### Before Login
```
┌─────────────────────────────────────────────────────────────┐
│  🌙  HostelFinder.com  [Nav Items...]  🇮🇳 INR  [Login]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### After Login
```
┌─────────────────────────────────────────────────────────────┐
│  🌙  HostelFinder.com  [Nav Items...]  🇮🇳 INR  (👤)       │
│                                                      ↑       │
│                                                   Profile    │
│                                                    Icon      │
└─────────────────────────────────────────────────────────────┘
```

## Profile Icon States

### Normal State
```
    ┌─────────┐
    │         │
    │    J    │  ← First letter or profile photo
    │    •    │  ← Green status indicator
    └─────────┘
    40x40px
    Circular
    Border: rgba(255,255,255,0.3)
```

### Hover State
```
    ┌─────────┐
    │         │
    │    J    │  ← Scales to 1.05x
    │    •    │  ← Pulsing green dot
    └─────────┘
    Enhanced border
    Shadow effect
```

### With Photo
```
    ┌─────────┐
    │  [IMG]  │  ← User's profile photo
    │    •    │  ← Status indicator
    └─────────┘
```

## Profile Dropdown Menu

### Dropdown Appearance
```
┌─────────────────────────────────────┐
│  ╔═══════════════════════════════╗  │
│  ║  [👤]  John Doe               ║  │ ← Header (blue gradient)
│  ║        john.doe@example.com   ║  │
│  ╚═══════════════════════════════╝  │
│  ┌───────────────────────────────┐  │
│  │  👤  My Profile               │  │ ← Menu items
│  │  📅  My Bookings              │  │
│  │  ❤️  Saved Hostels            │  │
│  │  ⚙️  Settings                 │  │
│  │  ─────────────────────────    │  │
│  │  🚪  Logout                   │  │ ← Red text
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
    280px width
    Slides in from top
    Click outside to close
```

### Hover Effect
```
Normal Item:                Hovered Item:
┌─────────────────────┐    ┌─────────────────────┐
│  👤  My Profile     │    │  👤  My Profile     │
└─────────────────────┘    └─────────────────────┘
Background: transparent    Background: #f8f9fa
```

## Profile Modal - Overview Tab

### Desktop View
```
┌───────────────────────────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════════════════════════╗  ✕ │
│  ║  [👤]  John Doe                                           ║    │ ← Blue header
│  ║        john.doe@example.com                               ║    │
│  ║        ✓ Verified  🌟 Member since 2024                   ║    │
│  ╚═══════════════════════════════════════════════════════════╝    │
│  ┌─────────┬─────────┬─────────┬─────────┐                        │
│  │ Overview│Bookings │  Saved  │Settings │                        │ ← Tabs
│  └─────────┴─────────┴─────────┴─────────┘                        │
│                                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  📅          │  │  ❤️          │  │  ⭐          │           │
│  │  2           │  │  2           │  │  4.8         │           │ ← Stats
│  │  Total       │  │  Saved       │  │  Guest       │           │
│  │  Bookings    │  │  Hostels     │  │  Rating      │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                    │
│  Recent Activity                                                   │
│  ┌────────────────────────────────────────────────────────┐      │
│  │  ✓  Booking Confirmed                      2 days ago  │      │
│  │     Mumbai Central PG - Dec 1, 2024                    │      │
│  └────────────────────────────────────────────────────────┘      │
│  ┌────────────────────────────────────────────────────────┐      │
│  │  ❤️  Saved Hostel                          5 days ago  │      │
│  │     Seaside Hostel Goa                                 │      │
│  └────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────┘
```

## Profile Modal - Bookings Tab

### Booking Card
```
┌─────────────────────────────────────────────────────────────┐
│  GoNest Hostel Bengaluru                    [Upcoming]      │
│                                                             │
│  📍 Koramangala, Bengaluru                                 │
│  📅 Nov 15, 2024 - Nov 20, 2024                            │
│  💰 ₹7,500                                                  │
│                                                             │
│  [View Details]  [Cancel]                                  │
└─────────────────────────────────────────────────────────────┘
```

### Status Indicators
```
Upcoming:                   Completed:
┌──────────┐               ┌──────────┐
│ Upcoming │               │Completed │
└──────────┘               └──────────┘
Blue bg                    Green bg
```

## Profile Modal - Saved Tab

### Saved Hostels Grid
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  [IMAGE]  ❤️ │  │  [IMAGE]  ❤️ │  │  [IMAGE]  ❤️ │
│              │  │              │  │              │
│ Pink City    │  │ Seaside      │  │ Mountain     │
│ Hostel       │  │ Hostel Goa   │  │ View Hostel  │
│              │  │              │  │              │
│ 📍 Jaipur    │  │ 📍 Goa       │  │ 📍 Manali    │
│ ⭐ 8.8       │  │ ⭐ 9.0       │  │ ⭐ 8.5       │
│ ₹1,700/night│  │ ₹1,900/night │  │ ₹1,600/night │
│              │  │              │  │              │
│ [Book Now]   │  │ [Book Now]   │  │ [Book Now]   │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Profile Modal - Settings Tab

### Personal Information
```
┌─────────────────────────────────────────────────────────────┐
│  Personal Information                                       │
│                                                             │
│  Full Name                                                  │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ John Doe                                              │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Email                                                      │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ john.doe@example.com                    [Read-only]   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  Phone Number                                               │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ +91 XXXXX XXXXX                                       │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Notification Preferences
```
┌─────────────────────────────────────────────────────────────┐
│  Preferences                                                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Email Notifications                    [●─────○]     │ │ ← Toggle ON
│  └───────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  SMS Notifications                      [○─────●]     │ │ ← Toggle OFF
│  └───────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Marketing Emails                       [●─────○]     │ │ ← Toggle ON
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Toggle Switch States
```
OFF:                        ON:
[○─────●]                  [●─────○]
Gray background            Blue background
```

## Dark Mode Comparison

### Profile Icon
```
Light Mode:                 Dark Mode:
┌─────────┐                ┌─────────┐
│    J    │                │    J    │
│    •    │                │    •    │
└─────────┘                └─────────┘
Border: rgba(255,255,255,0.3)  Border: rgba(255,255,255,0.2)
Hover: Blue shadow         Hover: Light blue shadow
```

### Dropdown Menu
```
Light Mode:                 Dark Mode:
┌─────────────────┐        ┌─────────────────┐
│ [Blue Header]   │        │ [Blue Header]   │
│ ─────────────── │        │ ─────────────── │
│ White items     │        │ Dark gray items │
│ #fff background │        │ #2a2a2a bg      │
└─────────────────┘        └─────────────────┘
```

### Profile Modal
```
Light Mode:                 Dark Mode:
┌─────────────────┐        ┌─────────────────┐
│ [Blue Header]   │        │ [Blue Header]   │
│ ─────────────── │        │ ─────────────── │
│ White content   │        │ Dark content    │
│ Light cards     │        │ Dark cards      │
│ #fff bg         │        │ #2a2a2a bg      │
└─────────────────┘        └─────────────────┘
```

## Mobile View

### Profile Icon (Mobile)
```
┌─────────────────────────┐
│ 🌙 HostelFinder  (👤)  │
│                         │
└─────────────────────────┘
    Smaller icon
    Same functionality
```

### Dropdown Menu (Mobile)
```
┌───────────────────────┐
│ ╔═══════════════════╗ │
│ ║ [👤] John Doe     ║ │
│ ║ john@example.com  ║ │
│ ╚═══════════════════╝ │
│ ┌─────────────────┐   │
│ │ 👤 My Profile   │   │
│ │ 📅 My Bookings  │   │
│ │ ❤️ Saved        │   │
│ │ ⚙️ Settings     │   │
│ │ ───────────     │   │
│ │ 🚪 Logout       │   │
│ └─────────────────┘   │
└───────────────────────┘
    Full width
    Touch-optimized
```

### Profile Modal (Mobile)
```
┌─────────────────────┐
│ ╔═════════════════╗ │
│ ║ [👤] John Doe   ║ │ ← Smaller avatar
│ ║ john@example.com║ │
│ ╚═════════════════╝ │
│ ┌───┬───┬───┬───┐   │
│ │Ovr│Bkg│Sav│Set│   │ ← Scrollable tabs
│ └───┴───┴───┴───┘   │
│                     │
│ [Content]           │ ← Full screen
│ [Stacked]           │
│ [Layout]            │
│                     │
└─────────────────────┘
```

## Animation Sequences

### Profile Icon Appearance (After Login)
```
Frame 1 (0ms):      Frame 2 (150ms):    Frame 3 (300ms):
[Login Button]      [Fading...]         [👤 Icon]
opacity: 1          opacity: 0.5        opacity: 1
                    scale: 0.8          scale: 1
```

### Dropdown Opening
```
Frame 1 (0ms):      Frame 2 (150ms):    Frame 3 (300ms):
Hidden              Sliding in          Fully visible
opacity: 0          opacity: 0.5        opacity: 1
translateY(-10px)   translateY(-5px)    translateY(0)
```

### Status Indicator Pulse
```
Frame 1:            Frame 2:            Frame 3:
    •                   ◉                   •
No shadow           Shadow ring         No shadow
```

### Modal Opening
```
Frame 1 (0ms):      Frame 2 (150ms):    Frame 3 (300ms):
Hidden              Sliding up          Fully visible
opacity: 0          opacity: 0.5        opacity: 1
translateY(30px)    translateY(15px)    translateY(0)
scale(0.95)         scale(0.97)         scale(1)
```

## Color Palette

### Light Mode
```
Primary:     #0071c2  ████  Blue
Secondary:   #005999  ████  Dark Blue
Success:     #28a745  ████  Green
Background:  #ffffff  ████  White
Card BG:     #f8f9fa  ████  Light Gray
Text:        #262626  ████  Dark Gray
Border:      #e7e7e7  ████  Light Border
```

### Dark Mode
```
Primary:     #4da6ff  ████  Light Blue
Secondary:   #3a8fd9  ████  Medium Blue
Success:     #28a745  ████  Green
Background:  #2a2a2a  ████  Dark Gray
Card BG:     #333333  ████  Medium Gray
Text:        #e0e0e0  ████  Light Gray
Border:      #444444  ████  Dark Border
```

## Interactive Elements

### Button States
```
Normal:                 Hover:                  Active:
┌─────────────┐        ┌─────────────┐        ┌─────────────┐
│ Book Now    │        │ Book Now    │        │ Book Now    │
└─────────────┘        └─────────────┘        └─────────────┘
Blue bg                Darker blue            Normal position
                       Elevated 2px           (pressed)
```

### Card Hover
```
Normal:                 Hover:
┌─────────────┐        ┌─────────────┐
│  [Card]     │        │  [Card]     │
│  Content    │        │  Content    │
└─────────────┘        └─────────────┘
No shadow              Shadow + lift
                       translateY(-4px)
```

### Tab Switching
```
Inactive Tab:           Active Tab:
┌─────────────┐        ┌─────────────┐
│  Overview   │        │  Overview   │
└─────────────┘        └─────────────┘
Gray text              Blue text
No border              Blue bottom border
```

## Responsive Breakpoints

### Desktop (> 768px)
- Modal: 900px max width
- Grid: 3 columns
- Full features

### Tablet (768px - 480px)
- Modal: 95% width
- Grid: 2 columns
- Adjusted spacing

### Mobile (< 480px)
- Modal: Full screen
- Grid: 1 column
- Stacked layout

## Accessibility Indicators

### Focus States
```
Normal:                 Focused:
┌─────────────┐        ┌─────────────┐
│  Button     │        │  Button     │
└─────────────┘        └─────────────┘
No outline             Blue outline
                       2px solid
```

### Keyboard Navigation
```
Tab Order:
1. Profile Icon
2. Dropdown Items (when open)
3. Modal Close Button
4. Tab Navigation
5. Form Fields
6. Action Buttons
```

## Success States

### Login Success
```
Before:                 After:
[Login Button]    →     [👤 Profile Icon]
                        ↓
                        Green status dot
                        Smooth transition
```

### Booking Confirmed
```
┌─────────────────────────────────────┐
│  ✓  Booking Confirmed               │
│     Mumbai Central PG               │
│     Dec 1, 2024                     │
└─────────────────────────────────────┘
Green checkmark
Success message
```

### Settings Saved
```
┌─────────────────────────────────────┐
│  ✓  Settings saved successfully     │
└─────────────────────────────────────┘
Toast notification
Auto-dismiss after 3s
```

## Error States

### Login Failed
```
┌─────────────────────────────────────┐
│  ✗  Login failed                    │
│     Please check your credentials   │
└─────────────────────────────────────┘
Red error message
```

### Network Error
```
┌─────────────────────────────────────┐
│  ⚠  Unable to load profile          │
│     Please try again                │
│     [Retry]                         │
└─────────────────────────────────────┘
Warning icon
Retry button
```

## Loading States

### Profile Loading
```
┌─────────────────┐
│  ⟳  Loading...  │
└─────────────────┘
Spinning icon
```

### Data Fetching
```
┌─────────────────────────────────────┐
│  ▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  Loading bookings...                │
└─────────────────────────────────────┘
Progress bar
```

## Conclusion

This visual guide provides a complete reference for the user profile system's appearance and behavior across all states, themes, and devices. Use it as a reference for implementation, testing, and design consistency.
