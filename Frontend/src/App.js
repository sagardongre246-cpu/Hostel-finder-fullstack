import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import PriceComparison from './components/PriceComparison';
import Map from './components/Map';
import Reviews from './components/Reviews';
import Modal from './components/Modal';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import RegistrationModal from './components/RegistrationModal';
import { testBackendConnection } from './utils/testConnection';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState('GoNest Hostel Bengaluru');
  // User state is managed by Navbar component via localStorage

  // Test backend connection on app load
  useEffect(() => {
    testBackendConnection();
  }, []);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setIsLoginModalOpen(false);
    // Notify Navbar component about successful login
    if (window.navbarLoginSuccess) {
      window.navbarLoginSuccess(userData);
    }
  };

  const handleRegisterClick = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const handleRegistrationSuccess = (userData) => {
    setIsRegistrationModalOpen(false);
    // Notify Navbar component about successful registration
    if (window.navbarLoginSuccess) {
      window.navbarLoginSuccess(userData);
    }
  };

  const handleHotelChange = (hotelName) => {
    setCurrentHotel(hotelName);
  };

  return (
    <div className="App">
      <Navbar 
        onLoginClick={handleLoginClick} 
        onRegisterClick={handleRegisterClick}
        onLoginSuccess={handleLoginSuccess}
      />
      <Hero />
      <BookingForm />
      <PriceComparison onHotelChange={handleHotelChange} />
      <Map currentHotel={currentHotel} />
      <Reviews />
      <Footer />
      <AIAssistant />
      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegistrationModal 
        isOpen={isRegistrationModalOpen} 
        onClose={handleCloseRegistrationModal}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </div>
  );
}

export default App;
