import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import DeletePopup from './DeletePopup';

function App() {

  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  let [isDeleteCardPopup, setIsDeleteCardPopup] = useState(null);
  let [selectedCard, setSelectedCard] = useState(null);
  let [currentUser, setCurrentUser] = useState({});
  let [cards, setCards] = useState([]);

  // Получение начальных данных
  useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([userData, res]) => {
        // установка данных пользователя
        setCurrentUser(userData);
        //начальные карточки
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

  //Лайк карточки
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Удаление карточки
  const handleCardDeleteClick = (card) => {
    setIsDeleteCardPopup(card);
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Добавление карточки
  const handleAddPlaceSubmit = (card) => {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
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
    setIsDeleteCardPopup(null);
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
          onCardDeletePopup={handleCardDeleteClick} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>

        <ImagePopup card={selectedCard}
          onClose={closeAllPopups} />

        <DeletePopup card={isDeleteCardPopup} onClose={closeAllPopups} onCardDelete={handleCardDelete}></DeletePopup>



      </div >
    </ CurrentUserContext.Provider>
  )
};


export default App;
