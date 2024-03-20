import React, { useState } from 'react';

function Card({ card, totalCards, nextHandler, cardIndex }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    nextHandler();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5>Card {cardIndex + 1} of {totalCards}</h5>
        <p className="card-text">{isFlipped ? card.back : card.front}</p>
        <button onClick={handleFlip} className="btn btn-primary" style={{ marginRight: '10px' }}>Flip</button>
        {isFlipped && <button onClick={handleNext} className="btn btn-secondary" style={{ marginRight: '10px' }}>Next</button>}
      </div>
    </div>
  );
}

export default Card;