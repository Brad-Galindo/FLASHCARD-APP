import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index.js";
import Breadcrumb from "../common/breadcrumb.js";

const Decks = () => {
  const [deck, setDeck] = useState({ cards: [] });
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
      } catch (error) {
        // Handle errors, e.g., updating an error state or showing an error message
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();

    // Cleanup function to abort fetch when the component is unmounted or deckId changes
    return () => controller.abort();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      await deleteDeck(deckId);
      navigate("/");
    }
  };

  const handleDeleteCard = async (cardId) => {
    if(window.confirm("Are you sure you want to delete?")) {
      const abortController = new AbortController(); // for signalling fetch to abort the fetch call
      await deleteCard(cardId, abortController.signal);
      // then refresh your deck or re-fetch your deck
    }
  };

  return (
    <div
    style={{
        backgroundColor: 'lightblue',
        border: '1px solid #ccc',
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '5px'
      }}>
      <Breadcrumb deckName={deck.name} />

      <h3>{deck.name}</h3>
      <p>{deck.description}</p>

<div style={{

  marginBottom: '10px'
}}>
  <button onClick={() => navigate(`/decks/${deckId}/edit`)} style={{
    backgroundColor: '#d3d3d3', 
    color: 'black',
    border: '1px solid #ccc',
    padding: '5px 10px',
    borderRadius: '3px',
    marginRight: '10px',
    cursor: 'pointer',
  }}>Edit</button>

  <button onClick={() => navigate(`/decks/${deckId}/study`)} style={{
    backgroundColor: '#d3d3d3', 
    color: 'black',
    border: '1px solid #ccc',
    padding: '5px 10px',
    borderRadius: '3px',
    marginRight: '10px',
    cursor: 'pointer',
  }}>Study</button>

  <button onClick={() => navigate(`/decks/${deckId}/cards/new`)} style={{
    backgroundColor: '#d3d3d3', 
    color: 'black',
    border: '1px solid #ccc',
    padding: '5px 10px',
    borderRadius: '3px',
    marginRight: '10px',
    cursor: 'pointer',
  }}>Add Cards</button>

  <button onClick={handleDeleteDeck} style={{
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
  }}>Delete</button>
</div>

      <h2>Cards</h2>
    <div>
    {deck.cards && deck.cards.map((card) => (
  <div key={card.id} style={{
    backgroundColor: '#d3d3d3',
    border: '1px solid #ccc',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px'
  }}>
    <p>Question: {card.front}</p>
    <p>Answer: {card.back}</p>
    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '5px 10px',
        textDecoration: 'none',
        borderRadius: '3px',
        marginRight: '5px'
      }}
    >
      Edit
    </Link>
    <button onClick={() => handleDeleteCard(card.id)}
      style={{
        backgroundColor: '#dc3545',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer'
      }}
    >
      Delete
    </button>
  </div>
))}
    </div>
  </div>
);
};

export default Decks;