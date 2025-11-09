import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [activeCategory, setActiveCategory] = useState('Stays');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ name: 'India', flag: '🇮🇳', currency: 'INR' });
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Auto-detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check for logged-in user (mock - replace with actual auth)
  useEffect(() => {
    // Simulate checking for logged-in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock login function (for demonstration)
  const handleMockLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowProfileMenu(false);
  };

  // Apply theme to body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  // Countries with flags and currencies
  const countries = [
    { name: 'India', flag: '🇮🇳', currency: 'INR' },
    { name: 'United States', flag: '🇺🇸', currency: 'USD' },
    { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
    { name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
    { name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
    { name: 'Germany', flag: '🇩🇪', currency: 'EUR' },
    { name: 'France', flag: '🇫🇷', currency: 'EUR' },
    { name: 'Japan', flag: '🇯🇵', currency: 'JPY' },
    { name: 'China', flag: '🇨🇳', currency: 'CNY' },
    { name: 'Singapore', flag: '🇸🇬', currency: 'SGD' },
    { name: 'Thailand', flag: '🇹🇭', currency: 'THB' },
    { name: 'Malaysia', flag: '🇲🇾', currency: 'MYR' },
    { name: 'Indonesia', flag: '🇮🇩', currency: 'IDR' },
    { name: 'South Korea', flag: '🇰🇷', currency: 'KRW' },
    { name: 'Brazil', flag: '🇧🇷', currency: 'BRL' },
    { name: 'Mexico', flag: '🇲🇽', currency: 'MXN' },
    { name: 'Argentina', flag: '🇦🇷', currency: 'ARS' },
    { name: 'South Africa', flag: '🇿🇦', currency: 'ZAR' },
    { name: 'UAE', flag: '🇦🇪', currency: 'AED' },
    { name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR' },
    { name: 'Turkey', flag: '🇹🇷', currency: 'TRY' },
    { name: 'Russia', flag: '🇷🇺', currency: 'RUB' },
    { name: 'Italy', flag: '🇮🇹', currency: 'EUR' },
    { name: 'Spain', flag: '🇪🇸', currency: 'EUR' },
    { name: 'Netherlands', flag: '🇳🇱', currency: 'EUR' },
    { name: 'Switzerland', flag: '🇨🇭', currency: 'CHF' },
    { name: 'Sweden', flag: '🇸🇪', currency: 'SEK' },
    { name: 'Norway', flag: '🇳🇴', currency: 'NOK' },
    { name: 'Denmark', flag: '🇩🇰', currency: 'DKK' },
    { name: 'Poland', flag: '🇵🇱', currency: 'PLN' }
  ];

  // Languages
  const languages = [
    'English', 'Hindi', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Russian', 'Japanese', 'Korean', 'Chinese (Simplified)', 'Chinese (Traditional)',
    'Arabic', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Polish', 'Turkish',
    'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Tamil', 'Telugu', 'Bengali',
    'Marathi', 'Gujarati', 'Punjabi', 'Urdu'
  ];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleApplySettings = () => {
    // Save settings (you can add localStorage or API call here)
    setIsCurrencyModalOpen(false);
  };

  const categories = [
    { id: 'stays', name: 'Stays', icon: '🏨' },
    { id: 'flights', name: 'Flights', icon: '✈️' },
    { id: 'packages', name: 'Flight + Hostel', icon: '🎯' },
    { id: 'cars', name: 'Car rental', icon: '🚗' },
    { id: 'attractions', name: 'Attractions', icon: '🎪' },
    { id: 'taxis', name: 'Airport taxis', icon: '🚕' }
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    setModalContent(generateCategoryContent(category));
    setIsModalOpen(true);
  };

  const generateCategoryContent = (category) => {
    switch (category.id) {
      case 'stays':
        return {
          title: 'Find Your Perfect Stay',
          content: (
            <div className="category-content stays-content">
              <div className="ai-search-section">
                <h3>🤖 AI-Powered Search</h3>
                <div className="smart-search-bar">
                  <input 
                    type="text" 
                    placeholder="Tell AI where you want to stay... (e.g., 'Budget hostel near IT hubs in Bengaluru')"
                    className="ai-search-input"
                  />
                  <button className="ai-search-btn">🔍 AI Search</button>
                </div>
              </div>
              
              <div className="filters-section">
                <h3>Quick Filters</h3>
                <div className="filter-chips">
                  <span className="filter-chip">Mumbai</span>
                  <span className="filter-chip">Delhi</span>
                  <span className="filter-chip">Bengaluru</span>
                  <span className="filter-chip">Under ₹2000</span>
                  <span className="filter-chip">WiFi + AC</span>
                </div>
              </div>

              <div className="recommended-section">
                <h3>🎯 Recommended by AI</h3>
                <div className="recommendation-grid">
                  <div className="recommendation-card">
                    <div className="rec-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80)'}}></div>
                    <div className="rec-content">
                      <h4>Mumbai Central PG</h4>
                      <p>Andheri West • ⭐ 8.7</p>
                      <span className="rec-price">₹1,800/night</span>
                    </div>
                  </div>
                  <div className="recommendation-card">
                    <div className="rec-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80)'}}></div>
                    <div className="rec-content">
                      <h4>GoNest Hostel Bengaluru</h4>
                      <p>Koramangala • ⭐ 8.2</p>
                      <span className="rec-price">₹1,500/night</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        };
      
      case 'flights':
        return {
          title: 'Book Your Flight',
          content: (
            <div className="category-content flights-content">
              <div className="flight-search-form">
                <div className="flight-inputs">
                  <div className="flight-input-group">
                    <label>From</label>
                    <input type="text" placeholder="Delhi (DEL)" className="flight-input" />
                  </div>
                  <div className="flight-input-group">
                    <label>To</label>
                    <input type="text" placeholder="Mumbai (BOM)" className="flight-input" />
                  </div>
                  <div className="flight-input-group">
                    <label>Date</label>
                    <input type="date" className="flight-input" />
                  </div>
                  <div className="flight-input-group">
                    <label>Passengers</label>
                    <select className="flight-input">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                    </select>
                  </div>
                </div>
                <button className="flight-search-btn">🔍 Search Flights</button>
              </div>

              <div className="recommended-section">
                <h3>🎯 Trending Routes</h3>
                <div className="flight-routes">
                  <div className="route-card">
                    <span className="route">Delhi → Mumbai</span>
                    <span className="route-price">from ₹4,500</span>
                  </div>
                  <div className="route-card">
                    <span className="route">Bengaluru → Goa</span>
                    <span className="route-price">from ₹3,200</span>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case 'packages':
        return {
          title: 'Flight + Hostel Combos',
          content: (
            <div className="category-content packages-content">
              <div className="combo-layout">
                <div className="combo-left">
                  <h3>✈️ Flights</h3>
                  <div className="mini-flight-search">
                    <input type="text" placeholder="From" />
                    <input type="text" placeholder="To" />
                    <input type="date" />
                  </div>
                </div>
                <div className="combo-right">
                  <h3>🏨 Hostels</h3>
                  <div className="mini-hostel-search">
                    <input type="text" placeholder="City" />
                    <input type="date" placeholder="Check-in" />
                    <input type="date" placeholder="Check-out" />
                  </div>
                </div>
              </div>

              <div className="ai-deals-section">
                <h3>🤖 AI Smart Deals</h3>
                <div className="deal-cards">
                  <div className="deal-card">
                    <h4>Mumbai → Manali Adventure</h4>
                    <p>Flight + 3 nights hostel</p>
                    <span className="deal-price">₹7,999 <small>(Save ₹2,000)</small></span>
                  </div>
                  <div className="deal-card">
                    <h4>Delhi → Goa Beach Escape</h4>
                    <p>Flight + 4 nights beachside hostel</p>
                    <span className="deal-price">₹9,499 <small>(Save ₹2,500)</small></span>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case 'cars':
        return {
          title: 'Rent a Car',
          content: (
            <div className="category-content cars-content">
              <div className="car-search-form">
                <div className="car-inputs">
                  <div className="car-input-group">
                    <label>Pickup Location</label>
                    <input type="text" placeholder="Mumbai Airport" className="car-input" />
                  </div>
                  <div className="car-input-group">
                    <label>Drop Location</label>
                    <input type="text" placeholder="Same as pickup" className="car-input" />
                  </div>
                  <div className="car-input-group">
                    <label>Pickup Date</label>
                    <input type="date" className="car-input" />
                  </div>
                  <div className="car-input-group">
                    <label>Car Type</label>
                    <select className="car-input">
                      <option>Economy</option>
                      <option>Compact</option>
                      <option>SUV</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="recommended-section">
                <h3>🎯 Top Rated Rentals</h3>
                <div className="car-grid">
                  <div className="car-card">
                    <div className="car-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80)'}}></div>
                    <h4>Maruti Swift</h4>
                    <p>⭐ 4.5 • Economy</p>
                    <span className="car-price">₹1,200/day</span>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case 'attractions':
        return {
          title: 'Discover Attractions',
          content: (
            <div className="category-content attractions-content">
              <div className="attractions-search">
                <input type="text" placeholder="Search attractions by city..." className="attraction-search-input" />
              </div>

              <div className="recommended-section">
                <h3>🎯 Trending Attractions</h3>
                <div className="attractions-grid">
                  <div className="attraction-card">
                    <div className="attraction-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80)'}}></div>
                    <div className="attraction-content">
                      <h4>Red Fort</h4>
                      <p>Delhi • Historical Monument</p>
                      <span className="attraction-rating">⭐ 4.6</span>
                    </div>
                  </div>
                  <div className="attraction-card">
                    <div className="attraction-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80)'}}></div>
                    <div className="attraction-content">
                      <h4>Gateway of India</h4>
                      <p>Mumbai • Landmark</p>
                      <span className="attraction-rating">⭐ 4.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case 'taxis':
        return {
          title: 'Airport Taxis',
          content: (
            <div className="category-content taxis-content">
              <div className="taxi-search-form">
                <div className="taxi-inputs">
                  <div className="taxi-input-group">
                    <label>Pickup</label>
                    <input type="text" placeholder="Mumbai Airport (BOM)" className="taxi-input" />
                  </div>
                  <div className="taxi-input-group">
                    <label>Drop</label>
                    <input type="text" placeholder="Enter destination" className="taxi-input" />
                  </div>
                  <div className="taxi-input-group">
                    <label>Date & Time</label>
                    <input type="datetime-local" className="taxi-input" />
                  </div>
                  <div className="taxi-input-group">
                    <label>Vehicle Type</label>
                    <select className="taxi-input">
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Luxury</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="recommended-section">
                <h3>🎯 Best Routes & Prices</h3>
                <div className="taxi-routes">
                  <div className="taxi-route-card">
                    <span className="route">Mumbai Airport → Andheri</span>
                    <span className="route-time">25 mins</span>
                    <span className="route-price">₹450</span>
                  </div>
                  <div className="taxi-route-card">
                    <span className="route">Delhi Airport → CP</span>
                    <span className="route-time">45 mins</span>
                    <span className="route-price">₹650</span>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      default:
        return { title: 'Coming Soon', content: <div>Feature coming soon!</div> };
    }
  };

  const handleRegisterClick = () => {
    setIsModalOpen(false);
    if (onRegisterClick) onRegisterClick();
  };

  const handleSignInClick = () => {
    setIsModalOpen(false);
    if (onLoginClick) onLoginClick();
  };

  return (
    <>
      <header className={`booking-header ${isDarkMode ? 'dark' : ''}`}>
        <nav className="booking-nav">
          <div className="booking-left-section">
            <button 
              className="booking-theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a href="/" className="booking-logo">HostelFinder.com</a>
          </div>
          
          <div className="booking-nav-items">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`booking-nav-item ${activeCategory === category.name ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
          
          <div className="booking-user-section">
            <button 
              className="booking-currency-dropdown"
              onClick={() => setIsCurrencyModalOpen(true)}
            >
              <span className="currency-flag">{selectedCountry.flag}</span>
              <span className="currency-text">{selectedCountry.currency}</span>
              <span className="currency-arrow">⌄</span>
            </button>
            
            {user ? (
              <div className="user-profile-container">
                <div 
                  className="user-profile-icon"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  title={`${user.name}'s Profile`}
                >
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="user-avatar-img" />
                  ) : (
                    <div className="user-avatar-placeholder">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="user-status-indicator"></div>
                </div>

                {showProfileMenu && (
                  <div className="user-profile-dropdown">
                    <div className="profile-dropdown-header">
                      <div className="profile-dropdown-avatar">
                        {user.photo ? (
                          <img src={user.photo} alt={user.name} />
                        ) : (
                          <div className="profile-dropdown-avatar-placeholder">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="profile-dropdown-info">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="profile-dropdown-menu">
                      <button 
                        className="profile-dropdown-item"
                        onClick={() => {
                          setIsProfileOpen(true);
                          setShowProfileMenu(false);
                        }}
                      >
                        <span className="dropdown-icon">👤</span>
                        My Profile
                      </button>
                      <button className="profile-dropdown-item">
                        <span className="dropdown-icon">📅</span>
                        My Bookings
                      </button>
                      <button className="profile-dropdown-item">
                        <span className="dropdown-icon">❤️</span>
                        Saved Hostels
                      </button>
                      <button className="profile-dropdown-item">
                        <span className="dropdown-icon">⚙️</span>
                        Settings
                      </button>
                      <div className="profile-dropdown-divider"></div>
                      <button 
                        className="profile-dropdown-item logout"
                        onClick={handleLogout}
                      >
                        <span className="dropdown-icon">🚪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button className="booking-login-create-btn" onClick={handleRegisterClick}>
                Login or Create Account
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Category Modal */}
      {isModalOpen && modalContent && (
        <div className="category-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="category-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="category-modal-header">
              <h2 className="category-modal-title">{modalContent.title}</h2>
              <button 
                className="category-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="category-modal-body">
              {modalContent.content}
            </div>
          </div>
        </div>
      )}

      {/* Currency & Language Selection Modal */}
      {isCurrencyModalOpen && (
        <div className="currency-modal-overlay" onClick={() => setIsCurrencyModalOpen(false)}>
          <div className="currency-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="currency-modal-header">
              <h2 className="currency-modal-title">Select your preferences</h2>
              <button 
                className="currency-modal-close"
                onClick={() => setIsCurrencyModalOpen(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="currency-modal-body">
              <div className="currency-form-section">
                <label className="currency-label">Country</label>
                <div className="currency-dropdown-container">
                  <select 
                    className="currency-select"
                    value={selectedCountry.name}
                    onChange={(e) => {
                      const country = countries.find(c => c.name === e.target.value);
                      handleCountrySelect(country);
                    }}
                  >
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="currency-form-section">
                <label className="currency-label">Currency</label>
                <div className="currency-dropdown-container">
                  <input 
                    type="text" 
                    className="currency-input-readonly"
                    value={selectedCountry.currency}
                    readOnly
                  />
                </div>
              </div>

              <div className="currency-form-section">
                <label className="currency-label">Language</label>
                <div className="currency-dropdown-container">
                  <select 
                    className="currency-select"
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageSelect(e.target.value)}
                  >
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="currency-apply-btn" onClick={handleApplySettings}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {isProfileOpen && user && (
        <UserProfile 
          user={user} 
          onClose={() => setIsProfileOpen(false)} 
        />
      )}

      {/* Demo Login Button (Remove in production) */}
      {!user && (
        <button 
          className="demo-login-btn"
          onClick={() => handleMockLogin({
            name: 'John Doe',
            email: 'john.doe@example.com',
            photo: 'https://i.pravatar.cc/150?img=12',
            joinDate: '2024-01-15'
          })}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            padding: '10px 20px',
            background: '#0071c2',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            zIndex: 9999
          }}
        >
          Demo Login
        </button>
      )}
    </>
  );
};

export default Navbar;