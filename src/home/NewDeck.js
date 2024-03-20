import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";
import Breadcrumb from "../common/breadcrumb.js";

const NewCard = () => {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const abortController = new AbortController();
  const signal = abortController.signal;
  

  const handleSave = async (event) => {
    event.preventDefault();
    const data = {
      // Assuming name and description data is entered on this page
      name: event.target.name.value,
      description: event.target.description.value,
    };

    try {
      const newDeck = await createDeck(data, signal);
      setDeck(newDeck);
      navigate(`/decks/${newDeck.id}`);
    } catch (error) {
      setError('Failed to save deck. Please try again later.');
    }
  }



  return (
    <>
      <Breadcrumb deckName={deck.name} page={"Create Deck"} />
      <h1>Create Deck</h1>

      <form onSubmit={handleSave}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">Name</label>
        <input id="name" name="name" className="form-control" placeholder="Deck Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" name="description" className="form-control" placeholder="Brief description of the deck"></textarea>
        </div>
        <button type="submit" style={{ marginRight: '10px' }} className="btn btn-primary">Submit</button>
        <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate("/")}>
             Cancel
        </button>
      </form>
    </>
  );
};

export default NewCard;