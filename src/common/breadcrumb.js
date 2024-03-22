import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Breadcrumb({ deckName, page, isDeckLinked = true }) {
  const location = useLocation();
  const params = useParams();

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {location.pathname.includes(params.deckId) && (isDeckLinked 
            ? <li className="breadcrumb-item"><Link to={`/decks/${params.deckId.replace(/\/+$/, "")}`}>{deckName}</Link></li>
            : <li className="breadcrumb-item">{deckName}</li>)
        }
        {page && <li className="breadcrumb-item active" aria-current="page">{page}</li>}
      </ol>
    </nav>
  );
}

export default Breadcrumb