import React, { useState } from 'react';
import ReservationModal from './ReservationModal';

const PriceComparison = ({ onHotelChange }) => {
  const [showAllHostels, setShowAllHostels] = useState(false);
  
  // Initial main hostel (GoNest Hostel Bengaluru)
  const initialMainHostel = {
    id: 3,
    name: "GoNest Hostel Bengaluru",
    location: "Koramangala, Bengaluru",
    fullLocation: "123 5th Block, Koramangala, Bengaluru 560095",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    price: "₹1,500",
    rating: 8.2,
    ratingText: "Very good",
    reviews: 289,
    description: "Budget-friendly hostel near IT hubs with bunk beds, co-working space, and 24/7 reception.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    ]
  };

  const [mainHostel, setMainHostel] = useState(initialMainHostel);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTab, setActiveTab] = useState('Guest reviews');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const hostels = [
    {
      id: 1,
      name: "Mumbai Central PG",
      location: "Andheri West, Mumbai",
      fullLocation: "456 SV Road, Andheri West, Mumbai 400058",
      coordinates: { lat: 19.1136, lng: 72.8697 },
      price: "₹1,800",
      rating: 8.7,
      ratingText: "Excellent",
      reviews: 342,
      description: "Modern PG in the heart of Mumbai with free WiFi, shared kitchen, AC rooms, and 24/7 security.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 2,
      name: "CityStay PG Delhi",
      location: "Lajpat Nagar, Delhi",
      fullLocation: "789 Ring Road, Lajpat Nagar IV, Delhi 110024",
      coordinates: { lat: 28.5677, lng: 77.2431 },
      price: "₹2,200",
      rating: 9.1,
      ratingText: "Superb",
      reviews: 156,
      description: "Premium PG with AC rooms, study area, high-speed internet, and walking distance to metro station.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 4,
      name: "Backpackers Paradise Pune",
      location: "Kothrud, Pune",
      fullLocation: "321 Paud Road, Kothrud, Pune 411038",
      coordinates: { lat: 18.5074, lng: 73.8077 },
      price: "₹1,600",
      rating: 8.5,
      ratingText: "Very good",
      reviews: 198,
      description: "Clean and comfortable PG with shared rooms, free breakfast, laundry service, and helpful staff.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 5,
      name: "Marina PG Chennai",
      location: "T. Nagar, Chennai",
      fullLocation: "654 Usman Road, T. Nagar, Chennai 600017",
      coordinates: { lat: 13.0418, lng: 80.2341 },
      price: "₹1,400",
      rating: 8.0,
      ratingText: "Very good",
      reviews: 167,
      description: "Cozy PG near Marina Beach with AC rooms, mess facility, and bike parking available.",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 6,
      name: "Pink City Hostel Jaipur",
      location: "C-Scheme, Jaipur",
      fullLocation: "987 Ashok Marg, C-Scheme, Jaipur 302001",
      coordinates: { lat: 26.9124, lng: 75.7873 },
      price: "₹1,700",
      rating: 8.8,
      ratingText: "Excellent",
      reviews: 234,
      description: "Modern hostel with dormitory beds, rooftop terrace, cultural tours, and traditional Rajasthani meals.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 7,
      name: "Sabarmati PG Ahmedabad",
      location: "Navrangpura, Ahmedabad",
      fullLocation: "147 CG Road, Navrangpura, Ahmedabad 380009",
      coordinates: { lat: 23.0359, lng: 72.5662 },
      price: "₹1,300",
      rating: 8.3,
      ratingText: "Very good",
      reviews: 145,
      description: "Peaceful PG with study rooms, mess facility, and shuttle service to major colleges and offices.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 8,
      name: "Hooghly Hostel Kolkata",
      location: "Salt Lake, Kolkata",
      fullLocation: "258 Sector V, Salt Lake City, Kolkata 700091",
      coordinates: { lat: 22.5726, lng: 88.3639 },
      price: "₹1,100",
      rating: 7.9,
      ratingText: "Good",
      reviews: 112,
      description: "Authentic Bengali culture experience with shared rooms, local food, and cultural activities.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 9,
      name: "Hyderabad PG Hub",
      location: "Gachibowli, Hyderabad",
      fullLocation: "369 HITEC City Road, Gachibowli, Hyderabad 500032",
      coordinates: { lat: 17.4399, lng: 78.3489 },
      price: "₹1,700",
      rating: 8.6,
      ratingText: "Excellent",
      reviews: 178,
      description: "Tech hub location with modern amenities, high-speed internet, gym access, and IT shuttle service.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 10,
      name: "Tranquil Stay Kochi",
      location: "Marine Drive, Kochi",
      fullLocation: "741 Marine Drive, Ernakulam, Kochi 682031",
      coordinates: { lat: 9.9312, lng: 76.2673 },
      price: "₹1,600",
      rating: 8.4,
      ratingText: "Very good",
      reviews: 203,
      description: "Peaceful stay near backwaters with traditional Kerala architecture, ayurvedic spa, and boat tours.",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 11,
      name: "Comfort Nest Lucknow",
      location: "Hazratganj, Lucknow",
      fullLocation: "852 MG Marg, Hazratganj, Lucknow 226001",
      coordinates: { lat: 26.8467, lng: 80.9462 },
      price: "₹1,200",
      rating: 8.1,
      ratingText: "Very good",
      reviews: 189,
      description: "Heritage city location with traditional Awadhi hospitality, cultural tours, and authentic cuisine.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 12,
      name: "Skyline Hostel Chandigarh",
      location: "Sector 17, Chandigarh",
      fullLocation: "963 Sector 17-E, Chandigarh 160017",
      coordinates: { lat: 30.7333, lng: 76.7794 },
      price: "₹1,500",
      rating: 8.5,
      ratingText: "Very good",
      reviews: 167,
      description: "Modern city hostel with rooftop views, cycling tours, and easy access to Rock Garden and Sukhna Lake.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 13,
      name: "Sunrise PG Nagpur",
      location: "Sitabuldi, Nagpur",
      fullLocation: "174 Central Avenue, Sitabuldi, Nagpur 440012",
      coordinates: { lat: 21.1458, lng: 79.0882 },
      price: "₹1,400",
      rating: 7.8,
      ratingText: "Good",
      reviews: 134,
      description: "Central location PG with study facilities, mess service, and proximity to major educational institutions.",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 14,
      name: "Seaside Hostel Goa",
      location: "Calangute Beach, Goa",
      fullLocation: "285 Beach Road, Calangute, North Goa 403516",
      coordinates: { lat: 15.5430, lng: 73.7554 },
      price: "₹1,900",
      rating: 9.0,
      ratingText: "Superb",
      reviews: 298,
      description: "Beachfront hostel with ocean views, water sports, beach parties, and authentic Goan seafood.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
      ]
    }
  ];

  // Filter out the main hostel from the list and get visible hostels
  const availableHostels = hostels.filter(hostel => hostel.id !== mainHostel.id);
  const visibleHostels = showAllHostels ? availableHostels : availableHostels.slice(0, 9);

  const toggleShowMore = () => {
    setShowAllHostels(!showAllHostels);
  };

  const handleHostelClick = (selectedHostel) => {
    if (selectedHostel.id === mainHostel.id) return;
    
    setIsTransitioning(true);
    
    // Create new hostel object with full data
    const newMainHostel = {
      ...selectedHostel,
      fullLocation: selectedHostel.fullLocation || `${selectedHostel.location} - Excellent location`,
      images: selectedHostel.images || [selectedHostel.image, selectedHostel.image, selectedHostel.image, selectedHostel.image]
    };
    
    setTimeout(() => {
      setMainHostel(newMainHostel);
      setIsTransitioning(false);
      
      // Notify parent component about hotel change
      if (onHotelChange) {
        onHotelChange(newMainHostel.name);
      }
    }, 300);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setModalContent(generateTabContent(tabName));
    setIsModalOpen(true);
  };

  const generateTabContent = (tabName) => {
    switch (tabName) {
      case 'Overview':
        return {
          title: `${mainHostel.name} - Overview`,
          content: (
            <div className="tab-content-overview">
              <div className="overview-summary">
                <h3>Property Highlights</h3>
                <p>{mainHostel.description}</p>
                <div className="overview-rating">
                  <div className="rating-badge">
                    <span className="rating-score">{mainHostel.rating}</span>
                    <span className="rating-text">{mainHostel.ratingText}</span>
                  </div>
                  <p>{mainHostel.reviews} guest reviews</p>
                </div>
              </div>
              <div className="overview-highlights">
                <h3>Key Features</h3>
                <ul>
                  <li>✓ Free WiFi throughout the property</li>
                  <li>✓ 24/7 reception and security</li>
                  <li>✓ Air conditioning in all rooms</li>
                  <li>✓ Shared kitchen facilities</li>
                  <li>✓ Laundry services available</li>
                  <li>✓ Common area and study space</li>
                </ul>
              </div>
              <div className="overview-location">
                <h3>Location</h3>
                <p>📍 {mainHostel.fullLocation}</p>
                <p>Excellent location with easy access to public transport, shopping areas, and local attractions.</p>
              </div>
            </div>
          )
        };
      
      case 'Apartment info & price':
        return {
          title: `${mainHostel.name} - Room Info & Pricing`,
          content: (
            <div className="tab-content-pricing">
              <div className="room-types">
                <h3>Available Room Types</h3>
                <div className="room-type-card">
                  <h4>Shared Dormitory (4-bed)</h4>
                  <p>Bunk beds in shared room with common bathroom</p>
                  <div className="price-info">
                    <span className="price">{mainHostel.price}</span>
                    <span className="period">per month</span>
                  </div>
                </div>
                <div className="room-type-card">
                  <h4>Private Room (Single)</h4>
                  <p>Private room with shared bathroom facilities</p>
                  <div className="price-info">
                    <span className="price">₹{parseInt(mainHostel.price.replace('₹', '')) + 500}</span>
                    <span className="period">per month</span>
                  </div>
                </div>
              </div>
              <div className="availability-info">
                <h3>Availability</h3>
                <p>✓ Available for immediate booking</p>
                <p>✓ Flexible check-in times</p>
                <p>✓ Weekly and monthly rates available</p>
              </div>
              <div className="room-photos">
                <h3>Room Photos</h3>
                <div className="photo-grid">
                  {mainHostel.images.map((img, index) => (
                    <div key={index} className="room-photo" style={{backgroundImage: `url(${img})`}}></div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      
      case 'Facilities':
        return {
          title: `${mainHostel.name} - Facilities & Amenities`,
          content: (
            <div className="tab-content-facilities">
              <div className="facilities-grid">
                <div className="facility-category">
                  <h3>🏠 General Facilities</h3>
                  <ul>
                    <li>Free WiFi</li>
                    <li>24/7 Reception</li>
                    <li>Security Cameras</li>
                    <li>Common Area</li>
                    <li>Study Room</li>
                    <li>Luggage Storage</li>
                  </ul>
                </div>
                <div className="facility-category">
                  <h3>🛏️ Room Amenities</h3>
                  <ul>
                    <li>Air Conditioning</li>
                    <li>Individual Lockers</li>
                    <li>Reading Lights</li>
                    <li>Power Outlets</li>
                    <li>Fresh Linens</li>
                    <li>Comfortable Mattresses</li>
                  </ul>
                </div>
                <div className="facility-category">
                  <h3>🍽️ Kitchen & Dining</h3>
                  <ul>
                    <li>Shared Kitchen</li>
                    <li>Refrigerator</li>
                    <li>Microwave</li>
                    <li>Dining Area</li>
                    <li>Cooking Utensils</li>
                    <li>Water Purifier</li>
                  </ul>
                </div>
                <div className="facility-category">
                  <h3>🚿 Bathroom Facilities</h3>
                  <ul>
                    <li>Hot Water 24/7</li>
                    <li>Clean Bathrooms</li>
                    <li>Separate Washrooms</li>
                    <li>Toiletries Available</li>
                    <li>Laundry Service</li>
                    <li>Drying Area</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        };
      
      case 'House rules':
        return {
          title: `${mainHostel.name} - House Rules & Policies`,
          content: (
            <div className="tab-content-rules">
              <div className="rules-section">
                <h3>⏰ Check-in & Check-out</h3>
                <ul>
                  <li>Check-in: 2:00 PM - 11:00 PM</li>
                  <li>Check-out: 8:00 AM - 12:00 PM</li>
                  <li>Late check-in available with prior notice</li>
                  <li>Early check-in subject to availability</li>
                </ul>
              </div>
              <div className="rules-section">
                <h3>✅ House Rules</h3>
                <ul>
                  <li>Quiet hours: 10:00 PM - 8:00 AM</li>
                  <li>No smoking inside the property</li>
                  <li>No alcohol in dormitory rooms</li>
                  <li>Guests must show valid ID at check-in</li>
                  <li>Maximum 2 guests per booking</li>
                  <li>Keep common areas clean</li>
                </ul>
              </div>
              <div className="rules-section">
                <h3>🚫 Restrictions</h3>
                <ul>
                  <li>No pets allowed</li>
                  <li>No parties or events</li>
                  <li>No outside guests after 10 PM</li>
                  <li>No cooking strong-smelling food</li>
                  <li>Respect other guests' privacy</li>
                </ul>
              </div>
              <div className="rules-section">
                <h3>💰 Additional Charges</h3>
                <ul>
                  <li>Key deposit: ₹500 (refundable)</li>
                  <li>Late check-out: ₹200 per hour</li>
                  <li>Lost key replacement: ₹300</li>
                  <li>Damage charges as applicable</li>
                </ul>
              </div>
            </div>
          )
        };
      
      case 'Important & legal info':
        return {
          title: `${mainHostel.name} - Legal Information & Policies`,
          content: (
            <div className="tab-content-legal">
              <div className="legal-section">
                <h3>📋 Booking Policy</h3>
                <ul>
                  <li>Advance payment required for confirmation</li>
                  <li>Valid government ID mandatory at check-in</li>
                  <li>Booking confirmation via email/SMS</li>
                  <li>Age restriction: 18+ years only</li>
                </ul>
              </div>
              <div className="legal-section">
                <h3>❌ Cancellation Policy</h3>
                <ul>
                  <li>Free cancellation up to 24 hours before check-in</li>
                  <li>50% refund for cancellations within 24 hours</li>
                  <li>No refund for no-shows</li>
                  <li>Refunds processed within 7-10 business days</li>
                </ul>
              </div>
              <div className="legal-section">
                <h3>⚖️ Terms & Conditions</h3>
                <ul>
                  <li>Management reserves the right to refuse service</li>
                  <li>Property not liable for personal belongings</li>
                  <li>Guests responsible for any damages caused</li>
                  <li>Compliance with local laws mandatory</li>
                </ul>
              </div>
              <div className="legal-section">
                <h3>🔒 Privacy & Safety</h3>
                <ul>
                  <li>CCTV surveillance in common areas</li>
                  <li>Personal data protected as per privacy policy</li>
                  <li>24/7 security personnel on duty</li>
                  <li>Emergency contact numbers provided</li>
                </ul>
              </div>
            </div>
          )
        };
      
      case 'Guest reviews':
        return {
          title: `${mainHostel.name} - Guest Reviews (${mainHostel.reviews})`,
          content: (
            <div className="tab-content-reviews">
              <div className="reviews-summary">
                <div className="overall-rating">
                  <span className="rating-score-large">{mainHostel.rating}</span>
                  <div className="rating-details">
                    <span className="rating-text-large">{mainHostel.ratingText}</span>
                    <span className="review-count">{mainHostel.reviews} reviews</span>
                  </div>
                </div>
              </div>
              <div className="reviews-list">
                <div className="review-item">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">A</div>
                    <div className="reviewer-details">
                      <h4>Arjun Patel</h4>
                      <span className="review-date">2 days ago</span>
                    </div>
                    <div className="review-rating">9.2</div>
                  </div>
                  <p className="review-text">"Excellent location and very clean facilities. The staff was helpful and the WiFi was fast. Great value for money!"</p>
                </div>
                <div className="review-item">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">P</div>
                    <div className="reviewer-details">
                      <h4>Priya Sharma</h4>
                      <span className="review-date">1 week ago</span>
                    </div>
                    <div className="review-rating">8.5</div>
                  </div>
                  <p className="review-text">"Good hostel with nice common areas. The kitchen was well-equipped and the location is perfect for exploring the city."</p>
                </div>
                <div className="review-item">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">R</div>
                    <div className="reviewer-details">
                      <h4>Rahul Kumar</h4>
                      <span className="review-date">2 weeks ago</span>
                    </div>
                    <div className="review-rating">8.8</div>
                  </div>
                  <p className="review-text">"Clean rooms, friendly staff, and great atmosphere. The AC worked well and the beds were comfortable. Highly recommended!"</p>
                </div>
                <div className="review-item">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">S</div>
                    <div className="reviewer-details">
                      <h4>Sneha Reddy</h4>
                      <span className="review-date">3 weeks ago</span>
                    </div>
                    <div className="review-rating">7.9</div>
                  </div>
                  <p className="review-text">"Decent place to stay. The location is convenient and the price is reasonable. Could improve the breakfast options."</p>
                </div>
              </div>
            </div>
          )
        };
      
      default:
        return { title: 'Information', content: <div>Content not available</div> };
    }
  };

  return (
    <>
      {/* Main Property Section */}
      <div className="booking-property fade-in">
        <div className="booking-property-main">
          {/* Tabs */}
          <div className="booking-tabs">
            <button 
              className={`booking-tab ${activeTab === 'Overview' ? 'active' : ''}`}
              onClick={() => handleTabClick('Overview')}
            >
              Overview
            </button>
            <button 
              className={`booking-tab ${activeTab === 'Apartment info & price' ? 'active' : ''}`}
              onClick={() => handleTabClick('Apartment info & price')}
            >
              Room info & price
            </button>
            <button 
              className={`booking-tab ${activeTab === 'Facilities' ? 'active' : ''}`}
              onClick={() => handleTabClick('Facilities')}
            >
              Facilities
            </button>
            <button 
              className={`booking-tab ${activeTab === 'House rules' ? 'active' : ''}`}
              onClick={() => handleTabClick('House rules')}
            >
              House rules
            </button>
            <button 
              className={`booking-tab ${activeTab === 'Important & legal info' ? 'active' : ''}`}
              onClick={() => handleTabClick('Important & legal info')}
            >
              Important & legal info
            </button>
            <button 
              className={`booking-tab ${activeTab === 'Guest reviews' ? 'active' : ''}`}
              onClick={() => handleTabClick('Guest reviews')}
            >
              Guest reviews ({mainHostel.reviews})
            </button>
          </div>

          {/* Property Header */}
          <div className={`booking-property-header ${isTransitioning ? 'transitioning' : ''}`}>
            <div className="booking-property-rating">
              <div className="booking-star">★★★★★</div>
              <div className="booking-genius-badge">{mainHostel.ratingText}</div>
            </div>
            
            <h1 className="booking-property-title">
              {mainHostel.name} - {mainHostel.location}
            </h1>
            
            <div className="booking-property-location">
              📍 {mainHostel.fullLocation} - Excellent location - show map
            </div>
          </div>

          {/* Property Images */}
          <div className={`booking-images ${isTransitioning ? 'transitioning' : ''}`}>
            <div 
              className="booking-image main"
              style={{
                backgroundImage: `url(${mainHostel.images[0]})`
              }}
            ></div>
            <div 
              className="booking-image"
              style={{
                backgroundImage: `url(${mainHostel.images[1]})`
              }}
            ></div>
            <div 
              className="booking-image"
              style={{
                backgroundImage: `url(${mainHostel.images[2]})`
              }}
            ></div>
            <div 
              className="booking-image"
              style={{
                backgroundImage: `url(${mainHostel.images[3]})`
              }}
            ></div>
            <div className="booking-image">
              <div className="booking-image-overlay">+15 photos</div>
            </div>
          </div>
        </div>

        <div className="booking-property-sidebar">
          {/* Reserve Card */}
          <div className="booking-sidebar-card">
            <button 
              className="booking-reserve-btn"
              onClick={() => setIsReservationModalOpen(true)}
            >
              Reserve your PG stay
            </button>
            <div className="booking-price-match">
              🏷️ We Price Match
            </div>
          </div>

          {/* Rating Card */}
          <div className={`booking-sidebar-card booking-rating-card ${isTransitioning ? 'transitioning' : ''}`}>
            <div className="booking-rating-score">{mainHostel.rating}</div>
            <div className="booking-rating-text">{mainHostel.ratingText}</div>
            <div className="booking-rating-reviews">{mainHostel.reviews} reviews</div>
          </div>

          {/* Location Excellence */}
          <div className={`booking-sidebar-card booking-location-card ${isTransitioning ? 'transitioning' : ''}`}>
            <h3 className="location-card-title">
              Excellent location!
            </h3>
            <div className="location-score">
              9.6
            </div>
            <div className="booking-map-container">
              {mainHostel.coordinates && (
                <iframe
                  key={`map-${mainHostel.id}`}
                  className="booking-map-iframe"
                  title={`Map of ${mainHostel.name}`}
                  src={`https://www.google.com/maps?q=${mainHostel.coordinates.lat},${mainHostel.coordinates.lng}&hl=en&z=15&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
            <a 
              href={`https://www.google.com/maps?q=${mainHostel.coordinates?.lat},${mainHostel.coordinates?.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              📍 Show on map
            </a>
          </div>
        </div>
      </div>

      {/* Hostels Listing Section */}
      <div className="booking-hostels-section">
        <div className="booking-hostels-container">
          <h2 className="booking-hostels-title">More Recommendations in India</h2>
          <p className="booking-hostels-subtitle">Discover budget-friendly PGs and hostels across major Indian cities</p>
          
          <div className="booking-hostels-grid">
            {visibleHostels.map((hostel, index) => (
              <div 
                key={hostel.id} 
                className={`booking-hostel-card ${index >= 9 ? 'additional-hostel' : ''} ${showAllHostels && index >= 9 ? 'fade-in-up' : ''} clickable-card`}
                onClick={() => handleHostelClick(hostel)}
              >
                <div 
                  className="booking-hostel-image"
                  style={{ backgroundImage: `url(${hostel.image})` }}
                >
                  <div className="booking-hostel-price-badge">
                    {hostel.price}/night
                  </div>
                </div>
                
                <div className="booking-hostel-content">
                  <div className="booking-hostel-header">
                    <div>
                      <h3 className="booking-hostel-title">{hostel.name}</h3>
                      <div className="booking-hostel-location">📍 {hostel.location}</div>
                    </div>
                  </div>
                  
                  <div className="booking-hostel-rating">
                    <div className="booking-hostel-score">{hostel.rating}</div>
                    <div>
                      <div className="booking-hostel-rating-text">{hostel.ratingText}</div>
                      <div className="booking-hostel-reviews">{hostel.reviews} reviews</div>
                    </div>
                  </div>
                  
                  <p className="booking-hostel-description">{hostel.description}</p>
                  
                  <div className="booking-hostel-footer">
                    <button className="booking-hostel-btn">View Details</button>
                    <div className="booking-hostel-price">
                      <div className="booking-hostel-price-amount">{hostel.price}</div>
                      <div className="booking-hostel-price-period">per month</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show More/Less Button */}
          <div className="show-more-container">
            <button 
              className="show-more-btn"
              onClick={toggleShowMore}
            >
              {showAllHostels ? (
                <>
                  <span>Show less</span>
                  <span className="show-more-icon">↑</span>
                </>
              ) : (
                <>
                  <span>Show more hostels</span>
                  <span className="show-more-icon">↓</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content Modal */}
      {isModalOpen && (
        <div className="tab-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="tab-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="tab-modal-header">
              <h2 className="tab-modal-title">{modalContent.title}</h2>
              <button 
                className="tab-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="tab-modal-body">
              {modalContent.content}
            </div>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        hostelName={mainHostel.name}
        hostelPrice={mainHostel.price}
      />
    </>
  );
};

export default PriceComparison;