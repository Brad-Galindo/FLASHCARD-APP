import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index.js";
import Breadcrumb from "../common/breadcrumb.js";
import { updateDeck } from "../utils/api/index.js";


const EditDeck = () => {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [error, setError] = useState(null);
  const { deckId } = useParams();
  const navigate = useNavigate();
  const abortController = new AbortController();
  const signal = abortController.signal;


  // use a useEffect hook to fetch the deck data when the component mounts
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await readDeck(deckId, signal);
        setDeck(deckData);
      } catch (error) {
        setError('Failed to load deck. Please try again later.');
      }
    };
    fetchDeck();
}, [deckId]);

  const handleSave = async (event) => {
    event.preventDefault();
    const data = {
      id: deckId,
      name: event.target.name.value,
      description: event.target.description.value,
    };

    try {
      const newDeck = await updateDeck(data, signal);
      setDeck(newDeck);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      setError('Failed to save deck. Please try again later.');
    }
  };

  return (
    <>
      <Breadcrumb deckName={deck.name} page={"Edit Deck"} />
      <h1>Edit Deck</h1>
  
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Name</label>
          <input id="name" name="name" className="form-control" placeholder="Deck Name" defaultValue={deck.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" name="description" className="form-control" placeholder="Brief description of the deck" defaultValue={deck.description}></textarea>
        </div>
        <button type="submit" style={{ marginRight: '10px' }} className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </>
  );
};

export default EditDeck;