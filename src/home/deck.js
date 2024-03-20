import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export const Deck = ({ deck }) => {

    const removeDeck = async () => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            await deleteDeck(deck.id); 
            window.location.reload();
        }
    }

    return (
        <div className="card" key={deck.id}>
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-primary" style={{ marginRight: '10px' }}>View Deck</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary" style={{ marginRight: '10px' }}>Study Deck</Link>
                <button onClick={removeDeck} className="btn" style={{ float: 'right', color: 'red', backgroundColor: 'grey' }}>Delete Deck</button>
            </div>
            <div className="card-footer">
                {deck.cards.length} cards
            </div>
        </div>
    );
}

export default Deck;