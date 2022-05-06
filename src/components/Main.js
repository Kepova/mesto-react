import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    let [userName, setUserName] = useState('');
    let [userDescription, setUserDescription] = useState('');
    let [userAvatar, setUserAvatar] = useState('');
    let [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUser()
            .then((userData) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
            })
            .catch(err => {
                console.log(err);
            });
    });

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                const cardsData = res.map((card) => {
                    return {
                        name: card.name,
                        link: card.link,
                        likes: card.likes,
                        id: card._id
                    };
                })
                setCards(cardsData);
            })
            .catch(err => {
                console.log(err);
            });


    });

    return (
        <main className="content">
            <section className="profile">
                <a href="#" className="profile__avatar-container" onClick={onEditAvatar}>
                    <img src={userAvatar} alt="Аватарка" className="profile__avatar" />
                </a>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {
                    cards.map((card) => (
                        <Card card={card} onCardClick={onCardClick} key={card.id} />
                    ))
                }
            </section>
        </main>
    );
}

export default Main;
