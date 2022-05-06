import React from 'react';

function ImagePopup({ card, onClose }) {
  if (card !== null) {
    return (
      <div className='popup popup_for_img popup_opened'>
        <div className="popup__img-container">
          <img src={card.link} alt={card.name} className="popup__img" />
          <h2 className="popup__img-title">{card.name}</h2>
          <button type="button" className="popup__close-button" onClick={onClose}></button>
        </div>
      </div>
    )
  }
}

export default ImagePopup;
