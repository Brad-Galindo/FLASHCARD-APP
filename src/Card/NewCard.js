import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index.js";
import Breadcrumb from "../common/breadcrumb.js";

const NewCard = () => {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        setError('Failed to load deck information. Please try again later.');
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleSave = async (event) => {
    event.preventDefault();
    const card = { front: cardFront, back: cardBack };

    try {
      await createCard(deckId, card);
      setCardFront("");
      setCardBack("");
      navigate(`/decks/${deckId}/cards/new`);
    } catch (error) {
      setError('Failed to save card. Please try again later.');
    }
  }

  const handleDone = () => {
    navigate(`/decks/${deckId}`);
  };

  return (
    <>
      <Breadcrumb deckName={deck.name} />
      <h1>{deck.name}: Add Card</h1>

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea id="front" name="front" className="form-control" placeholder="Front side of card" value={cardFront} onChange={(e) => setCardFront(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea id="back" name="back" className="form-control" placeholder="Back side of card" value={cardBack} onChange={(e) => setCardBack(e.target.value)} />
        </div>
        <button type="submit" style={{ marginRight: '10px' }} className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={handleDone}>Done</button>
      </form>
    </>
  );
};

export default NewCard;