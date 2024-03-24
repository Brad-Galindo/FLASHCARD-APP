import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Deck from "./deck";
import { listDecks } from "../utils/api";
import ErrorMessage from "../common/ErrorMessage";


export const DeckList = () => {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);
    

    useEffect(() => {
        const abortController = new AbortController();

        listDecks(abortController.signal)
            .then(response => {
                setDecks(response);
            })
            .catch(error => {
                setError(error);
            })

            return () => abortController.abort();
    }, []);

    if (error) {
        return <ErrorMessage error={error} />;
    }

    const list = Array.isArray(decks) ? decks.map((deck) => (
        <Deck key={deck.id} deck={deck} />
    )) : null;

    return (
        <main className="container">
        <section className="create">
            <Link to="/decks/new">
                <button style={{margin: "5px", padding: "5px"}}>Create Deck</button>
            </Link>
        </section>
        <section className="column">{list}</section>
    </main>
    );
};

export default DeckList;