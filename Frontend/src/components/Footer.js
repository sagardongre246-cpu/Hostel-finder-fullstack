import React from 'react';
import SocialChooser from './SocialChooser';

const Footer = () => {
  return (
    <footer style={{
      background: '#003580',
      color: '#fff',
      padding: '40px 0',
      marginTop: '60px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px'
      }}>
        <div>
          <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>
            Support
          </h3>
          <ul style={{listStyle: 'none'}}>
            <li style={{marginBottom: '8px'}}>
              <a href="/coronavirus" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Coronavirus (COVID-19) FAQs
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/help" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Help Centre
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/safety" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Safety Resource Centre
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>
            Discover
          </h3>
          <ul style={{listStyle: 'none'}}>
            <li style={{marginBottom: '8px'}}>
              <a href="/genius" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Genius loyalty programme
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/seasonal" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Seasonal and holiday deals
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/travel-articles" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Travel articles
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>
            Terms and settings
          </h3>
          <ul style={{listStyle: 'none'}}>
            <li style={{marginBottom: '8px'}}>
              <a href="/privacy" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Privacy & cookies
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/terms" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Terms & conditions
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/partner-dispute" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Partner dispute
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>
            Partners
          </h3>
          <ul style={{listStyle: 'none'}}>
            <li style={{marginBottom: '8px'}}>
              <a href="/extranet" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Extranet login
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/partner-help" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                Partner help
              </a>
            </li>
            <li style={{marginBottom: '8px'}}>
              <a href="/list-property" style={{color: '#ccc', fontSize: '14px', textDecoration: 'none'}}>
                List your property
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Summary and Social Media Section */}
      <div style={{
        marginTop: '50px',
        paddingBottom: '30px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '50px auto 0',
        padding: '0 24px'
      }}>
        {/* Connect With Me Section */}
        <div style={{
          // animation: 'fadeInUp 0.4s ease-out'
        }}>
          <h4 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '30px',
            // animation: 'glow 2s ease-in-out infinite alternate'
          }}>
            Connect With Me
          </h4>
          
          {/* Professional Social Media Icons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            {/* Instagram */}
            <SocialChooser 
              icon="instagram" 
              myName="Sagar Dongare" 
              partnerName="Pranchal Tripathi"
              onSelection={(data) => console.log('Selected:', data)}
            >
              <div
                className="social-icon instagram-icon"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </SocialChooser>

            {/* Twitter */}
            <SocialChooser 
              icon="twitter" 
              myName="Sagar Dongare" 
              partnerName="Pranchal Tripathi"
              onSelection={(data) => console.log('Selected:', data)}
            >
              <div
                className="social-icon twitter-icon"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(45deg, #1da1f2 0%, #0d8bd9 100%)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
            </SocialChooser>

            {/* LinkedIn */}
            <SocialChooser 
              icon="linkedin" 
              myName="Sagar Dongare" 
              partnerName="Pranchal Tripathi"
              onSelection={(data) => console.log('Selected:', data)}
            >
              <div
                className="social-icon linkedin-icon"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(45deg, #0077b5 0%, #005885 100%)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </SocialChooser>

            {/* GitHub */}
            <SocialChooser 
              icon="github" 
              myName="Sagar Dongare" 
              partnerName="Pranchal Tripathi"
              onSelection={(data) => console.log('Selected:', data)}
            >
              <div
                className="social-icon github-icon"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(45deg, #333 0%, #24292e 100%)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </SocialChooser>

            {/* WhatsApp */}
            <SocialChooser 
              icon="whatsapp" 
              myName="Sagar Dongare" 
              partnerName="Pranchal Tripathi"
              onSelection={(data) => console.log('Selected:', data)}
            >
              <div
                className="social-icon whatsapp-icon"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(45deg, #25d366 0%, #128c7e 100%)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </div>
            </SocialChooser>
          </div>
        </div>

        {/* Summary Paragraph */}
        <div style={{
          animation: 'fadeInUp 0.8s ease-out 0.2s both'
        }}>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#e6f3ff',
            fontWeight: '400',
            margin: '0 auto',
            maxWidth: '700px',
            textAlign: 'center'
          }}>
            Experience seamless hostel booking with our user-friendly platform featuring secure payment systems, 
            verified accommodations, and 24/7 customer support. Discover budget-friendly stays worldwide with 
            real-time availability, authentic reviews, and instant booking confirmation for your perfect travel experience.
          </p>
          
          {/* Developer Credit */}
          <p style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#e6f3ff',
            fontWeight: '400',
            margin: '20px auto 0',
            maxWidth: '700px',
            textAlign: 'center',
            paddingTop: '16px'
          }}>
            Innovated and engineered by Sagar Dongare & Pranchal Tripathi 
          </p>
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid #4a5568',
        marginTop: '40px',
        paddingTop: '20px',
        textAlign: 'center'
      }}>
        <p style={{fontSize: '12px', color: '#ccc'}}>
          Copyright © 2025 HostelFinder.com™. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;