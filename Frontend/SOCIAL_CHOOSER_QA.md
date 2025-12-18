# Social Media Profile Chooser - QA Testing Guide

## ✅ Implementation Complete

### 📁 Files Created/Modified:
1. **SocialChooser.js** - Main React component with profile selection logic
2. **SocialChooser.css** - Professional styling with animations and responsive design
3. **Footer.js** - Updated to use SocialChooser for all social media icons
4. **socialProfiles object** - Configurable URLs for easy customization

### 🧪 Manual QA Testing Steps:

#### Test 1: Basic Functionality
1. **Open the website** and scroll to the footer
2. **Click any social media icon** (Instagram, Twitter, LinkedIn, GitHub, WhatsApp)
3. **Verify**: A modal appears with "Open Profile" title and two options:
   - "Sagar" (your profile)
   - "Partner" (partner profile)

#### Test 2: Profile Selection
1. **Click "Sagar"** option
2. **Verify**: Opens your actual social media profile in a new tab
3. **Click "Partner"** option  
4. **Verify**: Opens partner's profile in a new tab (placeholder URLs for now)

#### Test 3: Keyboard Navigation
1. **Tab to a social icon** and press Enter/Space
2. **Use Arrow keys** or Tab to navigate between options
3. **Press Enter** to select an option
4. **Press Escape** to close the modal
5. **Verify**: Focus returns to the original icon

#### Test 4: Click Outside to Close
1. **Click a social icon** to open chooser
2. **Click anywhere outside** the modal
3. **Verify**: Modal closes and focus returns to icon

#### Test 5: Mobile Responsiveness
1. **Open on mobile device** or resize browser to mobile width
2. **Click social icons**
3. **Verify**: Modal appears as bottom sheet style on mobile
4. **Verify**: Touch interactions work properly

#### Test 6: Accessibility
1. **Use screen reader** to test ARIA labels
2. **Verify**: Proper focus management and keyboard navigation
3. **Check**: High contrast mode support

### 🔧 Customization Guide:

#### Update Profile URLs:
Edit the `socialProfiles` object in `SocialChooser.js`:

```javascript
const socialProfiles = {
  instagram: {
    me: "YOUR_INSTAGRAM_URL",
    partner: "PARTNER_INSTAGRAM_URL"
  },
  // ... update other platforms
};
```

#### Change Display Names:
Update the Footer.js props:
```javascript
<SocialChooser 
  icon="instagram" 
  myName="Your Name" 
  partnerName="Partner Name"
>
```

### 🎯 Features Implemented:

✅ **Reusable Component**: SocialChooser wraps any social icon  
✅ **Configurable URLs**: Easy to update via socialProfiles object  
✅ **Professional Animations**: 180-220ms smooth transitions  
✅ **Mobile Responsive**: Bottom sheet on mobile, centered modal on desktop  
✅ **Full Accessibility**: ARIA roles, focus management, keyboard navigation  
✅ **Click Outside**: Closes modal when clicking outside  
✅ **Escape Key**: Closes modal and returns focus  
✅ **Visual Consistency**: Matches existing footer blue/white theme  
✅ **Analytics Ready**: Optional onSelection callback for tracking  

### 🐛 Troubleshooting:

**Issue**: Modal doesn't appear  
**Solution**: Check browser console for errors, ensure SocialChooser.css is imported

**Issue**: URLs don't open  
**Solution**: Verify socialProfiles object has correct URLs for the platform

**Issue**: Keyboard navigation not working  
**Solution**: Ensure focus is properly set, check for JavaScript errors

### 📊 Browser Support:
- ✅ Chrome 80+
- ✅ Firefox 75+  
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### 🔍 Console Logging:
The component logs selection events to console for debugging:
```
Selected: {platform: "instagram", profile: "me", url: "https://..."}
```

This implementation provides a professional, accessible, and user-friendly way to choose between multiple social media profiles while maintaining the existing visual design of your footer.