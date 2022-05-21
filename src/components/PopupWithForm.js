import React from 'react';

function PopupWithForm({ title, name, nameButton, children, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup_for_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form className={`popup__form popup__form-${name}`} name={`${name}-form`} onSubmit={onSubmit} noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button type="submit" className="popup__save-button">{nameButton}</button>
                </form>
                <button type="button" className="popup__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;
