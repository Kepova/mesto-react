import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick }) {
    const currentUser = useContext(CurrentUserContext);
    const handleClick = () => {
        onCardClick(card);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active': ''}`;

    return (
        <div className="element">
            <img src={card.link} alt={card.name} className="element__img" onClick={handleClick} />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
                <button type="button" className="element__like"></button>
                <span className="element__like-count">{card.likes.length}</span>
            </div>
            <button type="button" className="element__delete-button"></button>
        </div>);
}

export default Card;