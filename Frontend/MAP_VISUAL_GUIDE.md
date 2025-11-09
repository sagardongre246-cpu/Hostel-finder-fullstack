# Map Feature - Visual Guide

## Layout Structure

### Desktop View (> 1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│  Main Hotel Section                    │  Sidebar               │
│  ─────────────────────────────────────  │  ────────────────────  │
│                                         │                        │
│  [Hotel Images Grid]                    │  ┌──────────────────┐ │
│                                         │  │ RESERVE YOUR PG  │ │
│  [Hotel Details]                        │  │      STAY        │ │
│                                         │  └──────────────────┘ │
│  [Tabs: Overview, Rooms, etc.]          │                        │
│                                         │  ┌──────────────────┐ │
│                                         │  │ Rating: 8.2      │ │
│                                         │  │ Very good        │ │
│                                         │  │ 289 reviews      │ │
│                                         │  └──────────────────┘ │
│                                         │                        │
│                                         │  ┌──────────────────┐ │
│                                         │  │ Excellent        │ │
│                                         │  │ location!        │ │
│                                         │  │                  │ │
│                                         │  │ 9.6              │ │
│                                         │  │                  │ │
│                                         │  │ ┌──────────────┐ │ │
│                                         │  │ │              │ │ │
│                                         │  │ │  [MAP HERE]  │ │ │
│                                         │  │ │   200px      │ │ │
│                                         │  │ │              │ │ │
│                                         │  │ └──────────────┘ │ │
│                                         │  │                  │ │
│                                         │  │ 📍 Show on map   │ │
│                                         │  └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Tablet View (768px - 1024px)

```
┌─────────────────────────────────────────────────────────────┐
│  Main Hotel Section                                         │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  [Hotel Images Grid]                                        │
│                                                             │
│  [Hotel Details]                                            │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  Sidebar (Below Main Content)                               │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Excellent location!                                 │   │
│  │ 9.6                                                 │   │
│  │                                                     │   │
│  │ ┌─────────────────────────────────────────────┐   │   │
│  │ │                                             │   │   │
│  │ │         [MAP HERE - 180px height]           │   │   │
│  │ │                                             │   │   │
│  │ └─────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │ 📍 Show on map                                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Mobile View (< 768px)

```
┌───────────────────────────────────┐
│  Main Hotel Section               │
│  ───────────────────────────────  │
│                                   │
│  [Hotel Images - Stacked]         │
│                                   │
│  [Hotel Details]                  │
│                                   │
│  ───────────────────────────────  │
│  Sidebar (Below)                  │
│  ───────────────────────────────  │
│                                   │
│  ┌─────────────────────────────┐ │
│  │ Excellent location!         │ │
│  │ 9.6                         │ │
│  │                             │ │
│  │ ┌─────────────────────────┐ │ │
│  │ │                         │ │ │
│  │ │                         │ │ │
│  │ │   [MAP - 250px]         │ │ │
│  │ │   (Larger on mobile)    │ │ │
│  │ │                         │ │ │
│  │ │                         │ │ │
│  │ └─────────────────────────┘ │ │
│  │                             │ │
│  │ 📍 Show on map              │ │
│  └─────────────────────────────┘ │
└───────────────────────────────────┘
```

## Map States

### 1. Normal State

```
┌────────────────────────────────┐
│ Excellent location!            │
│ 9.6                            │
│                                │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ │    [Google Maps View]      │ │
│ │    • Zoom controls         │ │
│ │    • Pan enabled           │ │
│ │    • Hotel marker          │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map                 │
└────────────────────────────────┘
```

### 2. Hover State

```
┌────────────────────────────────┐
│ Excellent location!            │
│ 9.6                            │
│                                │
│ ┌────────────────────────────┐ │ ← Lifted up 2px
│ │                            │ │ ← Stronger shadow
│ │    [Google Maps View]      │ │
│ │    Cursor: grab            │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map (underlined)    │
└────────────────────────────────┘
```

### 3. Transitioning State (Hotel Change)

```
┌────────────────────────────────┐
│ Excellent location!            │
│ 9.6                            │
│                                │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ │    [Fading Map]            │ │ ← 50% opacity
│ │    (Loading new location)  │ │ ← Scaled to 98%
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map                 │
└────────────────────────────────┘
```

### 4. Loading State

```
┌────────────────────────────────┐
│ Excellent location!            │
│ 9.6                            │
│                                │
│ ┌────────────────────────────┐ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │ ← Animated gradient
│ │ ░░░░░░░░░░░░░░░░░░░░░░░░░ │ │ ← Shimmer effect
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map                 │
└────────────────────────────────┘
```

## Dark Mode Comparison

### Light Mode
```
┌────────────────────────────────┐
│ Excellent location!            │ ← Dark text (#262626)
│ 9.6                            │ ← Blue (#0071c2)
│                                │
│ ┌────────────────────────────┐ │ ← White background
│ │                            │ │ ← Light shadow
│ │    [Google Maps]           │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map                 │ ← Blue link
└────────────────────────────────┘
```

### Dark Mode
```
┌────────────────────────────────┐
│ Excellent location!            │ ← Light text (#e0e0e0)
│ 9.6                            │ ← Light blue (#4da6ff)
│                                │
│ ┌────────────────────────────┐ │ ← Dark background
│ │                            │ │ ← Dark shadow + border
│ │    [Google Maps]           │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map                 │ ← Light blue link
└────────────────────────────────┘
```

## Interactive Elements

### Map Controls

```
┌────────────────────────────────┐
│                                │
│  [+] ← Zoom In                 │
│  [-] ← Zoom Out                │
│  [⛶] ← Full Screen             │
│  [🧭] ← Compass (if rotated)   │
│                                │
│  [Drag to Pan] ← Cursor: grab  │
│                                │
└────────────────────────────────┘
```

### Link Behavior

```
Normal:
📍 Show on map

Hover:
📍 Show on map
   ───────────  ← Underline appears

Click:
Opens Google Maps in new tab →
https://www.google.com/maps?q=12.9352,77.6245
```

## Animation Timeline

### Hotel Change Sequence

```
Time: 0ms
┌────────────────┐
│ Current Hotel  │
│ [Map A]        │
└────────────────┘

Time: 0-150ms (Fade Out)
┌────────────────┐
│ Current Hotel  │
│ [Map A] 50%    │ ← Fading
└────────────────┘

Time: 150ms (Switch)
┌────────────────┐
│ New Hotel      │
│ [Loading...]   │ ← Skeleton
└────────────────┘

Time: 150-300ms (Fade In)
┌────────────────┐
│ New Hotel      │
│ [Map B] 50%    │ ← Appearing
└────────────────┘

Time: 300ms (Complete)
┌────────────────┐
│ New Hotel      │
│ [Map B] 100%   │ ← Fully visible
└────────────────┘
```

## Responsive Breakpoints

### Height Changes

```
Desktop (> 1024px):     200px
┌──────────────────┐
│                  │
│                  │
│   [Map View]     │
│                  │
│                  │
└──────────────────┘

Tablet (768-1024px):    180px
┌──────────────────┐
│                  │
│   [Map View]     │
│                  │
└──────────────────┘

Mobile (480-768px):     250px
┌──────────────────┐
│                  │
│                  │
│                  │
│   [Map View]     │
│                  │
│                  │
│                  │
└──────────────────┘

Small Mobile (< 480px): 220px
┌──────────────────┐
│                  │
│                  │
│   [Map View]     │
│                  │
│                  │
└──────────────────┘
```

## User Interaction Flow

```
1. User views hotel page
   ↓
2. Map loads with hotel location
   ↓
3. User can:
   ├─→ Zoom in/out on map
   ├─→ Pan around area
   ├─→ Click "Show on map" link
   │   └─→ Opens Google Maps in new tab
   └─→ Click different hotel card
       └─→ Map transitions to new location
```

## Map Features Visualization

```
┌─────────────────────────────────────┐
│  [+] [-] [⛶]                        │ ← Controls
│                                     │
│         🏨 ← Hotel Marker           │
│                                     │
│    Street names visible             │
│    Nearby landmarks shown           │
│    Zoom level: 15                   │
│                                     │
│  © Google Maps                      │
└─────────────────────────────────────┘
```

## Error States

### No Coordinates Available

```
┌────────────────────────────────┐
│ Excellent location!            │
│ 9.6                            │
│                                │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ │  Map unavailable           │ │
│ │  for this location         │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map                 │
└────────────────────────────────┘
```

### Map Load Error

```
┌────────────────────────────────┐
│ Excellent location!            │
│ 9.6                            │
│                                │
│ ┌────────────────────────────┐ │
│ │                            │ │
│ │  Unable to load map        │ │
│ │  Please check connection   │ │
│ │                            │ │
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map (still works)   │
└────────────────────────────────┘
```

## Performance Indicators

### Loading Performance

```
Fast Connection (< 1s):
[████████████████████] 100%
Map loads immediately

Slow Connection (2-3s):
[████░░░░░░░░░░░░░░░░] 20%
Skeleton shows, then map appears

Very Slow (> 5s):
[██░░░░░░░░░░░░░░░░░░] 10%
Lazy loading prevents blocking
```

## Accessibility Features

```
┌────────────────────────────────┐
│ Excellent location!            │ ← Semantic heading
│ 9.6                            │
│                                │
│ ┌────────────────────────────┐ │
│ │ <iframe                    │ │
│ │   title="Map of Hotel"     │ │ ← Screen reader text
│ │   allowFullScreen          │ │ ← Keyboard accessible
│ │   loading="lazy">          │ │ ← Performance
│ └────────────────────────────┘ │
│                                │
│ 📍 Show on map                 │ ← Tab-accessible link
│    [Focus indicator]           │ ← Visible focus
└────────────────────────────────┘
```

## Testing Scenarios

### Scenario 1: Desktop User
```
1. Opens hotel page on desktop
2. Sees map at 200px height
3. Hovers over map → shadow increases
4. Clicks and drags → pans around
5. Clicks zoom controls → zooms in/out
6. Clicks "Show on map" → opens Google Maps
```

### Scenario 2: Mobile User
```
1. Opens hotel page on phone
2. Scrolls down to location section
3. Sees larger map (250px)
4. Taps and drags → pans around
5. Pinches → zooms in/out
6. Taps "Show on map" → opens Google Maps app
```

### Scenario 3: Hotel Switching
```
1. Views Hotel A with map
2. Clicks Hotel B card
3. Map fades out (150ms)
4. Map updates to Hotel B location
5. Map fades in (150ms)
6. Total transition: 300ms
```

## Conclusion

The map implementation provides:
- ✓ Clear visual location context
- ✓ Smooth responsive behavior
- ✓ Interactive exploration
- ✓ Seamless hotel transitions
- ✓ Full dark mode support
- ✓ Excellent performance
- ✓ Accessibility compliance
