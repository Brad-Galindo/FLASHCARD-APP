import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api/index';
import Form from '../FormComponent/Form';
import Breadcrumb from '../common/breadcrumb';

const NewCard = () => {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    const card = {
      front: event.target.front.value,
      back: event.target.back.value,
    };

    try {
      await createCard(deckId, card);
      event.target.reset();
    } catch (error) {
      setError('Failed to save card. Please try again later.');
    }
  };

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div>
    <Breadcrumb deckName={deck.name} page={"Add Card"}/>
    <h1>{deck.name}: Add Card</h1>
    <Form
      deck={deck}
      card={{ front: '', back: '' }} // Empty card for new card creation
      isEditing={false}
      handleSave={handleSave}
      handleCancel={handleCancel}
    />
    </div>
  );
};

export default NewCard;