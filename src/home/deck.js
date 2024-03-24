import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDeck } from '../utils/api/index';

function Deck({ deck }) {
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();
    



    useEffect(() => {
        if (isDeleted) {
            window.location = "/";
        }
    }, [isDeleted, navigate]);

    const removeDeck = async () => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            try {
                await deleteDeck(deck.id);
                setIsDeleted(true); // set deletion flag to true, triggering useEffect to navigate home
            } catch (error) {
                console.error(error);
            }
        }
    };


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