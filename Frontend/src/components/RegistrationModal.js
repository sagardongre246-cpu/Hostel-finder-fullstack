import React, { useState } from 'react';

const RegistrationModal = ({ isOpen, onClose, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    checkIn: '',
    checkOut: '',
    roomType: 'shared',
    budget: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Create user data from form
      const userData = {
        id: Date.now(), // Simple ID generation
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        city: formData.city,
        photo: null,
        joinDate: new Date().toISOString(),
        preferences: {
          currency: 'INR',
          language: 'English',
          notifications: true
        }
      };
      
      // Auto-close after success animation
      setTimeout(() => {
        setIsSuccess(false);
        
        // Call registration success callback
        if (onRegistrationSuccess) {
          onRegistrationSuccess(userData);
        }
        
        onClose();
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          city: '',
          checkIn: '',
          checkOut: '',
          roomType: 'shared',
          budget: '',
          notes: ''
        });
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="registration-modal-overlay" onClick={onClose}>
      <div className="registration-modal-content" onClick={(e) => e.stopPropagation()}>
        {isSuccess ? (
          <div className="success-animation">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <h3>Registration Successful! 🎉</h3>
            <p>Welcome to HostelFinder.com! We'll be in touch soon.</p>
          </div>
        ) : (
          <>
            <div className="registration-modal-header">
              <h2>Join HostelFinder.com</h2>
              <button className="modal-close-btn" onClick={onClose}>✕</button>
            </div>

            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="glow-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email ID *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="glow-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number *</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="glow-input"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="glow-input"
                  >
                    <option value="">Select your city</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bengaluru">Bengaluru</option>
                    <option value="pune">Pune</option>
                    <option value="chennai">Chennai</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="jaipur">Jaipur</option>
                    <option value="kochi">Kochi</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">Check-in Date</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className="glow-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="checkOut">Check-out Date</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className="glow-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="roomType">Room Type</label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="glow-input"
                  >
                    <option value="shared">Shared Dormitory</option>
                    <option value="private">Private Room</option>
                    <option value="deluxe">Deluxe Room</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget (per month)</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="glow-input"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1000">Under ₹1,000</option>
                    <option value="1000-1500">₹1,000 - ₹1,500</option>
                    <option value="1500-2000">₹1,500 - ₹2,000</option>
                    <option value="2000-3000">₹2,000 - ₹3,000</option>
                    <option value="above-3000">Above ₹3,000</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes">Special Requirements / Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="glow-input"
                  placeholder="Any special requirements or preferences..."
                  rows="3"
                />
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;