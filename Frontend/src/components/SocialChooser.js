import React, { useState, useEffect, useRef } from 'react';
import './SocialChooser.css';

// Configurable social media profiles
const socialProfiles = {
  instagram: {
    me: "https://www.instagram.com/sagardongre._?igsh=NzZsenlhZnc3MG1x",
    partner: "https://www.instagram.com/instagramuser?igsh=MWxrOG9zOWtqeWI2bg=="
  },
  twitter: {
    me: "https://x.com/Sagardongre9026?t=1RRZLgnKRLVvzZ_lCZel-w&s=09",
    partner: "https://twitter.com/partner_username"
  },
  linkedin: {
    me: "https://www.linkedin.com/in/sagar-dongare-522568377?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    partner: "http://linkedin.com/in/pranchal-tripathi-935b89247"
  },
  github: {
    me: "https://github.com/sagardongre246-cpu",
    partner: "https://github.com/PranchalTripathi"
  },
  whatsapp: {
    me: "https://wa.me/7974753326?text=Hi%20from%20Sagar",
    partner: "https://wa.me/9119847283?text=Hi%20from%20partner"
  }
};

const SocialChooser = ({
  icon,
  children,
  myName = "My Profile",
  partnerName = "Partner Profile",
  onSelection = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const chooserRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const profiles = socialProfiles[icon];

  // Handle click on social icon
  const handleIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setSelectedIndex(0);
  };

  // Handle profile selection
  const handleSelection = React.useCallback((profileType) => {
    const url = profiles[profileType];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');

      // Optional analytics callback
      if (onSelection) {
        onSelection({ platform: icon, profile: profileType, url });
      }
    }
    setIsOpen(false);
  }, [profiles, icon, onSelection]);

  // Close chooser
  const closeChooser = React.useCallback(() => {
    setIsOpen(false);
    // Return focus to trigger
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback((e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeChooser();
        break;
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault();
        setSelectedIndex(prev => prev === 0 ? 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev === 1 ? 0 : 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelection(selectedIndex === 0 ? 'me' : 'partner');
        break;
      default:
        break;
    }
  }, [isOpen, closeChooser, selectedIndex, handleSelection]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && chooserRef.current && !chooserRef.current.contains(e.target)) {
        closeChooser();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      // Focus first option
      setTimeout(() => {
        if (optionRefs.current[0]) {
          optionRefs.current[0].focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedIndex, handleKeyDown, closeChooser]);

  // Focus management for selected option
  useEffect(() => {
    if (isOpen && optionRefs.current[selectedIndex]) {
      optionRefs.current[selectedIndex].focus();
    }
  }, [selectedIndex, isOpen]);

  if (!profiles) {
    // Fallback to original behavior if no profiles configured
    return (
      <div ref={triggerRef}>
        {children}
      </div>
    );
  }

  return (
    <div className="social-chooser-container">
      {/* Social Icon Trigger */}
      <div
        ref={triggerRef}
        onClick={handleIconClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleIconClick(e);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Choose ${icon} profile to open`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {children}
      </div>

      {/* Profile Chooser Modal */}
      {isOpen && (
        <div className="social-chooser-overlay">
          <div
            ref={chooserRef}
            className="social-chooser-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chooser-title"
          >
            <div className="chooser-header">
              <h3 id="chooser-title" className="chooser-title">
                Open Profile
              </h3>
              <button
                className="chooser-close"
                onClick={closeChooser}
                aria-label="Close profile chooser"
              >
                ×
              </button>
            </div>

            <div className="chooser-options">
              <button
                ref={el => optionRefs.current[0] = el}
                className={`chooser-option ${selectedIndex === 0 ? 'selected' : ''}`}
                onClick={() => handleSelection('me')}
                onMouseEnter={() => setSelectedIndex(0)}
              >
                <span className="option-icon">👤</span>
                <span className="option-text">{myName}</span>
              </button>

              <button
                ref={el => optionRefs.current[1] = el}
                className={`chooser-option ${selectedIndex === 1 ? 'selected' : ''}`}
                onClick={() => handleSelection('partner')}
                onMouseEnter={() => setSelectedIndex(1)}
              >
                <span className="option-icon">👥</span>
                <span className="option-text">{partnerName}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialChooser;
export { socialProfiles };