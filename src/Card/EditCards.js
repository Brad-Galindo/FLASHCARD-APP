import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readCard, readDeck, deleteCard } from "../utils/api/index.js";
import Breadcrumb from "../common/breadcrumb.js";
import { updateCard } from "../utils/api/index.js";
import Card from "./card.js";


const EditCards = () => {
  const [card, setCard] = useState({ front: "", back: ""});
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ name: "" });
  const navigate = useNavigate();
  const abortController = new AbortController();
  const signal = abortController.signal;


  useEffect(() => {
    const fetchDeckAndCard = async () => {
        try {
            const deckData = await readDeck(deckId, signal);
            setDeck(deckData);

            const cardData = await readCard(cardId, signal);
            console.log(cardData);
            setCard(cardData);
        } catch (error) {
            console.log('Something went wrong: ', error);
        }
    };
    fetchDeckAndCard();
}, [deckId, cardId]);

  const handleSave = async (event) => {
    event.preventDefault();
    const data = {
      id: cardId,
      front: event.target.front.value,
      back: event.target.back.value,
    };

    try {
      const newCard = await updateCard(data, signal);
      setCard(newCard);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error('Failed to save card. Please try again later.');
    }
  };

  return (
    <>
    {card && card.id ? <Breadcrumb deckName={deck.name} page={`Edit Card ${card.id}`} /> : null}
      <h1>Edit Card</h1>
  
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea id="front" name="front" className="form-control" placeholder="Front side of the card" defaultValue={card.front}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea id="back" name="back" className="form-control" placeholder="Back side of the card" defaultValue={card.back}></textarea>
        </div>
        <button type="submit" style={{ marginRight: '10px' }} className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
      </form>
    </>
  );
};

export default EditCards;