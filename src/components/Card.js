import React from 'react';

function Card({ card, onCardClick }) {

    const handleClick = () => {
        onCardClick(card);
    }

    return (<div className="element">
        <img src={card.link} alt="Природа" className="element__img" onClick={handleClick} />
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
            <button type="button" className="element__like"></button>
            <span className="element__like-count">{card.likes.length}</span>
        </div>
        <button type="button" className="element__delete-button"></button>
    </div>);
}

export default Card;