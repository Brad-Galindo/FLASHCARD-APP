
import React from 'react';
import Breadcrumb from '../common/breadcrumb';

const Form = ({ deck, card, isEditing, handleSave, handleCancel }) => {
  const pageTitle = isEditing ? `Edit Card ${card.id}` : `Add Card`;
  const formTitle = isEditing ? `Edit Card` : `${deck.name}: Add Card`;

  return (

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea 
            id="front" 
            name="front" 
            className="form-control" 
            placeholder="Front side of the card" 
            defaultValue={isEditing ? card.front : ''}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea 
            id="back" 
            name="back" 
            className="form-control" 
            placeholder="Back side of the card" 
            defaultValue={isEditing ? card.back : ''}
          />
        </div>
        <button type="submit" style={{ marginRight: '10px' }} className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
  );
};

export default Form;