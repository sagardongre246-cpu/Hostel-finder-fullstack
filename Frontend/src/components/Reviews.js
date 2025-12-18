import React, { useState } from 'react';

const Reviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const initialReviews = [
    {
      id: 1,
      user: "Monique",
      country: "Australia",
      comment: "Great location, beautiful view from balcony, just what was needed for a stay in Malta. The host was very welcoming and helpful throughout. Would..."
    },
    {
      id: 2,
      user: "Sarah",
      country: "United Kingdom",
      comment: "Perfect location right on the seafront. The terrace was amazing for morning coffee and evening drinks. Clean, comfortable and exactly as described."
    },
    {
      id: 3,
      user: "Marco",
      country: "Italy",
      comment: "Stunning views and excellent location. Walking distance to restaurants and shops. The apartment was spotless and the host was very responsive."
    }
  ];

  const additionalReviews = [
    {
      id: 4,
      user: "Emma",
      country: "Germany",
      comment: "Fantastic hostel with amazing staff! The location is perfect for exploring the city. Clean rooms, great atmosphere, and excellent value for money."
    },
    {
      id: 5,
      user: "James",
      country: "Canada",
      comment: "One of the best hostels I've stayed at. The common areas are spacious and well-designed. Met so many interesting people here. Highly recommended!"
    },
    {
      id: 6,
      user: "Sofia",
      country: "Spain",
      comment: "Beautiful hostel with modern facilities. The rooftop terrace has incredible views. Staff went above and beyond to help with local recommendations."
    },
    {
      id: 7,
      user: "David",
      country: "France",
      comment: "Great value for money! The beds are comfortable, lockers are spacious, and the WiFi is fast. Perfect location near public transport."
    },
    {
      id: 8,
      user: "Lisa",
      country: "Netherlands",
      comment: "Loved the social atmosphere here. The kitchen is well-equipped and the common room is perfect for meeting other travelers. Will definitely return!"
    },
    {
      id: 9,
      user: "Alex",
      country: "Sweden",
      comment: "Clean, safe, and friendly environment. The staff speaks multiple languages and are very helpful. Great breakfast options available."
    },
    {
      id: 10,
      user: "Maria",
      country: "Brazil",
      comment: "Excellent hostel with a vibrant community feel. The location is unbeatable and the facilities are top-notch. Felt like home away from home."
    },
    {
      id: 11,
      user: "Tom",
      country: "United States",
      comment: "Outstanding experience! The hostel is modern, clean, and has everything you need. The staff organized great city tours and activities."
    },
    {
      id: 12,
      user: "Anna",
      country: "Poland",
      comment: "Perfect for solo travelers! Safe, clean, and with a great social atmosphere. The location makes it easy to explore all the main attractions."
    },
    {
      id: 13,
      user: "Carlos",
      country: "Mexico",
      comment: "Incredible hostel with amazing views from the common areas. The staff is super friendly and helpful. Great place to meet fellow travelers."
    },
    {
      id: 14,
      user: "Yuki",
      country: "Japan",
      comment: "Very impressed with the cleanliness and organization. The beds are comfortable and the atmosphere is welcoming. Excellent value for the price."
    },
    {
      id: 15,
      user: "Oliver",
      country: "Norway",
      comment: "Best hostel experience I've had! Modern facilities, great location, and wonderful staff. The common areas are perfect for socializing."
    },
    {
      id: 16,
      user: "Isabella",
      country: "Argentina",
      comment: "Loved everything about this place! Clean rooms, friendly staff, and great location. The rooftop area is perfect for relaxing after a day of exploring."
    },
    {
      id: 17,
      user: "Lucas",
      country: "Portugal",
      comment: "Fantastic hostel with excellent amenities. The staff is incredibly helpful and the atmosphere is perfect for meeting new people. Highly recommend!"
    },
    {
      id: 18,
      user: "Chloe",
      country: "New Zealand",
      comment: "Amazing experience! The hostel is modern, clean, and has a great vibe. Perfect location and the staff made me feel very welcome."
    }
  ];

  const allReviews = [...initialReviews, ...additionalReviews];
  const displayedReviews = showAllReviews ? allReviews : initialReviews;

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  const getCountryFlag = (country) => {
    const flags = {
      'Australia': '🇦🇺',
      'United Kingdom': '🇬🇧',
      'Italy': '🇮🇹',
      'Germany': '🇩🇪',
      'Canada': '🇨🇦',
      'Spain': '🇪🇸',
      'France': '🇫🇷',
      'Netherlands': '🇳🇱',
      'Sweden': '🇸🇪',
      'Brazil': '🇧🇷',
      'United States': '🇺🇸',
      'Poland': '🇵🇱',
      'Mexico': '🇲🇽',
      'Japan': '🇯🇵',
      'Norway': '🇳🇴',
      'Argentina': '🇦🇷',
      'Portugal': '🇵🇹',
      'New Zealand': '🇳🇿'
    };
    return flags[country] || '🌍';
  };

  return (
    <div className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="reviews-title">
            Guests who stayed here loved
          </h2>
        </div>

        <div className="booking-reviews">
          {displayedReviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`booking-review-item ${index >= 3 ? 'additional-review' : ''} ${showAllReviews && index >= 3 ? 'show-review' : ''}`}
            >
              <div className="booking-review-header">
                <div className="booking-reviewer-avatar">
                  {review.user.charAt(0)}
                </div>
                <div className="booking-reviewer-info">
                  <h4>{review.user}</h4>
                  <p>{getCountryFlag(review.country)} {review.country}</p>
                </div>
              </div>
              <p className="booking-review-text">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        <div className="reviews-button-container">
          <button 
            className="reviews-toggle-btn"
            onClick={toggleReviews}
          >
            {showAllReviews ? 'Show less' : 'Read all reviews'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;