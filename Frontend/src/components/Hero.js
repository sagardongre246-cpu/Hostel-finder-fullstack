import React, { useState, useRef, useEffect } from 'react';

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  
  const destinationRef = useRef(null);
  const calendarRef = useRef(null);
  const guestsRef = useRef(null);
  
  const indianCities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Jaipur', 'Hyderabad', 
    'Chennai', 'Kolkata', 'Ahmedabad', 'Goa', 'Kochi', 'Agra',
    'Udaipur', 'Varanasi', 'Rishikesh', 'Manali', 'Shimla', 'Darjeeling'
  ];
  
  const filteredCities = indianCities.filter(city =>
    city.toLowerCase().includes(destination.toLowerCase())
  );

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setShowDestinationDropdown(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target)) {
        setShowGuestsPopup(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowDestinationDropdown(false);
        setShowCalendar(false);
        setShowGuestsPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setShowDestinationDropdown(true);
  };

  const selectCity = (city) => {
    setDestination(city);
    setShowDestinationDropdown(false);
  };

  const handleDateSelect = (date) => {
    if (!checkInDate || isSelectingCheckOut) {
      if (!checkInDate) {
        setCheckInDate(date);
        setIsSelectingCheckOut(true);
      } else {
        if (date >= checkInDate) {
          setCheckOutDate(date);
          setIsSelectingCheckOut(false);
          setShowCalendar(false);
        } else {
          setCheckInDate(date);
          setCheckOutDate(null);
          setIsSelectingCheckOut(true);
        }
      }
    } else {
      if (date >= checkInDate) {
        setCheckOutDate(date);
        setShowCalendar(false);
        setIsSelectingCheckOut(false);
      } else {
        setCheckInDate(date);
        setCheckOutDate(null);
        setIsSelectingCheckOut(true);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getDateDisplayText = () => {
    if (checkInDate && checkOutDate) {
      return `${formatDate(checkInDate)} — ${formatDate(checkOutDate)}`;
    } else if (checkInDate) {
      return `${formatDate(checkInDate)} — Check-out`;
    }
    return 'Check-in — Check-out';
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isCheckIn = checkInDate && date.toDateString() === checkInDate.toDateString();
      const isCheckOut = checkOutDate && date.toDateString() === checkOutDate.toDateString();
      const isInRange = checkInDate && checkOutDate && date > checkInDate && date < checkOutDate;
      const isPast = date < today;
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isCheckIn ? 'check-in' : ''} ${isCheckOut ? 'check-out' : ''} ${isInRange ? 'in-range' : ''} ${isPast ? 'past' : ''}`}
          onClick={() => !isPast && handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleSearch = () => {
    console.log('Searching for:', { destination, checkInDate, checkOutDate, adults, children, rooms });
    // Scroll to "More Recommendations in India" section
    const hostelsSection = document.querySelector('.booking-hostels-section');
    if (hostelsSection) {
      hostelsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getGuestsDisplayText = () => {
    return `${adults} adult${adults !== 1 ? 's' : ''} · ${children} child${children !== 1 ? 'ren' : ''} · ${rooms} room${rooms !== 1 ? 's' : ''}`;
  };

  const incrementValue = (setter, value) => {
    setter(value + 1);
  };

  const decrementValue = (setter, value, min = 0) => {
    if (value > min) {
      setter(value - 1);
    }
  };

  return (
    <div className="booking-search-section">
      <div className="booking-search-container">
        <div className="booking-search-form">
          {/* Destination Field */}
          <div className="booking-search-field destination-field" ref={destinationRef}>
            <div className="booking-field-icon">📍</div>
            <div className="booking-field-content">
              <div className="booking-field-label">Destination</div>
              <input
                type="text"
                className="booking-field-input"
                placeholder="Where are you going?"
                value={destination}
                onChange={handleDestinationChange}
                onFocus={() => setShowDestinationDropdown(true)}
              />
            </div>
            <div className="booking-field-arrow" onClick={() => setShowDestinationDropdown(!showDestinationDropdown)}>
              ⬇
            </div>
            
            {showDestinationDropdown && (
              <div className="destination-dropdown">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className="destination-option"
                      onClick={() => selectCity(city)}
                    >
                      📍 {city}
                    </div>
                  ))
                ) : (
                  <div className="destination-option no-results">
                    No cities found
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Calendar Field */}
          <div className="booking-search-field calendar-field" ref={calendarRef}>
            <div className="booking-field-icon">📅</div>
            <div className="booking-field-content" onClick={() => setShowCalendar(!showCalendar)}>
              <div className="booking-field-label">Check-in — Check-out</div>
              <div className="booking-field-value">{getDateDisplayText()}</div>
            </div>
            
            {showCalendar && (
              <div className="calendar-popup">
                <div className="calendar-header">
                  <button className="calendar-nav" onClick={() => navigateMonth(-1)}>‹</button>
                  <div className="calendar-month">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                  <button className="calendar-nav" onClick={() => navigateMonth(1)}>›</button>
                </div>
                {(checkInDate || checkOutDate) && (
                  <div className="calendar-selection-info">
                    <span className="selection-text">
                      {checkInDate && !checkOutDate && isSelectingCheckOut ? 'Select check-out date' : 
                       checkInDate && checkOutDate ? `${formatDate(checkInDate)} — ${formatDate(checkOutDate)}` :
                       checkInDate ? `Check-in: ${formatDate(checkInDate)}` : ''}
                    </span>
                    <button 
                      className="clear-dates-btn" 
                      onClick={() => {
                        setCheckInDate(null);
                        setCheckOutDate(null);
                        setIsSelectingCheckOut(false);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                )}
                <div className="calendar-weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                </div>
                <div className="calendar-grid">
                  {renderCalendar()}
                </div>
              </div>
            )}
          </div>
          
          {/* Guests Field */}
          <div className="booking-search-field guests-field" ref={guestsRef}>
            <div className="booking-field-icon">👥</div>
            <div className="booking-field-content" onClick={() => setShowGuestsPopup(!showGuestsPopup)}>
              <div className="booking-field-label">Guests</div>
              <div className="booking-field-value">{getGuestsDisplayText()}</div>
            </div>
            
            {showGuestsPopup && (
              <div className="guests-popup">
                <div className="guests-option">
                  <div className="guests-option-label">
                    <span className="guests-option-title">Adults</span>
                    <span className="guests-option-subtitle">Age 18+</span>
                  </div>
                  <div className="guests-option-controls">
                    <button 
                      className="guests-control-btn" 
                      onClick={() => decrementValue(setAdults, adults, 1)}
                      disabled={adults <= 1}
                    >
                      −
                    </button>
                    <span className="guests-count">{adults}</span>
                    <button 
                      className="guests-control-btn" 
                      onClick={() => incrementValue(setAdults, adults)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="guests-option">
                  <div className="guests-option-label">
                    <span className="guests-option-title">Children</span>
                    <span className="guests-option-subtitle">Age 0-17</span>
                  </div>
                  <div className="guests-option-controls">
                    <button 
                      className="guests-control-btn" 
                      onClick={() => decrementValue(setChildren, children)}
                      disabled={children <= 0}
                    >
                      −
                    </button>
                    <span className="guests-count">{children}</span>
                    <button 
                      className="guests-control-btn" 
                      onClick={() => incrementValue(setChildren, children)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="guests-option">
                  <div className="guests-option-label">
                    <span className="guests-option-title">Rooms</span>
                    <span className="guests-option-subtitle">Number of rooms</span>
                  </div>
                  <div className="guests-option-controls">
                    <button 
                      className="guests-control-btn" 
                      onClick={() => decrementValue(setRooms, rooms, 1)}
                      disabled={rooms <= 1}
                    >
                      −
                    </button>
                    <span className="guests-count">{rooms}</span>
                    <button 
                      className="guests-control-btn" 
                      onClick={() => incrementValue(setRooms, rooms)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  className="guests-done-btn"
                  onClick={() => setShowGuestsPopup(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>
          
          {/* Search Button */}
          <button className="booking-search-btn" onClick={handleSearch}>
            🔍 Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;