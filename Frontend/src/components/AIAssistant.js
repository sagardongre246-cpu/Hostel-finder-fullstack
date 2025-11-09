import React, { useState, useEffect, useRef } from 'react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Safe timestamp formatter
  const formatTimestamp = (timestamp) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      if (isNaN(date.getTime())) {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  // Initialize welcome message and setup
  useEffect(() => {
    // Set welcome message when component mounts
    const welcomeMessage = {
      id: 1,
      type: 'ai',
      text: '👋 Hi there! I\'m your AI Assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    };
    
    setMessages([welcomeMessage]);

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        setInputText(transcript);
        
        if (event.results[0].isFinal) {
          setIsListening(false);
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Load chat history from localStorage
    const savedHistory = localStorage.getItem('aiChatHistory');
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.warn('Failed to load chat history:', error);
      }
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakResponse = (text) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthRef.current.speak(utterance);
    }
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simulate AI processing delay
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      let recommendations = [];

      // Enhanced AI responses with more context
      if (lowerMessage.includes('hostel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation') || lowerMessage.includes('pg')) {
        if (lowerMessage.includes('delhi')) {
          response = '🏨 I found some excellent hostels in Delhi for you! These are highly rated and offer great value:';
          recommendations = [
            { type: 'hostel', name: 'CityStay PG Delhi', location: 'Lajpat Nagar', price: '₹2,200', rating: 9.1 },
            { type: 'hostel', name: 'Delhi Backpackers', location: 'Paharganj', price: '₹1,800', rating: 8.5 },
            { type: 'hostel', name: 'Metro Stay Delhi', location: 'Karol Bagh', price: '₹1,600', rating: 8.3 }
          ];
        } else if (lowerMessage.includes('mumbai')) {
          response = '🌊 Perfect! Mumbai has amazing hostels with great connectivity:';
          recommendations = [
            { type: 'hostel', name: 'Mumbai Central PG', location: 'Andheri West', price: '₹1,800', rating: 8.7 },
            { type: 'hostel', name: 'Gateway Hostel Mumbai', location: 'Bandra West', price: '₹1,900', rating: 8.4 },
            { type: 'hostel', name: 'Marine Drive Stay', location: 'Colaba', price: '₹2,100', rating: 8.6 }
          ];
        } else if (lowerMessage.includes('bengaluru') || lowerMessage.includes('bangalore')) {
          response = '💻 Great choice! Bengaluru has fantastic hostels, especially near IT hubs:';
          recommendations = [
            { type: 'hostel', name: 'GoNest Hostel Bengaluru', location: 'Koramangala', price: '₹1,500', rating: 8.2 },
            { type: 'hostel', name: 'Tech Hub PG', location: 'Whitefield', price: '₹1,600', rating: 8.3 },
            { type: 'hostel', name: 'Silicon Valley Stay', location: 'Electronic City', price: '₹1,400', rating: 8.1 }
          ];
        } else {
          response = '🏠 I can help you find the perfect hostel! Which city are you planning to visit? I have great options in Mumbai, Delhi, Bengaluru, Pune, Chennai, Goa, and many more Indian cities.';
        }
      } else if (lowerMessage.includes('flight') || lowerMessage.includes('fly') || lowerMessage.includes('airline')) {
        if (lowerMessage.includes('goa')) {
          response = '✈️ Found some amazing flight deals to Goa! Perfect for your beach vacation:';
          recommendations = [
            { type: 'flight', route: 'Delhi → Goa', airline: 'IndiGo', price: '₹4,500', duration: '2h 30m' },
            { type: 'flight', route: 'Mumbai → Goa', airline: 'SpiceJet', price: '₹3,200', duration: '1h 15m' },
            { type: 'flight', route: 'Bengaluru → Goa', airline: 'Air India', price: '₹4,200', duration: '1h 45m' }
          ];
        } else if (lowerMessage.includes('mumbai')) {
          response = '🏙️ Here are the best flight options to Mumbai:';
          recommendations = [
            { type: 'flight', route: 'Delhi → Mumbai', airline: 'Air India', price: '₹4,800', duration: '2h 15m' },
            { type: 'flight', route: 'Bengaluru → Mumbai', airline: 'Vistara', price: '₹5,200', duration: '1h 45m' },
            { type: 'flight', route: 'Chennai → Mumbai', airline: 'IndiGo', price: '₹4,600', duration: '2h 00m' }
          ];
        } else {
          response = '✈️ I can help you find the best flight deals! Where would you like to fly to? Popular destinations include Goa, Mumbai, Delhi, Bengaluru, and more!';
        }
      } else if (lowerMessage.includes('car') || lowerMessage.includes('rental') || lowerMessage.includes('taxi')) {
        response = '🚗 I can help you find the perfect car rental! Here are some popular options:';
        recommendations = [
          { type: 'car', name: 'Maruti Swift', category: 'Economy', price: '₹1,200/day', rating: 4.5 },
          { type: 'car', name: 'Hyundai Creta', category: 'SUV', price: '₹2,500/day', rating: 4.7 },
          { type: 'car', name: 'Toyota Innova', category: 'Premium', price: '₹3,200/day', rating: 4.8 }
        ];
      } else if (lowerMessage.includes('attraction') || lowerMessage.includes('places') || lowerMessage.includes('visit') || lowerMessage.includes('sightseeing')) {
        response = '🏛️ Here are some amazing attractions you should definitely visit:';
        recommendations = [
          { type: 'attraction', name: 'Red Fort', location: 'Delhi', rating: 4.6, category: 'Historical' },
          { type: 'attraction', name: 'Gateway of India', location: 'Mumbai', rating: 4.4, category: 'Landmark' },
          { type: 'attraction', name: 'Mysore Palace', location: 'Bengaluru', rating: 4.7, category: 'Palace' }
        ];
      } else if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
        response = '💰 I understand you\'re looking for budget-friendly options! Here are some great deals under ₹2000:';
        recommendations = [
          { type: 'hostel', name: 'Budget Stay Delhi', location: 'Karol Bagh', price: '₹1,200', rating: 8.0 },
          { type: 'hostel', name: 'Backpacker\'s Choice', location: 'Pune', price: '₹1,600', rating: 8.5 },
          { type: 'hostel', name: 'Economy Lodge', location: 'Chennai', price: '₹1,400', rating: 7.9 }
        ];
      } else if (lowerMessage.includes('help') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
        response = '🤖 I\'m here to help you with all your travel needs! I can assist you with:\n\n🏨 Finding hostels and PGs\n✈️ Booking flights\n🚗 Car rentals\n🏛️ Discovering attractions\n💰 Budget planning\n📍 Travel recommendations\n\nWhat would you like to explore today?';
      } else {
        response = '🌟 Thanks for reaching out! I\'m your AI travel assistant and I\'m here to help make your trip planning easier. You can ask me about hostels, flights, attractions, or any travel-related questions. What are you planning for your next adventure?';
      }

      const newMessage = {
        id: Date.now(),
        type: 'ai',
        text: response,
        timestamp: new Date().toISOString(),
        recommendations: recommendations
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);

      // Save to chat history if it has recommendations
      if (recommendations.length > 0) {
        const historyItem = {
          id: Date.now(),
          query: userMessage,
          response: response,
          recommendations: recommendations,
          timestamp: new Date().toISOString()
        };
        
        setChatHistory(prev => {
          const updated = [historyItem, ...prev.slice(0, 4)]; // Keep last 5
          try {
            localStorage.setItem('aiChatHistory', JSON.stringify(updated));
          } catch (error) {
            console.warn('Failed to save chat history:', error);
          }
          return updated;
        });
      }
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds for more natural feel
  };

  const handleSendMessage = (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    generateAIResponse(text.trim());
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  const loadHistoryItem = (item) => {
    const message = {
      id: Date.now(),
      type: 'ai',
      text: `Here are your previous search results for "${item.query}":`,
      timestamp: new Date(),
      recommendations: item.recommendations
    };
    setMessages(prev => [...prev, message]);
    setShowHistory(false);
  };

  const quickActions = [
    'Find hostels near me',
    'Best flight deals',
    'Book a car',
    'Show my last searches'
  ];

  return (
    <>
      {/* Floating AI Button */}
      <div className={`ai-assistant-float ${isOpen ? 'open' : ''}`}>
        <button 
          className="ai-float-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          🤖
        </button>
      </div>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="ai-chat-modal">
          <div className="ai-chat-header">
            <h3>AI Travel Assistant 🧭</h3>
            <div className="ai-header-actions">
              <button 
                className={`history-btn ${showHistory ? 'active' : ''}`}
                onClick={() => setShowHistory(!showHistory)}
              >
                🕘
              </button>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="ai-chat-body">
            {showHistory ? (
              <div className="chat-history-panel">
                <h4>🕘 Recent Searches & Recommendations</h4>
                {chatHistory.length > 0 ? (
                  <div className="history-list">
                    {chatHistory.map((item) => (
                      <div 
                        key={item.id} 
                        className="history-item"
                        onClick={() => loadHistoryItem(item)}
                      >
                        <div className="history-query">{item.query}</div>
                        <div className="history-count">{item.recommendations.length} results</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-history">No search history yet. Start chatting to see your recommendations here!</p>
                )}
              </div>
            ) : (
              <>
                <div className="ai-messages">
                  {messages.map((message) => (
                    <div key={message.id} className={`message ${message.type}`}>
                      <div className="message-content">
                        <p>{message.text}</p>
                        {message.recommendations && (
                          <div className="recommendations">
                            {message.recommendations.map((rec, index) => (
                              <div key={index} className={`rec-card ${rec.type}`}>
                                {rec.type === 'hostel' && (
                                  <>
                                    <h5>{rec.name}</h5>
                                    <p>{rec.location} • ⭐ {rec.rating}</p>
                                    <span className="rec-price">{rec.price}/night</span>
                                  </>
                                )}
                                {rec.type === 'flight' && (
                                  <>
                                    <h5>{rec.route}</h5>
                                    <p>{rec.airline} • {rec.duration}</p>
                                    <span className="rec-price">{rec.price}</span>
                                  </>
                                )}
                                {rec.type === 'car' && (
                                  <>
                                    <h5>{rec.name}</h5>
                                    <p>{rec.category} • ⭐ {rec.rating}</p>
                                    <span className="rec-price">{rec.price}</span>
                                  </>
                                )}
                                {rec.type === 'attraction' && (
                                  <>
                                    <h5>{rec.name}</h5>
                                    <p>{rec.location} • {rec.category}</p>
                                    <span className="rec-rating">⭐ {rec.rating}</span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="message-time">
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message ai typing">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="quick-actions">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index}
                      className="quick-action-btn"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="ai-chat-input">
            <div className="input-container">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything about travel..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="chat-input"
              />
              <button 
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                onClick={isListening ? stopListening : startListening}
              >
                🎤
              </button>
              <button 
                className="send-btn"
                onClick={() => handleSendMessage()}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;