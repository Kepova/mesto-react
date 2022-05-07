import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  let [selectedCard, setSelectedCard] = useState(null);

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
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm title={'Редактировать профиль'}
                      name={'edit'}
                      isOpen={isEditProfilePopupOpen}
                      onClose={closeAllPopups}>
        <fieldset className="popup__info">
          <div className="popup__input-container">
            <input type="text" name="name" id="popup__input-name" className="popup__input popup__input_info_name"
              placeholder="Имя" required minLength="2" maxLength="40" />
            <div className="popup__error-container">
              <span className="popup__input-name-error popup__error"></span>
            </div>
          </div>
          <div className="popup__input-container">
            <input type="text" name="profession" id="popup__input-profession"
              className="popup__input popup__input_info_profession" placeholder="Профессия" required minLength="2"
              maxLength="200" />
            <div className="popup__error-container">
              <span className="popup__input-profession-error popup__error"></span>
            </div>
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title={'Обновить аватар'}
                     name={'avatar'}
                     isOpen={isEditAvatarPopupOpen}
                     onClose={closeAllPopups}>
        <fieldset className="popup__info">
          <div className="popup__input-container">
            <input type="url" name="avatar" id="popup__input-avatar-src" className="popup__input"
              placeholder="Ссылка на новый аватар" required />
            <div className="popup__error-container">
              <span className="popup__input-avatar-src-error popup__error"></span>
            </div>
          </div>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm title={'Новое место'}
                     name={'add'}
                     isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}>
        <fieldset className="popup__info">
          <div className="popup__input-container">
            <input type="text" name="title" id="popup__input-title" className="popup__input popup__input_info_title"
              placeholder="Название" required minLength="2" maxLength="30" />
            <div className="popup__error-container">
              <span className="popup__input-title-error popup__error"></span>
            </div>
          </div>
          <div className="popup__input-container">
            <input type="url" name="link" id="popup__input-img-src" className="popup__input popup__input_info_img-src"
              placeholder="Ссылка на картинку" required />
            <div className="popup__error-container">
              <span className="popup__input-img-src-error popup__error"></span>
            </div>
          </div>
        </fieldset>
      </PopupWithForm>
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
  )
}


export default App;
