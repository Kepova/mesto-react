import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_for_img ${card !== null ? 'popup_opened' : ''}`}>
      <div className="popup__img-container">
        <img src={`${card !== null ? card.link : ''}`} alt={`${card !== null ? card.name : ''}`} className="popup__img" />
        <h2 className="popup__img-title">{`${card !== null ? card.name : ''}`}</h2>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
