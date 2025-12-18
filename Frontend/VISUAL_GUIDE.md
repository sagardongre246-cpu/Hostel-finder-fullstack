# Visual Guide - Search and Reserve Enhancements

## Component Layout

### 1. Search Bar with Guests Popup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  📍 Destination        │  📅 Check-in — Check-out  │  👥 Guests  │ 🔍 Search │
│  Where are you going?  │  Select dates             │  2 adults   │           │
│                        │                           │  0 children │           │
│                        │                           │  1 room     │           │
└─────────────────────────────────────────────────────────────────────────────┘
                                                      │
                                                      ▼
                                            ┌──────────────────┐
                                            │  Guests Popup    │
                                            ├──────────────────┤
                                            │ Adults (18+)     │
                                            │  ⊖  2  ⊕        │
                                            ├──────────────────┤
                                            │ Children (0-17)  │
                                            │  ⊖  0  ⊕        │
                                            ├──────────────────┤
                                            │ Rooms            │
                                            │  ⊖  1  ⊕        │
                                            ├──────────────────┤
                                            │    [Done]        │
                                            └──────────────────┘
```

### 2. Reserve Section (Redesigned)

```
┌─────────────────────────────────┐
│  ╔═══════════════════════════╗  │
│  ║  RESERVE YOUR PG STAY     ║  │  ← Gradient button
│  ║  (with shimmer effect)    ║  │     with hover animation
│  ╚═══════════════════════════╝  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🏷️ We Price Match        │  │  ← Green badge
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 3. Scroll Behavior

```
User fills form:
┌─────────────────────────────────────┐
│ Destination: Bengaluru              │
│ Check-in: Mon, 10 Nov               │
│ Check-out: Fri, 14 Nov              │
│ Guests: 2 adults · 0 children · 1 room │
│                                     │
│         [🔍 Search]  ← Click        │
└─────────────────────────────────────┘
              │
              ▼ Smooth scroll animation
┌─────────────────────────────────────┐
│ More Recommendations in India       │ ← Scrolls here
│ ─────────────────────────────────   │
│                                     │
│ [Hotel Card 1] [Hotel Card 2]      │
│ [Hotel Card 3] [Hotel Card 4]      │
└─────────────────────────────────────┘
```

## Color Scheme

### Light Mode
- **Primary Blue**: #0071c2
- **Secondary Blue**: #005999
- **Background**: #ffffff, #f8f9fa
- **Text**: #262626, #6b6b6b
- **Accent Yellow**: #febb02
- **Success Green**: #2e7d32

### Dark Mode
- **Primary Blue**: #4da6ff
- **Background**: #1a1a1a, #2a2a2a, #333
- **Text**: #e0e0e0, #b0b0b0
- **Borders**: #444
- **Success Green**: #1b5e20, #2e7d32

## Interactive States

### Guests Control Buttons

```
Normal State:
┌───┐
│ + │  ← White background, blue border
└───┘

Hover State:
┌───┐
│ + │  ← Blue background, white text
└───┘    (scales to 1.1)

Disabled State:
┌───┐
│ + │  ← Gray border, light gray text
└───┘    (cursor: not-allowed)
```

### Reserve Button

```
Normal State:
╔═══════════════════════════╗
║  RESERVE YOUR PG STAY     ║  ← Gradient blue
╚═══════════════════════════╝

Hover State:
╔═══════════════════════════╗
║  RESERVE YOUR PG STAY     ║  ← Darker gradient
╚═══════════════════════════╝    + shimmer effect
    (elevated with shadow)        + translateY(-2px)

Active State:
╔═══════════════════════════╗
║  RESERVE YOUR PG STAY     ║  ← Returns to normal position
╚═══════════════════════════╝    (translateY(0))
```

## Responsive Breakpoints

### Desktop (> 768px)
- Full-width search bar
- Guests popup: 320px width
- Reserve button: 16px padding
- All animations enabled

### Tablet (768px - 480px)
- Adjusted search bar
- Guests popup: 280px width
- Reserve button: 14px padding
- Reduced button sizes

### Mobile (< 480px)
- Stacked layout
- Guests popup: 240px width
- Reserve button: 12px padding
- Compact controls
- Touch-optimized tap targets

## Animation Timings

- **Popup Fade In**: 0.3s ease-out
- **Button Hover**: 0.3s ease
- **Scroll**: smooth (browser default ~1s)
- **Shimmer Effect**: 0.5s
- **Scale Transform**: 0.2s ease

## Accessibility Features

### Keyboard Navigation
- Tab through all form fields
- Enter to submit search
- Escape to close popups
- Arrow keys in number inputs

### Screen Reader Support
- Semantic HTML structure
- Descriptive labels
- ARIA attributes (recommended for future)
- Focus indicators

### Touch Targets
- Minimum 44x44px for mobile
- Adequate spacing between elements
- Visual feedback on tap

## Dark Mode Toggle

The entire interface automatically adapts when dark mode is activated:

```
Light Mode                    Dark Mode
┌──────────────┐             ┌──────────────┐
│ White BG     │    →        │ Dark BG      │
│ Dark Text    │             │ Light Text   │
│ Blue Accent  │             │ Light Blue   │
└──────────────┘             └──────────────┘
```

All components maintain:
- Proper contrast ratios (WCAG AA)
- Readable text
- Visible borders
- Consistent spacing

## Performance Optimizations

1. **CSS Transforms**: Use GPU acceleration
2. **Will-change**: Applied to animated elements
3. **Smooth Scroll**: Native browser API
4. **Minimal Repaints**: Transform and opacity only
5. **Efficient Selectors**: Class-based styling

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Gradients | ✓ | ✓ | ✓ | ✓ |
| Transforms | ✓ | ✓ | ✓ | ✓ |
| Smooth Scroll | ✓ | ✓ | ✓ | ✓ |
| Grid Layout | ✓ | ✓ | ✓ | ✓ |
| Flexbox | ✓ | ✓ | ✓ | ✓ |

## Testing Checklist

- [ ] Guests popup opens/closes correctly
- [ ] Increment/decrement buttons work
- [ ] Minimum values are enforced
- [ ] Display text updates correctly
- [ ] Search button scrolls to hotel list
- [ ] Reserve button has hover effects
- [ ] Dark mode works for all components
- [ ] Responsive on all screen sizes
- [ ] Keyboard navigation works
- [ ] Touch targets are adequate
- [ ] Animations are smooth
- [ ] No console errors
