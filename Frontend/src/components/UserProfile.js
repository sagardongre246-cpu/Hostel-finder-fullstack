import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { bookings, users } from '../services/api';

const UserProfile = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // Load user bookings when component mounts
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoadingBookings(true);
      try {
        const response = await bookings.getMyBookings();
        if (response.ok) {
          const data = await response.json();
          setBookingHistory(data.bookings || []);
        } else {
          console.error('Failed to load bookings');
          // Fallback to mock data
          setBookingHistory([
            {
              id: 1,
              hostelName: 'GoNest Hostel Bengaluru',
              location: 'Koramangala, Bengaluru',
              checkIn: '2024-11-15',
              checkOut: '2024-11-20',
              status: 'Completed',
              price: '₹7,500'
            },
            {
              id: 2,
              hostelName: 'Mumbai Central PG',
              location: 'Andheri West, Mumbai',
              checkIn: '2024-12-01',
              checkOut: '2024-12-05',
              status: 'Upcoming',
              price: '₹9,000'
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading bookings:', error);
        // Fallback to mock data
        setBookingHistory([
          {
            id: 1,
            hostelName: 'GoNest Hostel Bengaluru',
            location: 'Koramangala, Bengaluru',
            checkIn: '2024-11-15',
            checkOut: '2024-11-20',
            status: 'Completed',
            price: '₹7,500'
          },
          {
            id: 2,
            hostelName: 'Mumbai Central PG',
            location: 'Andheri West, Mumbai',
            checkIn: '2024-12-01',
            checkOut: '2024-12-05',
            status: 'Upcoming',
            price: '₹9,000'
          }
        ]);
      } finally {
        setIsLoadingBookings(false);
      }
    };

    if (activeTab === 'bookings' || activeTab === 'overview') {
      loadBookings();
    }
  }, [activeTab]);

  // Mock saved hostels
  const savedHostels = [
    {
      id: 1,
      name: 'Pink City Hostel Jaipur',
      location: 'C-Scheme, Jaipur',
      price: '₹1,700',
      rating: 8.8,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Seaside Hostel Goa',
      location: 'Calangute Beach, Goa',
      price: '₹1,900',
      rating: 9.0,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="user-profile-modal-overlay" onClick={onClose}>
      <div className="user-profile-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="user-profile-header">
          <div className="user-profile-header-content">
            <div className="user-profile-avatar-large">
              {user.photo ? (
                <img src={user.photo} alt={user.name} />
              ) : (
                <div className="user-profile-avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="user-profile-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <div className="user-profile-badges">
                <span className="profile-badge">✓ Verified</span>
                <span className="profile-badge">🌟 Member since {new Date(user.joinDate || Date.now()).getFullYear()}</span>
              </div>
            </div>
          </div>
          <button className="user-profile-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="user-profile-tabs">
          <button
            className={`user-profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={`user-profile-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            📅 Bookings
          </button>
          <button
            className={`user-profile-tab ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            ❤️ Saved
          </button>
          <button
            className={`user-profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Content */}
        <div className="user-profile-body">
          {activeTab === 'overview' && (
            <div className="profile-overview">
              <div className="profile-stats">
                <div className="profile-stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <h3>{bookingHistory.length}</h3>
                    <p>Total Bookings</p>
                  </div>
                </div>
                <div className="profile-stat-card">
                  <div className="stat-icon">❤️</div>
                  <div className="stat-content">
                    <h3>{savedHostels.length}</h3>
                    <p>Saved Hostels</p>
                  </div>
                </div>
                <div className="profile-stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <h3>4.8</h3>
                    <p>Guest Rating</p>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">✓</span>
                    <div className="activity-content">
                      <p className="activity-title">Booking Confirmed</p>
                      <p className="activity-subtitle">Mumbai Central PG - Dec 1, 2024</p>
                    </div>
                    <span className="activity-time">2 days ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">❤️</span>
                    <div className="activity-content">
                      <p className="activity-title">Saved Hostel</p>
                      <p className="activity-subtitle">Seaside Hostel Goa</p>
                    </div>
                    <span className="activity-time">5 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="profile-bookings">
              <h3>Booking History</h3>
              {isLoadingBookings ? (
                <div className="loading-bookings">
                  <p>Loading your bookings...</p>
                </div>
              ) : (
                <div className="bookings-list">
                  {bookingHistory.length > 0 ? bookingHistory.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <h4>{booking.hostelName}</h4>
                      <span className={`booking-status ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="booking-details">
                      <p className="booking-location">📍 {booking.location}</p>
                      <p className="booking-dates">
                        📅 {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                      <p className="booking-price">💰 {booking.price}</p>
                    </div>
                    <div className="booking-actions">
                      {booking.status === 'Upcoming' && (
                        <>
                          <button className="booking-action-btn primary">View Details</button>
                          <button className="booking-action-btn secondary">Cancel</button>
                        </>
                      )}
                      {booking.status === 'Completed' && (
                        <button className="booking-action-btn primary">Write Review</button>
                      )}
                    </div>
                  </div>
                  )) : (
                    <div className="no-bookings">
                      <p>No bookings found. Start exploring hostels to make your first booking!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="profile-saved">
              <h3>Saved Hostels</h3>
              <div className="saved-hostels-grid">
                {savedHostels.map((hostel) => (
                  <div key={hostel.id} className="saved-hostel-card">
                    <div className="saved-hostel-image" style={{ backgroundImage: `url(${hostel.image})` }}>
                      <button className="unsave-btn">❤️</button>
                    </div>
                    <div className="saved-hostel-content">
                      <h4>{hostel.name}</h4>
                      <p className="saved-hostel-location">📍 {hostel.location}</p>
                      <div className="saved-hostel-footer">
                        <span className="saved-hostel-rating">⭐ {hostel.rating}</span>
                        <span className="saved-hostel-price">{hostel.price}/night</span>
                      </div>
                      <button className="saved-hostel-book-btn">Book Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="profile-settings">
              <h3>Account Settings</h3>
              
              <div className="settings-section">
                <h4>Personal Information</h4>
                <div className="settings-form">
                  <div className="settings-field">
                    <label>Full Name</label>
                    <input type="text" defaultValue={user.name} />
                  </div>
                  <div className="settings-field">
                    <label>Email</label>
                    <input type="email" defaultValue={user.email} readOnly />
                  </div>
                  <div className="settings-field">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h4>Preferences</h4>
                <div className="settings-toggles">
                  <div className="settings-toggle">
                    <span>Email Notifications</span>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-toggle">
                    <span>SMS Notifications</span>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-toggle">
                    <span>Marketing Emails</span>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h4>Security</h4>
                <button className="settings-btn">Change Password</button>
                <button className="settings-btn">Two-Factor Authentication</button>
              </div>

              <div className="settings-section danger-zone">
                <h4>Danger Zone</h4>
                <button className="settings-btn danger">Delete Account</button>
              </div>

              <div className="settings-actions">
                <button className="settings-save-btn">Save Changes</button>
                <button className="settings-cancel-btn" onClick={onClose}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
