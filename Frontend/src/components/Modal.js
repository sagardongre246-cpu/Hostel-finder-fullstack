import { useState } from 'react';

const Modal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in:', formData);
    
    // Mock successful login - replace with actual API call
    if (formData.email && formData.password) {
      const mockUser = {
        id: 1,
        name: formData.email.split('@')[0].charAt(0).toUpperCase() + formData.email.split('@')[0].slice(1),
        email: formData.email,
        photo: null,
        joinDate: new Date().toISOString(),
        phone: '+91 9876543210',
        preferences: {
          currency: 'INR',
          language: 'English',
          notifications: true
        }
      };
      
      if (onLoginSuccess) {
        onLoginSuccess(mockUser);
      }
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${!isOpen ? 'hidden' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2 className="modal-title">
            Sign in or create an account
          </h2>
          <p className="modal-subtitle">
            Get access to exclusive deals and manage your bookings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="modal-input"
            />
          </div>
          
          <div className="modal-input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="modal-input"
            />
          </div>

          <button type="submit" className="modal-submit-btn">
            Sign in
          </button>
        </form>

        <div className="modal-divider">
          <span className="modal-divider-text">or</span>
        </div>

        <button className="modal-google-btn">
          Continue with Google
        </button>

        <div className="modal-footer">
          <p className="modal-terms">
            By signing in or creating an account, you agree with our{' '}
            <a href="/terms" className="modal-link">Terms & Conditions</a> and{' '}
            <a href="/privacy" className="modal-link">Privacy Statement</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;