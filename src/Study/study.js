import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import Breadcrumb from "../common/breadcrumb.js";
import Card from "../Card/card.js";

function Study() {
  const [deck, setDeck] = useState({ cards: [] });
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const navigate = useNavigate();

  const { deckId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    fetchData();
  }, [deckId]);

  const nextHandler = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setFlipped(false);
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      if(window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.")) {
        setFlipped(false); // Ensure the next card starts from the front
        setCurrentCardIndex(0);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Breadcrumb deckName={deck.name} page={"Study"} />
      
      <h2>Study: {deck.name}</h2>

      {deck.cards.length > 2 ? (
        currentCardIndex < deck.cards.length ? (
          <Card
            card={deck.cards[currentCardIndex]}
            totalCards={deck.cards.length}
            flipped={!flipped}
            setFlipped={setFlipped}
            nextHandler={nextHandler}
            cardIndex={currentCardIndex}
          />
        ) : (
          <div>
            <h3>End of Cards</h3>
            <button onClick={nextHandler}>Restart Cards</button>
          </div>
        )
      ) : (
        <div>
          <h3>Not enough cards</h3>
          <p>
            You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
          </p>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary" style={{ marginRight: '10px' }}>Add Cards</Link>
        </div>
      )}
    </>
  );
}

export default Study;