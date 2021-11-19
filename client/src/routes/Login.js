import '../css/login.css'

import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

export default function Login(props) {
    const [isRegister, setIsRegister] = useState(true);

    function handleIsRegisterState(event) {
        if (event.target.innerText === "Connexion") {
            setIsRegister(false);
        } else {
            setIsRegister(true);
        }
    }

    function handleLogState(event) {
        event.preventDefault();
        props.setIsLogIn(oldValue => {
            return !oldValue;
        })
    }

    return (
        <div className="form-container">

            <div className="form-selector">
                <span onClick={handleIsRegisterState} name="connexion" className={isRegister ? "form-selector__button" : "form-selector__button --active"}>Connexion</span>
                <span onClick={handleIsRegisterState} name="register" className={isRegister ? "form-selector__button --active" : "form-selector__button"}>Créer un compte</span>
            </div>

            <form className={isRegister ? "hidden" : ""}>

                <div className="form-field">
                    <FaUser className="icon" />
                    <input name="username" type="text" autoComplete="off" placeholder="Pseudo" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaEnvelope className="icon" />
                    <input name="email" type="email" autoComplete="off" placeholder="Email" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <button type="submit">Connexion</button>
                </div>

            </form>

            <form className={isRegister ? "" : "hidden"} onSubmit={handleLogState}>

                <div className="form-field">
                    <FaUser className="icon" />
                    <input name="username" type="text" autoComplete="off" placeholder="Pseudo" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaEnvelope className="icon" />
                    <input name="email" type="email" autoComplete="off" placeholder="Email" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input name="password" type="password" placeholder="Mot de passe" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <FaLock className="icon" />
                    <input name="password2" type="password" placeholder="Retapez le mot de passe" spellCheck="false" required />
                </div>

                <div className="form-field">
                    <button type="submit">Envoyer</button>
                </div>

            </form>
        </div>
    )
}