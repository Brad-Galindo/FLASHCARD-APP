import React from 'react';
import { Routes, Route } from "react-router-dom";
import NotFound from '../Layout/NotFound';
import DeckList from "../home/deckList";
import Study from '../Study/study';
import NewCard from "../Card/NewCard";
import Decks from "../home/Decks";
import NewDeck from "../home/NewDeck";
import EditDeck from '../home/EditDeck';
import EditCards from '../Card/EditCards';


function RootRoutes() {
    return (
        <Routes>
            <Route path = "/" element={<DeckList />} />
            <Route path = "/decks/:deckId/cards/:cardsId/edit" element={<EditCards />} />
            <Route path = "/decks/:deckId/cards/new" element={<NewCard />} />
            <Route path = "/decks/:deckId/edit" element={<EditDeck />} />
            <Route path = "/decks/:deckId/study" element={<Study />} />
            <Route path = "/decks/:deckId" element={<Decks />} />
            <Route path = "/decks/new" element={<NewDeck />} />
            <Route path = "*" element={<NotFound />} />
        </Routes>
    );
}

export default RootRoutes;