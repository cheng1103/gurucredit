'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasShownTooltip, setHasShownTooltip] = useState(false);

  useEffect(() => {
    // Show button after scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    // Show tooltip after 5 seconds (only once)
    const tooltipTimer = setTimeout(() => {
      if (!hasShownTooltip) {
        setShowTooltip(true);
        setHasShownTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(tooltipTimer);
    };
  }, [hasShownTooltip]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative bg-white rounded-lg shadow-xl border p-4 max-w-[250px]">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-sm font-medium text-gray-900 mb-1">Need help? Chat with us!</p>
            <p className="text-xs text-gray-500">Get instant answers via WhatsApp</p>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r transform rotate-45" />
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={COMPANY.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" fill="white" />

        {/* Pulse animation */}
        <span className="absolute w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-25" />
      </a>

      {/* Online indicator */}
      <span className="absolute top-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
    </div>
  );
}
