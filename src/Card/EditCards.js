import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index.js";
import Breadcrumb from "../common/breadcrumb.js";
import FormComponent from "../FormComponent/Form.js"; // Ensure the correct path to FormComponent

const EditCards = () => {
  const [card, setCard] = useState({ front: "", back: "" });
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null); // Initialize deck as null
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeckAndCard = async () => {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);

        if (cardId) {
          const cardData = await readCard(cardId);
          setCard(cardData);
        }
      } catch (error) {
        console.error('Something went wrong: ', error);
      }
    };

    fetchDeckAndCard();

    // Cleanup function to abort fetch requests if the component unmounts
    return () => {
      new AbortController().abort();
    };
  }, [deckId, cardId]);

  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const updatedCard = {
      id: cardId,
      front: event.target.front.value,
      back: event.target.back.value,
      deckId: Number(deckId),
    };

    try {
      await updateCard(updatedCard);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error('Failed to save card. Please try again later.');
    }
  };

  // Check if deck is defined before rendering the FormComponent
  if (!deck) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div>
      <Breadcrumb deckName={deck.name} page={`Edit Card ${card.id}`} />
      <h1>Edit Card</h1>
      <FormComponent
        deck={deck} // Pass the deck object to the FormComponent
        card={card}
        isEditing={true}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default EditCards;