import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const {name, about, avatar} = useContext(CurrentUserContext);
    // let [userName, setUserName] = useState('');
    // let [userDescription, setUserDescription] = useState('');
    // let [userAvatar, setUserAvatar] = useState('');
    let [cards, setCards] = useState([]);

    // useEffect(() => {
    //     api.getUser()
    //         .then((userData) => {
    //             setUserName(userData.name);
    //             setUserDescription(userData.about);
    //             setUserAvatar(userData.avatar);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, []);

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
    }, []);

    const cardsElements = cards.map((card) => (
        <Card card={card} onCardClick={onCardClick} key={card.id} />
    ));

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
