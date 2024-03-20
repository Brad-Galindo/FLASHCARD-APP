import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Breadcrumb({ deckName, page }) {
  const location = useLocation();
  const params = useParams();

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {location.pathname.includes(params.deckId) && <li className="breadcrumb-item"><Link to={`/decks/${params.deckId}`}>{deckName}</Link></li>}
        <li className="breadcrumb-item active" aria-current="page">{page}</li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;