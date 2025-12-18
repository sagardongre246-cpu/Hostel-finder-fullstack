import React, { useState, useEffect, useRef } from 'react';

const Map = ({ currentHotel }) => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading] = useState(false);
  const mapRef = useRef(null);
  const expandedMapRef = useRef(null);

  // Comprehensive hotel data with coordinates and nearby attractions
  const hotelData = {
    'GoNest Hostel Bengaluru': {
      name: 'GoNest Hostel Bengaluru - Koramangala',
      address: '123 5th Block, Koramangala, Bengaluru 560095',
      coordinates: { lat: 12.9352, lng: 77.6245 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4!2d77.6245!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjciTiA3N8KwMzc0MjcuMiJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin',
      nearbyAttractions: [
        { name: 'Forum Mall', distance: '5 minutes walk', icon: '🛍️', type: 'shopping', color: '#0071c2' },
        { name: 'Koramangala Metro', distance: '8 minutes walk', icon: '🚇', type: 'transport', color: '#febb02' },
        { name: 'BDA Complex', distance: '3 minutes walk', icon: '🏢', type: 'business', color: '#00d4aa' },
        { name: 'Jyoti Nivas College', distance: '10 minutes walk', icon: '🎓', type: 'education', color: '#ff6b6b' },
        { name: 'Lalbagh Botanical Garden', distance: '15 minutes drive', icon: '🌳', type: 'nature', color: '#51cf66' },
        { name: 'Bangalore Palace', distance: '20 minutes drive', icon: '🏰', type: 'heritage', color: '#845ef7' }
      ]
    },
    'Mumbai Central PG': {
      name: 'Mumbai Central PG',
      address: '456 SV Road, Andheri West, Mumbai 400058',
      coordinates: { lat: 19.1136, lng: 72.8697 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.8!2d72.8697!3d19.1136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA2JzQ5LjAiTiA3MsKwNTInMTAuOSJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin',
      nearbyAttractions: [
        { name: 'Andheri Metro Station', distance: '3 minutes walk', icon: '🚇', type: 'transport', color: '#febb02' },
        { name: 'Infiniti Mall', distance: '10 minutes walk', icon: '🛍️', type: 'shopping', color: '#0071c2' },
        { name: 'Juhu Beach', distance: '15 minutes drive', icon: '🏖️', type: 'beach', color: '#339af0' },
        { name: 'Film City', distance: '20 minutes drive', icon: '🎬', type: 'entertainment', color: '#ff6b6b' },
        { name: 'Powai Lake', distance: '25 minutes drive', icon: '🌊', type: 'nature', color: '#51cf66' },
        { name: 'Bandra-Worli Sea Link', distance: '30 minutes drive', icon: '🌉', type: 'landmark', color: '#845ef7' }
      ]
    },
    'CityStay PG Delhi': {
      name: 'CityStay PG Delhi',
      address: '789 Ring Road, Lajpat Nagar IV, Delhi 110024',
      coordinates: { lat: 28.6448, lng: 77.2167 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2!2d77.2167!3d28.6448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzQxLjMiTiA3N8KwMTMnMDAuMSJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin',
      nearbyAttractions: [
        { name: 'Lajpat Nagar Metro', distance: '2 minutes walk', icon: '🚇', type: 'transport', color: '#febb02' },
        { name: 'Central Market', distance: '5 minutes walk', icon: '🛍️', type: 'shopping', color: '#0071c2' },
        { name: 'Lotus Temple', distance: '15 minutes drive', icon: '🏛️', type: 'heritage', color: '#845ef7' },
        { name: 'India Gate', distance: '20 minutes drive', icon: '🏛️', type: 'monument', color: '#ff6b6b' },
        { name: 'Humayun\'s Tomb', distance: '10 minutes drive', icon: '🏰', type: 'heritage', color: '#51cf66' },
        { name: 'Khan Market', distance: '18 minutes drive', icon: '🛒', type: 'market', color: '#00d4aa' }
      ]
    },
    'Backpackers Paradise Pune': {
      name: 'Backpackers Paradise Pune',
      address: '321 Paud Road, Kothrud, Pune 411038',
      coordinates: { lat: 18.5074, lng: 73.8077 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2!2d73.8077!3d18.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMwJzI2LjYiTiA3M8KwNDgnMjcuNyJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin',
      nearbyAttractions: [
        { name: 'Kothrud Bus Stand', distance: '5 minutes walk', icon: '🚌', type: 'transport', color: '#febb02' },
        { name: 'Westend Mall', distance: '8 minutes walk', icon: '🛍️', type: 'shopping', color: '#0071c2' },
        { name: 'Shaniwar Wada', distance: '25 minutes drive', icon: '🏰', type: 'heritage', color: '#845ef7' },
        { name: 'Aga Khan Palace', distance: '30 minutes drive', icon: '🏛️', type: 'monument', color: '#ff6b6b' },
        { name: 'Sinhagad Fort', distance: '45 minutes drive', icon: '⛰️', type: 'nature', color: '#51cf66' },
        { name: 'Pune University', distance: '15 minutes drive', icon: '🎓', type: 'education', color: '#00d4aa' }
      ]
    },
    'Marina PG Chennai': {
      name: 'Marina PG Chennai',
      address: '654 Usman Road, T. Nagar, Chennai 600017',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNSJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin',
      nearbyAttractions: [
        { name: 'T. Nagar Bus Stand', distance: '3 minutes walk', icon: '🚌', type: 'transport', color: '#febb02' },
        { name: 'Express Avenue Mall', distance: '12 minutes walk', icon: '🛍️', type: 'shopping', color: '#0071c2' },
        { name: 'Marina Beach', distance: '20 minutes drive', icon: '🏖️', type: 'beach', color: '#339af0' },
        { name: 'Kapaleeshwarar Temple', distance: '15 minutes drive', icon: '🛕', type: 'temple', color: '#ff6b6b' },
        { name: 'Fort St. George', distance: '25 minutes drive', icon: '🏰', type: 'heritage', color: '#845ef7' },
        { name: 'Valluvar Kottam', distance: '18 minutes drive', icon: '🏛️', type: 'monument', color: '#51cf66' }
      ]
    },
    'Pink City Hostel Jaipur': {
      name: 'Pink City Hostel Jaipur',
      address: '987 Ashok Marg, C-Scheme, Jaipur 302001',
      coordinates: { lat: 26.9124, lng: 75.7873 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.1!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin',
      nearbyAttractions: [
        { name: 'Sindhi Camp Metro', distance: '10 minutes walk', icon: '🚇', type: 'transport', color: '#febb02' },
        { name: 'World Trade Park', distance: '15 minutes walk', icon: '🛍️', type: 'shopping', color: '#0071c2' },
        { name: 'City Palace', distance: '20 minutes drive', icon: '🏰', type: 'palace', color: '#845ef7' },
        { name: 'Hawa Mahal', distance: '18 minutes drive', icon: '🏛️', type: 'monument', color: '#ff6b6b' },
        { name: 'Amber Fort', distance: '35 minutes drive', icon: '⛰️', type: 'fort', color: '#51cf66' },
        { name: 'Jantar Mantar', distance: '22 minutes drive', icon: '🔭', type: 'observatory', color: '#00d4aa' }
      ]
    }
  };

  const currentHotelData = hotelData[currentHotel] || hotelData['GoNest Hostel Bengaluru'];

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMapExpanded) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate normalized mouse position (-1 to 1)
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;

        // Reduce intensity on mobile
        const isMobile = window.innerWidth <= 768;
        const intensity = isMobile ? 0.3 : 1;

        setMousePosition({
          x: x * 10 * intensity,
          y: y * 10 * intensity
        });
      }
    };

    if (isMapExpanded) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMapExpanded]);

  // Handle device orientation for mobile parallax
  useEffect(() => {
    const handleOrientation = (e) => {
      if (isMapExpanded && window.innerWidth <= 768) {
        const { beta, gamma } = e;
        const intensity = 0.3; // Reduced intensity for mobile

        setMousePosition({
          x: (gamma || 0) * intensity,
          y: (beta || 0) * intensity
        });
      }
    };

    if (isMapExpanded && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMapExpanded]);

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMapExpanded) {
        handleCloseMap();
      }
    };

    const handleClickOutside = (e) => {
      if (expandedMapRef.current && !expandedMapRef.current.contains(e.target) && isMapExpanded) {
        handleCloseMap();
      }
    };

    if (isMapExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMapExpanded]);



  const handleCloseMap = () => {
    setIsMapExpanded(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <>
      {/* Main Map Section */}
      <div className="map-section">
        <div className="map-container">
          <div className="map-content">
            <h2 className="map-title">Hostel Location & Nearby</h2>

            {/* Map Container with Mini Map and Main Map */}
            <div className="maps-container">
              {/* Mini Map on the Left */}
              <div className="mini-map-container">
                <h4 className="mini-map-title">Quick Location</h4>
                <div className="mini-map">
                  <iframe
                    src={currentHotelData.mapUrl}
                    width="100%"
                    height="120"
                    style={{ border: 0, borderRadius: '6px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mini map of ${currentHotelData.name}`}
                  ></iframe>
                  <div className="mini-map-overlay">
                    <span className="mini-map-pin">📍</span>
                  </div>
                </div>
              </div>

              {/* Main Map Preview */}
              <div className="map-preview" ref={mapRef}>
                <div className="map-loading-overlay" style={{ display: isLoading ? 'flex' : 'none' }}>
                  <div className="map-loading-spinner"></div>
                </div>

                <iframe
                  src={currentHotelData.mapUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${currentHotelData.name}`}
                ></iframe>

                <div className="map-overlay">
                  <div className="hotel-location-info">
                    <h3>{currentHotelData.name}</h3>
                    <p>{currentHotelData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotel Details Section */}
            <div className="hotel-details-section">
              {/* Hotel Name with Stylish Border */}
              <div className="hotel-name-container">
                <h3 className="hotel-name">{currentHotelData.name}</h3>
                <div className="hotel-name-divider">
                  <div className="divider-line"></div>
                  <div className="divider-dot"></div>
                  <div className="divider-line"></div>
                </div>
                <p className="hotel-address">{currentHotelData.address}</p>
              </div>

              {/* View Larger Map Button */}
              {/* <div className="map-button-container">
                <button 
                  className="view-larger-map-btn"
                  onClick={handleExpandMap}
                  disabled={isLoading}
                >
                  <span className="btn-icon">🗺️</span>
                  <span className="btn-text">View Larger Map</span>
                  <span className="btn-arrow">↗</span>
                </button>
              </div> */}

              {/* Nearby Attractions */}
              <div className="nearby-attractions-section">
                <div className="attractions-grid-container">
                  <div className="attractions-grid">
                    {currentHotelData.nearbyAttractions.map((attraction, index) => (
                      <div
                        key={index}
                        className="attraction-card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="attraction-content">
                          <div
                            className="attraction-icon-container"
                            style={{
                              background: `linear-gradient(135deg, ${attraction.color}15, ${attraction.color}25)`,
                              borderColor: `${attraction.color}30`
                            }}
                          >
                            <span className="attraction-icon">{attraction.icon}</span>
                          </div>
                          <div className="attraction-details">
                            <h4 className="attraction-name">{attraction.name}</h4>
                            <p className="attraction-distance">{attraction.distance}</p>
                            <span
                              className="attraction-type-badge"
                              style={{
                                background: `${attraction.color}20`,
                                color: attraction.color
                              }}
                            >
                              {attraction.type}
                            </span>
                          </div>
                        </div>
                        <div className="attraction-hover-effect"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions-section">
                {/* <div className="quick-action-card">
                  <div className="quick-action-icon">📍</div>
                  <div className="quick-action-content">
                    <h4>Get Directions</h4>
                    <p>Navigate to this location</p>
                  </div>
                </div> */}

                {/* <div className="quick-action-card">
                  <div className="quick-action-icon">📱</div>
                  <div className="quick-action-content">
                    <h4>Share Location</h4>
                    <p>Send to friends & family</p>
                  </div>
                </div> */}

                {/* <div className="quick-action-card">
                  <div className="quick-action-icon">🚗</div>
                  <div className="quick-action-content">
                    <h4>Book Cab</h4>
                    <p>Quick ride to hostel</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Map Modal */}
      {isMapExpanded && (
        <div className="map-modal-overlay">
          <div className="map-modal-backdrop"></div>
          <div
            className="map-modal-content"
            ref={expandedMapRef}
            style={{
              transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
            }}
          >
            {/* Close Button */}
            <button className="map-close-btn" onClick={handleCloseMap}>
              <span>✕</span>
            </button>

            {/* Map Header */}
            <div className="map-modal-header">
              <h2>{currentHotelData.name}</h2>
              <p>{currentHotelData.address}</p>
            </div>

            {/* Expanded Map */}
            <div className="expanded-map-container">
              {isLoading ? (
                <div className="map-loading-state">
                  <div className="loading-shimmer"></div>
                  <div className="loading-text">Loading interactive map...</div>
                </div>
              ) : (
                <iframe
                  src={currentHotelData.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Interactive map of ${currentHotelData.name}`}
                ></iframe>
              )}
            </div>

            {/* Map Controls */}
            <div className="map-controls">
              <button className="map-control-btn">
                <span>📍</span>
                <span>Get Directions</span>
              </button>
              <button className="map-control-btn">
                <span>📱</span>
                <span>Share Location</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;