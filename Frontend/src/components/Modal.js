import { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${!isOpen ? 'hidden' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div style={{textAlign: 'center', marginBottom: '24px'}}>
          <h2 style={{color: '#003580', fontSize: '24px', fontWeight: '600', marginBottom: '8px'}}>
            Sign in or create an account
          </h2>
          <p style={{color: '#6b6b6b', fontSize: '14px'}}>
            Get access to exclusive deals and manage your bookings
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #bdbdbd',
                borderRadius: '3px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #bdbdbd',
                borderRadius: '3px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              background: '#0071c2',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              padding: '12px 16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sign in
          </button>
        </form>

        <div style={{textAlign: 'center', margin: '16px 0'}}>
          <span style={{color: '#6b6b6b', fontSize: '14px'}}>or</span>
        </div>

        <button style={{
          width: '100%',
          background: 'transparent',
          border: '1px solid #0071c2',
          color: '#0071c2',
          borderRadius: '3px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '16px'
        }}>
          Continue with Google
        </button>

        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: '12px', color: '#6b6b6b', lineHeight: '1.4'}}>
            By signing in or creating an account, you agree with our{' '}
            <a href="/terms" style={{color: '#0071c2'}}>Terms & Conditions</a> and{' '}
            <a href="/privacy" style={{color: '#0071c2'}}>Privacy Statement</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;