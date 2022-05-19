import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  let [selectedCard, setSelectedCard] = useState(null);
  let [currentUser, setCurrentUser] = useState('');
  let [cards, setCards] = useState([]);

  // Получение начальных карточек
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

  // Получение начальных данных профиля
  useEffect(() => {
    api.getUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  //Лайк карточки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  };

  // Удаление карточки
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      });
  };

  // Добавление карточки
  const handleAddPlaceSubmit = (card) => {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  // Изменение аватара
  const handleUpdateAvatar = (dataEditAvatar) => {
    api.changeAvatar(dataEditAvatar.avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  };

  // Редактирование данных профиля
  const handleUpdateUser = (dataEditUser) => {
    api.editProfile(dataEditUser.name, dataEditUser.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  };

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>

        <ImagePopup card={selectedCard}
          onClose={closeAllPopups} />

        <div className="popup popup_for_delete-card">
          <div className="popup__container">
            <form className="popup__form popup__form-delete-card" name="delete-card-form" noValidate>
              <h2 className="popup__title">Вы уверены?</h2>
              <button type="submit" className="popup__save-button add">Да</button>
            </form>
            <button type="button" className="popup__close-button"></button>
          </div>
        </div>

      </div >
    </ CurrentUserContext.Provider>
  )
};


export default App;
