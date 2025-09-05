import { useState, useEffect } from 'react';

export const useARFeatureCard = () => {
  const [showARCard, setShowARCard] = useState(false);

  const closeARCard = () => {
    setShowARCard(false);
    // Remember that user has seen the card
    localStorage.setItem('hasSeenARCard', 'true');
  };

  const openARCard = () => {
    // Only show if user hasn't seen it before
    const hasSeenARCard = localStorage.getItem('hasSeenARCard');
    if (!hasSeenARCard) {
      setShowARCard(true);
    }
  };

  return {
    showARCard,
    closeARCard,
    openARCard,
  };
};