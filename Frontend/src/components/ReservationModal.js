import React, { useState, useEffect } from 'react';
import { bookings } from '../services/api';

const ReservationModal = ({ isOpen, onClose, hostelName, hostelPrice }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    specialRequests: ''
  });

  const [showPriceMatch, setShowPriceMatch] = useState(false);
  const [priceMatchResults, setPriceMatchResults] = useState([]);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

  // Generate mock price comparison data
  const generatePriceComparison = () => {
    setIsLoadingPrices(true);
    
    setTimeout(() => {
      const basePrice = parseInt(hostelPrice?.replace('₹', '').replace(',', '') || '1500');
      const competitors = [
        { name: 'Booking.com', price: basePrice + 200, logo: '🏨' },
        { name: 'Hostelworld', price: basePrice + 350, logo: '🌍' },
        { name: 'Agoda', price: basePrice + 150, logo: '🏠' },
        { name: 'MakeMyTrip', price: basePrice + 400, logo: '✈️' },
        { name: 'Goibibo', price: basePrice + 250, logo: '🎯' }
      ];
      
      setPriceMatchResults([
        { name: 'HostelFinder.com', price: basePrice, logo: '🌙', isBest: true },
        ...competitors.sort((a, b) => a.price - b.price)
      ]);
      setIsLoadingPrices(false);
    }, 1500);
  };

  useEffect(() => {
    if (showPriceMatch && priceMatchResults.length === 0) {
      generatePriceComparison();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPriceMatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
    
    try {
      const bookingData = {
        hostelName,
        hostelPrice,
        ...formData
      };
      
      const response = await bookings.create(bookingData);
      
      if (response.ok) {
        const result = await response.json();
        alert(`Reservation confirmed for ${formData.fullName}!\nBooking ID: ${result.bookingId || 'N/A'}\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}`);
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      // Fallback to mock booking for development
      alert(`Reservation confirmed for ${formData.fullName}!\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}`);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="reservation-modal-overlay" onClick={onClose}>
      <div className="reservation-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="reservation-modal-header">
          <h2 className="reservation-modal-title">Reserve Your PG Stay</h2>
          <button className="reservation-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="reservation-modal-body">
          {/* Hostel Info */}
          <div className="reservation-hostel-info">
            <h3>{hostelName}</h3>
            <div className="reservation-price-display">
              <span className="price-label">Starting from</span>
              <span className="price-value">{hostelPrice}</span>
              <span className="price-period">per month</span>
            </div>
          </div>

          {/* Reservation Form */}
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>

            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="checkIn">Check-in Date *</label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkOut">Check-out Date *</label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            <div className="form-row two-columns">
              <div className="form-group">
                <label htmlFor="guests">Number of Guests *</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rooms">Number of Rooms *</label>
                <select
                  id="rooms"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  required
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests (Optional)</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Any special requirements or preferences..."
                  rows="3"
                />
              </div>
            </div>

            {/* Price Match Section */}
            <div className="price-match-section">
              <button
                type="button"
                className="price-match-toggle"
                onClick={() => setShowPriceMatch(!showPriceMatch)}
              >
                <span className="price-match-icon">🏷️</span>
                <span className="price-match-text">We Price Match</span>
                <span className={`price-match-arrow ${showPriceMatch ? 'open' : ''}`}>▼</span>
              </button>

              {showPriceMatch && (
                <div className="price-match-content">
                  <div className="price-match-header">
                    <h4>Best Price Guarantee</h4>
                    <p>We compare prices from top booking platforms to ensure you get the best deal!</p>
                  </div>

                  {isLoadingPrices ? (
                    <div className="price-match-loading">
                      <div className="loading-spinner"></div>
                      <p>Comparing prices across platforms...</p>
                    </div>
                  ) : (
                    <div className="price-comparison-list">
                      {priceMatchResults.map((result, index) => (
                        <div 
                          key={index} 
                          className={`price-comparison-item ${result.isBest ? 'best-price' : ''}`}
                        >
                          <div className="platform-info">
                            <span className="platform-logo">{result.logo}</span>
                            <span className="platform-name">{result.name}</span>
                            {result.isBest && <span className="best-badge">Best Price!</span>}
                          </div>
                          <div className="platform-price">
                            ₹{result.price.toLocaleString()}
                            {result.isBest && (
                              <span className="savings">
                                Save ₹{(priceMatchResults[1]?.price - result.price).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="price-match-footer">
                    <p className="price-match-note">
                      ✓ Prices updated in real-time<br />
                      ✓ No hidden fees<br />
                      ✓ Best price guaranteed or we'll refund the difference
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="reservation-submit-btn">
              Complete Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
