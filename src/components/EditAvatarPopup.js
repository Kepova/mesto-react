import React, { useRef, useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const [avatar, setAvatar] = useState();
    const avatarRef = useRef();

    function changeAvatarProfile() {
        setAvatar(avatarRef.current.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar
        });
    };

    return (
        <PopupWithForm title={'Обновить аватар'}
            name={'avatar'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="popup__info">
                <div className="popup__input-container">
                    <input type="url" name="avatar" id="popup__input-avatar-src" className="popup__input"
                        placeholder="Ссылка на новый аватар" required ref={avatarRef} value={avatar || ''} onChange={changeAvatarProfile} />
                    <div className="popup__error-container">
                        <span className="popup__input-avatar-src-error popup__error"></span>
                    </div>
                </div>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;