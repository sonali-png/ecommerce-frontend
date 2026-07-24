import React, { useEffect } from 'react';
// import './CartLoader.css';

export default function CartLoader({ message = "Processing your order..." }) {
  // Lock body scroll when mounting, unlock when unmounting
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="cart-loader-overlay" role="dialog" aria-modal="true" aria-live="polite">
      <div className="cart-loader-card">
        <div className="cart-icon-wrapper">
          <svg 
            className="cart-svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <div className="cart-item-dot"></div>
        </div>
        
        <div className="loader-track">
          <div className="loader-bar"></div>
        </div>
        
        <p className="loader-text">{message}</p>
      </div>
    </div>
  );
}


// {isLoading && <CartLoader message="Finalizing payment..." />}
