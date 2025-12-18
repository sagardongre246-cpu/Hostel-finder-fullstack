const BookingForm = () => {
  return (
    <div className="booking-main">
      {/* Breadcrumb */}
      <nav className="booking-breadcrumb">
        <ul className="booking-breadcrumb-list">
          <li><a href="/" className="booking-breadcrumb-item">Home</a></li>
          <li className="booking-breadcrumb-separator">›</li>
          <li><a href="/hostels" className="booking-breadcrumb-item">Hostel</a></li>
          <li className="booking-breadcrumb-separator">›</li>
          <li><a href="/pgs" className="booking-breadcrumb-item">All PGs</a></li>
          <li className="booking-breadcrumb-separator">›</li>
          <li><a href="/india" className="booking-breadcrumb-item">India</a></li>
          <li className="booking-breadcrumb-separator">›</li>
          <li><a href="/bengaluru" className="booking-breadcrumb-item">Bengaluru</a></li>
          <li className="booking-breadcrumb-separator">›</li>
          <li><a href="/koramangala" className="booking-breadcrumb-item">Koramangala</a></li>
          <li className="booking-breadcrumb-separator">›</li>
          <li className="booking-breadcrumb-item" style={{color: '#262626'}}>
            Premium PG with Modern Amenities - Koramangala, Bengaluru (PG) (India) deals
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BookingForm;