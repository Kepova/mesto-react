import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const { name, about, avatar, _id } = useContext(CurrentUserContext);
    let [cards, setCards] = useState([]);

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                const cardsData = res.map((card) => {
                    return {
                        name: card.name,
                        link: card.link,
                        likes: card.likes,
                        _id: card._id,
                        owner: {
                            _id: card.owner._id
                        }
                    };
                })
                setCards(cardsData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const cardsElements = cards.map((card) => (
        <Card card={card}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            key={card._id} />
    ));

    //Лайк карточки
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === _id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
    };

    // Удаление карточки
    function handleCardDelete(card) {

        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
    }

    return (
        <main className="content">
            <section className="profile">
                <a href="#" className="profile__avatar-container" onClick={onEditAvatar}>
                    <img src={avatar} alt="Аватарка" className="profile__avatar" />
                </a>
                <div className="profile__info">
                    <h1 className="profile__title">{name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cardsElements}
            </section>
        </main>
    );
}

export default Main;
